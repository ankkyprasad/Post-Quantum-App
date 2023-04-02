const express = require("express");
const app = express();

require("dotenv").config();
require("./db/mongoose");

const bodyParser = require("body-parser");
const falcon = require("falcon-crypto");
const { decodeKey } = require("./utils/encoder");

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use("/api/v1/users", require("./routes/user"));
app.use("/api/v1", require("./routes/index"));

app.listen(PORT, async (err) => {
  if (err) throw err;

  const keyPair = await falcon.keyPair();
  process.env.FALCON_PRIVATE_KEY = decodeKey(keyPair.privateKey);
  process.env.FALCON_PUBLIC_KEY = decodeKey(keyPair.publicKey);

  console.log(`http://localhost:${PORT}`);
});
