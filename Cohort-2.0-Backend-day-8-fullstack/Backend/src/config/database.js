const monogoose=require("mongoose");
function connectToDb(){
  monogoose.connect(process.env.MONGO_URI).then(()=>{
  console.log("connected to db");
  
})
}
module.exports=connectToDb;