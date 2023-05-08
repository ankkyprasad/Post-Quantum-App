const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { decodeKey } = require("./utils/encoder");

require("dotenv").config();
require("./db/mongoose");

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, `./logs/${process.env.CRYPTO_LIBRARY}.log`),
  {
    flags: "a",
  }
);

const PORT = process.env.PORT || 3000;
let cryptoLibrary;

if (process.env.CRYPTO_LIBRARY == "DILITHIUM") {
  cryptoLibrary = require("dilithium-crystals");
} else if (process.env.CRYPTO_LIBRARY == "SPHINCS") {
  cryptoLibrary = require("sphincs-legacy");
} else if (process.env.CRYPTO_LIBRARY == "SUPERSPHINCS") {
  cryptoLibrary = require("supersphincs");
} else if (process.env.CRYPTO_LIBRARY == "SUPERDILITHIUM") {
  cryptoLibrary = require("superdilithium");
} else {
  cryptoLibrary = require("falcon-crypto");
}

app.use(bodyParser.json({ limit: "100mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: false }));
app.use(cookieParser());

app.use((req, res, next) => {
  const oldWrite = res.write;
  const oldEnd = res.end;
  const chunks = [];

  res.write = function (chunk) {
    chunks.push(chunk);
    return oldWrite.apply(res, arguments);
  };

  res.end = function (chunk) {
    if (chunk) chunks.push(chunk);
    const body = Buffer.concat(chunks).toString("utf8");
    res.bodySize = Buffer.byteLength(body, "utf8");
    oldEnd.apply(res, arguments);
  };
  next();
});

app.use((req, res, next) => {
  const cookiesSize = Buffer.byteLength(JSON.stringify(req.cookies), "utf8");
  req.cookiesSize = cookiesSize;
  next();
});

morgan.token("cookiesSize", (req, res) => {
  return req.cookiesSize ? `cookie: ${req.cookiesSize} bytes` : "cookie: -";
});

morgan.token("resBodySize", (req, res) => {
  return res.bodySize
    ? `response body: ${res.bodySize} bytes`
    : "response body: -";
});

app.use(
  morgan(":method :url :response-time ms :cookiesSize :resBodySize", {
    stream: accessLogStream,
  })
);

app.use("/api/v1/users", require("./routes/user"));
app.use("/api/v1/tasks", require("./routes/task"));
app.use("/api/v1", require("./routes/index"));

app.listen(PORT, async (err) => {
  if (err) throw err;

  const keyPair = await cryptoLibrary.keyPair();
  process.env.CRYPTO_PRIVATE_KEY = decodeKey(keyPair.privateKey);
  process.env.CRYPTO_PUBLIC_KEY = decodeKey(keyPair.publicKey);

  console.log(`http://localhost:${PORT}`);
});
