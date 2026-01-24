const express = require("express");
const app = express();
app.use(express.json());

const data = [];
app.post("/about", (req, res) => {
  data.push(req.body);
  res.send("Task is added....");
});

app.get("/about", (req, res) => {
  res.send(data);
});

app.get("/", (req, res) => {
  res.send("Hello this is Home page");
});

app.listen(3000);
