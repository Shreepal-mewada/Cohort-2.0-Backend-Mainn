const express = require("express");
const authenticatioroute = express.Router();
const usermodel = require("../models/authentication.model");
const jwt = require("jsonwebtoken");

authenticatioroute.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const existingUser = await usermodel.findOne({ email });

  if (existingUser) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const token = jwt.sign(
    {
      email: email,
    },
    process.env.JWT_SECRET_KEY,
  );


  res.cookie("token", token);   
  await usermodel.create({ username, email, password });
  res.status(201).json({
    message: "User registered successfully",
    user: { username, email },
    token,
  });
});

authenticatioroute.get("/register", async (req, res) => {
  const users = await usermodel.find();

  res.status(200).json({
    users,
  });
});

module.exports = authenticatioroute;
