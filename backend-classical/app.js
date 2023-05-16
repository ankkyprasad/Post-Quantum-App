const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const helmet = require("helmet");

require("dotenv").config();
require("./db/mongoose");

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, `./logs/${process.env.ALGORITHM}.log`),
  {
    flags: "a",
  }
);

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json({ limit: "100mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: false }));
app.use(cookieParser());

app.use(helment());

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

morgan.token("resBodySize", (req, res) => {
  return res.bodySize
    ? `response body: ${res.bodySize} bytes`
    : "response body: -";
});

const logData = (tokens, req, res) => {
  const headersSize = Buffer.byteLength(JSON.stringify(req.headers));
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    `${headersSize}`,
    `${res.bodySize}`,
    tokens["response-time"](req, res),
  ].join(",");
};

app.use(
  morgan(logData, {
    stream: accessLogStream,
  })
);

app.use("/api/v1/users", require("./routes/user"));
app.use("/api/v1/tasks", require("./routes/task"));
app.use("/api/v1", require("./routes/index"));

app.listen(PORT, async (err) => {
  if (err) throw err;

  console.log(`http://localhost:${PORT}`);
});
