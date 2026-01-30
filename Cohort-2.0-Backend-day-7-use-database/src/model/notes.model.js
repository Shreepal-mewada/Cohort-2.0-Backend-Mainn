const mongoose = require("mongoose");
const noteschema = new mongoose.Schema({
  Id : Number,
  title: String,
  description: String,
});
const noteModel = mongoose.model("notes", noteschema);
module.exports=noteModel;