const express = require("express");
const followRouter = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const followModel = require("../model/follow.model");
const userdata = require("../model/userdata.model");
followRouter.post("/follow/:username", authMiddleware, async (req, res) => {
  const followername = req.userrr.username;
  const followingname = req.params.username;
  if (followername === followingname) {
    return res.status(400).json({ message: "You cannot follow yourself" });
  }

  const alreadyFollowed = await followModel.findOne({
    followerId: followername,
    followingId: followingname,
  });
  if (alreadyFollowed) {
    return res
      .status(400)
      .json({ message: "You are already following this user" });
  }

  const isfolloweeexist = await userdata.findOne({ username: followingname });
  if (!isfolloweeexist) {
    return res.status(404).json({ message: "User to follow not found" });
  }

  const followRecord = await followModel.create({
    followerId: followername,
    followingId: followingname,
  });
  res.status(200).json({
    message: `you are now following ${followingname} & follower is ${followername}`,
    follow: followRecord,
  });
});

followRouter.post("/unfollow/:username", authMiddleware, async (req, res) => {
  const followername = req.userrr.username;
  const followingname = req.params.username;
  const alreadyFollowed = await followModel.findOne({
    followerId: followername,
    followingId: followingname,
  });
  if (!alreadyFollowed) {
    return res.status(400).json({ message: "You are not following this user" });
  }
  await followModel.findOneAndDelete({
    followerId: followername,
    followingId: followingname,
  });
  res.status(200).json({ message: "User unfollowed successfully" });
});

followRouter.get("/followers", authMiddleware, async (req, res) => {
  const username = req.userrr.username;
  const followers = await followModel
    .find({ followingId: username })
    .populate("followerId", "username");
  res.status(200).json({
    message: "Followers retrieved successfully",
    followers: followers.map((f) => f.followerId),
  });
});

followRouter.get("/followings", authMiddleware, async (req, res) => {
  const username = req.userrr.username;
  const following = await followModel
    .find({ followerId: username })
    .populate("followingId", "username");
  res.status(200).json({
    message: `Following of ${username}`,
    following: following.map((f) => f.followingId),
  });
});

followRouter.get("/pendingrequests", authMiddleware, async (req, res) => {
  try {
    const myUsername = req.userrr.username;

    const requests = await followModel.find({
      followingId: myUsername,
      status: "pending",
    });

    res.json({
      message: "Pending follow requests",
      requests,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

followRouter.patch("/accept/:id", authMiddleware, async (req, res) => {
  try {
    const requestId = req.params.id;

    const updated = await followModel.findByIdAndUpdate(
      requestId,
      { status: "accepted" },
      { new: true },
    );

    res.json({
      message: "Request accepted",
      updated,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// followRouter.post("/requests/:username", authMiddleware, async (req, res) => {
//   const username = req.userrr.username;
//   const requestedUser = req.params.username;
//   const isUserExist = await userdata.findOne({ username: requestedUser });
//   if (!isUserExist) {
//     return res.status(404).json({ message: "Requested user not found" });
//   }

//   const isrequesteduser = await followModel.findOne({
//     followerId: requestedUser,
//     followingId: username,
//   });

//   // if (isrequesteduser.status !== "pending") {
//   //   return res
//   //     .status(400)
//   //     .json({ message: "No pending follow request for this user" });
//   // }

//   // if (username !== requestedUser) {
//   //   return res.status(403).json({ message: "Access denied" });
//   // }

//   const followRequests = await followModel
//     .find({ followingId: requestedUser, status: "pending" })
//     .populate("followerId", "username");
//   res.status(200).json({
//     message: `Follow requests from ${requestedUser}`,
//     followRequests: followRequests.map((f) => f.followerId),
//     status: "accepted",
//   });
// });

module.exports = followRouter;
