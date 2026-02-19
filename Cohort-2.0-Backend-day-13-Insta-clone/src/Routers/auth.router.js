const express = require("express")
const jwt=require("jsonwebtoken")
const cookieParser=require("cookie-parser")

const registerroute=express.Router()
const bcrypt=require("bcryptjs")
const userModel=require("../model/userdata.model")
registerroute.post("/register",async(req,res)=>{
    
        const {username,email,password}=req.body  
        const existingUser=await userModel.findOne({$or:[{username},{email}]})
        if(existingUser){
            return res.status(400).json({
                message:"username or email already exists"
            })
        }
        
        const hash=await bcrypt.hash(password,10)
        
        const user=await userModel.create({username,email,password:hash})
        const token=jwt.sign({id:user._id,username:user.username},process.env.JWT_SECRET,{expiresIn:"1h"})
        res.cookie("token",token)

        res.status(201).json({
            message:"user registered successfully",
            user,
            token
        })
     
})
registerroute.post("/login", async (req, res) => {
  const { email, username, password } = req.body;
  const existingUser = await userModel.findOne({
    $or: [{ username }, { email }],
  });
  if (!existingUser) {
    return res.status(400).json({
      message: "username or email does not exist",
    });
  }
  const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
  if (!isPasswordMatch) {
    return res.status(400).json({
      message: "incorrect password", 
    });
  }
  const token = jwt.sign({ id: existingUser._id, username: existingUser.username }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.cookie("token", token);

  res.status(200).json({
    message: "user logged in successfully",
    user: { email: existingUser.email, username: existingUser.username },
    token,
  });
});

registerroute.get("/print/register",async(req,res)=>{
    const users=await userModel.find()
    res.status(200).json({  
        message:"all users",
        users
    })
})
module.exports=registerroute