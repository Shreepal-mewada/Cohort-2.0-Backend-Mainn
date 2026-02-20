const express = require("express");
const app = express();
const connectDB = require("./config/database");
const registerroute = require("./Routers/auth.router");
const postRouter = require("./Routers/post.router");
const followRouter=require("./Routers/follow.router");
const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(cookieParser());

const cors = require("cors");

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use("/api/auth", registerroute);
app.use("/api/follow", followRouter);
app.use("/api/post", postRouter);
connectDB();
module.exports = app;
