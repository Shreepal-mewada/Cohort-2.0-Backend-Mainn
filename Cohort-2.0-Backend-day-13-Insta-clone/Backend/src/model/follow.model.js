const mongoose = require("mongoose");

const followSchema = new mongoose.Schema(
  {
   followerId:String,
   followingId:String,
   
   status:{
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  }, 
  },
    
  { timestamps: true },
);
followSchema.index({ followerId: 1, followingId: 1 }, { unique: true });
const followModel = mongoose.model("Follow", followSchema);
module.exports = followModel;
