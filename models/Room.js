import mongoose from "mongoose";
const RoomSchema = new mongoose.Schema({
    userList:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    chatList:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Chat"
        }
    ],
    roomName:{
        type:String,
        required:"Room name is required"
    }
})
const model = mongoose.model("Room", RoomSchema);
export default model;