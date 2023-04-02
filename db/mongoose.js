const mongoose = require("mongoose");

const connectionURL = process.env.MONGO_URL;

mongoose.set("strictQuery", false);

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(connectionURL);
  console.log("connected to db");
}
