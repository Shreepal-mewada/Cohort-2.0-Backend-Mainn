const express = require("express");
const app = express();
const data = [];
app.use(express.json());

app.post("/notes", (req, res) => {
  data.push(req.body);
  res.send("data is added successfully");
});

app.get("/notes", (req, res) => {
  res.send(data);
});

app.delete("/notes/:index", (req, res) => {
  delete data[req.params.index];
  res.send("Deleted successfully");
});

app.patch('/notes/:index',(req,res)=>{
  data[req.params.index].Description=req.body.Description;
  res.send("Updated successfully")
})

app.get("/", (req, res) => {
  res.send("This is a Home page");
});

app.listen(3000, () => {
  console.log("server is running at port 3000......");
});
