const express = require("express");
const app = express();
const connectDB = require("./config/database");
const registerroute = require("./Routers/auth.router");
const postRouter = require("./Routers/post.router");
const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", registerroute);
app.use("/api/post", postRouter);
connectDB();
module.exports = app;
