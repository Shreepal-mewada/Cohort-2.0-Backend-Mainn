const postModel = require("../model/postdata.model");
const express = require("express");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const postRouter = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const authMiddleware = require("../middleware/auth.middleware");
const likeModel = require("../model/like.model");
const client = new ImageKit({
  privateKey: process.env["IMAGEKIT_PRIVATE_KEY"],
});

postRouter.post(
  "/",
  upload.single("image"),
  authMiddleware,
  async (req, res) => {
    const response = await client.files.upload({
      file: await toFile(Buffer.from(req.file.buffer), "file"),
      fileName: req.file.originalname,
      folder: "Cohort-2-insta-clone-posts",
    });
    const post = await postModel.create({
      caption: req.body.caption,
      image: response.url,
      userId: req.userrr.id,
    });
    res.status(201).json({ message: "Post created successfully", post });
  },
);

postRouter.get("/", authMiddleware, async (req, res) => {
  const userId = req.userrr.id;
  const posts = await postModel.find({ userId: userId });
  res.status(200).json({ message: "Posts retrieved successfully", posts });
});

postRouter.get("/post/:id", authMiddleware, async (req, res) => {
  const userIdd = req.userrr.id;
  const paramsId = req.params.id;
  const post = await postModel.findById(paramsId);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  const isvalid = post.userId.toString() === userIdd;
  if (!isvalid) {
    return res.status(403).json({ message: "Forbidden access" });
  }
  res.status(200).json({ message: "Post retrieved successfully", post });
});

postRouter.get("/allposts", authMiddleware, async (req, res) => {
  const user = req.userrr.id;
  const posts = await Promise.all(
    (await postModel.find().populate("userId").lean()).map(async (post) => {
      const isliked = await likeModel.findOne({
        userId: user,
        postId: post._id,
      });

      post.isliked = Boolean(isliked);
      console.log(post.isliked);

      return post;
    }),
  );

  if (!posts) {
    return res.status(404).json({ message: "No posts found" });
  }
  res.status(200).json({ message: "All posts retrieved successfully", posts });
});

postRouter.post("/like/:id", authMiddleware, async (req, res) => {
  const userIdd = req.userrr.id;
  const paramsId = req.params.id;
  
  if (!paramsId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ message: "Invalid post ID" });
  }
  


  const post = await postModel.findById(paramsId);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  const isliked = await likeModel.findOne({
    postId: paramsId,
    userId: userIdd,
  });
  if (isliked) {
    await likeModel.findByIdAndDelete(isliked._id);
    return res.status(200).json({ message: "Post unliked successfully" });
  }

  const liked = await likeModel.create({ postId: paramsId, userId: userIdd });
  res.status(201).json({ message: "Post liked successfully", liked });
});

module.exports = postRouter;
