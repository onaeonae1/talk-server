import mongoose from "mongoose";
const ChatSchema = new mongoose.Schema({
    message:{
        type:String,
        required:"message is required"
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    speaker:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    joiningRoom:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Room"
    }
})
const model = mongoose.model("Chat", ChatSchema);
export default model;