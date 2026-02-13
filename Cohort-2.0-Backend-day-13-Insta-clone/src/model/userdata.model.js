const mongoose=require("mongoose")
const userSchema=new mongoose.Schema({
    username:{
      type:String,
      required:true,
      unique:[true,"username already exists"],
    },
    email:{
      type:String,
      required:true,
      unique:[true,"email already exists"],
    },  
    password:{type:String,required:true},
    profilePic:{type:String,
      default:"https://i.pinimg.com/736x/9e/83/75/9e837528f01cf3f42119c5aeeed1b336.jpg"
    },
    
})
const userModel=mongoose.model("user",userSchema)
module.exports=userModel