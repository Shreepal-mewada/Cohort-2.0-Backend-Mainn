const postModel = require("../model/postdata.model");
const express = require("express");

const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");


const postRouter = express.Router();

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const client = new ImageKit({
  privateKey: process.env["IMAGEKIT_PRIVATE_KEY"], // This is the default and can be omitted
});
postRouter.post("/", upload.single("image"), async (req, res) => {
  console.log(req.body);
  console.log("file", req.file);

  const response = await client.files.upload({
    file: await toFile(Buffer.from("my bytes"), "file"),
    fileName: "fileName",
  });

  res.send(response);
} );
module.exports = postRouter;
