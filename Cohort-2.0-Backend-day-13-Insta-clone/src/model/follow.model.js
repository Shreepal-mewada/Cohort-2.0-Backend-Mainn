const mongoose = require("mongoose");

const followSchema = new mongoose.Schema(
  {
    followerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Follower is required"],
    },
    followingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Following is required"],
    },
  },
  { timestamps: true },
);
const followModel = mongoose.model("Follow", followSchema);
module.exports = followModel;
