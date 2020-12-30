import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:"String is required"
    },
    email:{
        type:String,
        required:"Email is Required"
    },
    avatarUrl:{
        type:String,
        required:"avatarUrl is required"
    },
    backgroundUrl:{
        type:String,
        required:"backgroundUrl is required"
    },
    quoteMessage:{
        type:String,
    },
    friendsList:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    roomList:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Room"
        }
    ]
});
const model = mongoose.model("User", UserSchema);
export default model;