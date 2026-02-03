const monogoose=require("mongoose");
const notesSchema = new monogoose.Schema({
  title : String,
  description : String

})
const notesModel=monogoose.model("Notes",notesSchema);
module.exports=notesModel;