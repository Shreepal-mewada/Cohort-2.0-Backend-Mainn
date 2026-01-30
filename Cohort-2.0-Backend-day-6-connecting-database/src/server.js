const app=require("../src/app");
const mongo=require("mongoose");

function connectToDb(){
  mongo.connect("mongodb+srv://Shreepal:RwKDewiHwFy32COR@cluster1.r4ovbkr.mongodb.net/day-6").then(()=>{
  console.log("Database is connected")
})
}

connectToDb();

app.listen(3000,()=>{
  console.log("server is started .......");
  
})