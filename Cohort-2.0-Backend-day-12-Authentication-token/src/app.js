const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser()); 

app.use(express.json());
app.use(cors()); 
module.exports = app;
const authenticatioroute = require("./Routers/auth.route");
app.use("/api/auth", authenticatioroute);




app.use(express.json());
