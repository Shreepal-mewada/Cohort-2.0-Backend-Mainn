const express = require("express");
const authenticatioroute = express.Router();
const usermodel = require("../models/authentication.model");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

authenticatioroute.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const existingUser = await usermodel.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email already exists" });
  }
  const hashedPassword = crypto
    .createHash("md5")
    .update(password)
    .digest("hex");
  await usermodel.create({ username, email, password: hashedPassword });

  const token = jwt.sign(
    {
      email: email,
    },
    process.env.JWT_SECRET_KEY,
  );
  res.cookie("token", token);

  res.status(201).json({
    message: "User registered successfully",
    user: { username, email },
    token,
  });
});

authenticatioroute.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await usermodel.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User not found with this email" });
  }
  if (user.password !== crypto.createHash("md5").update(password).digest("hex")) {
    return res.status(400).json({ message: "Incorrect password" });
  }
  const token = jwt.sign(
    {
      email: email,
    },
    process.env.JWT_SECRET_KEY,
  );
  res.cookie("token", token);
  res.status(200).json({
    message: "Login successful",
    user: { username: user.username, email },
  });
});

authenticatioroute.get("/register", async (req, res) => {
  const users = await usermodel.find();

  res.status(200).json({
    users,
  });
});

module.exports = authenticatioroute;
