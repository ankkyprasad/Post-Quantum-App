const express = require("express");
const app = express();

require("dotenv").config();
require("./db/mongoose");

const bodyParser = require("body-parser");

let cryptoLibrary;

if (process.env.CRYPTO_LIBRARY == "DILITHIUM") {
  cryptoLibrary = require("dilithium-crystals");
} else if (process.env.CRYPTO_LIBRARY == "SPHINCS") {
  cryptoLibrary = require("sphincs-legacy");
} else if (process.env.CRYPTO_LIBRARY == "SUPERSPHINCS") {
  cryptoLibrary = require("supersphincs");
} else {
  cryptoLibrary = require("falcon-crypto");
}

const { decodeKey } = require("./utils/encoder");

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

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
