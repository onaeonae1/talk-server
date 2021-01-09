import mongoose from "mongoose";
const RoomSchema = new mongoose.Schema({
  userList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  chatList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    },
  ],
  roomName: {
    type: String,
    required: "Room name is required",
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: "Creator is Required",
  },
  recentChat: {
    type: String,
    default: "",
  },
});
const model = mongoose.model("Room", RoomSchema);
export default model;
