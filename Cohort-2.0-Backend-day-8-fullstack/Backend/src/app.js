const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

app.use(cors());
const noteModel = require("./models/note.model");
app.use(express.json());

app.post("/api/notes", async (req, res) => {
  const { title, description } = req.body;
  const note = await noteModel.create({
    title,
    description,
  });
  res.status(201).json({
    message: "Data inserted successfully",
    note,
  });
});

app.get("/api/notes", async (req, res) => {
  const note = await noteModel.find();
  res.status(200).json({
    note,
  });
});

app.patch("/api/notes/:id", async (req, res) => {
  const { description } = req.body;
  const index = req.params.id;
  const note = await noteModel.findByIdAndUpdate(index, { description });
  res.status(200).json({
    message: " updated successfully",
  });
});

app.delete("/api/notes/:id", async (req, res) => {
  const index = req.params.id;
  const note = await noteModel.findByIdAndDelete(index);
  res.status(200).json({
    message: "deleted note successfully",
  });
});

app.use(express.static(path.join(__dirname,"..","./public")));
app.use("*name", (req, res) => {
  res.sendFile(path.join(__dirname,".." ,"./public/index.html"));
});

module.exports = app;
