const express = require("express");
const noteModel = require("./model/notes.model");
const app = express();
app.use(express.json());

app.post("/notes", async(req, res) => {
  const { Id, title, description } = req.body;
 const note = await noteModel.create({
    Id,title,description
  });
  res.status(201).send({ 
    message: "note created successfully",
    note 
  });
});

app.get("/notes",(req,res)=>{
     
})

module.exports = app;
