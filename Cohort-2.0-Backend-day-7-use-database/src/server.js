require("dotenv").config();
const connectToDb = require("./config/database");
const app = require("./app");

connectToDb();

app.listen(3000, () => {
  console.log("server is running now....");
});
