import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:"String is required"
    },
    nickName:{
        type:String,
    },
    birthDay:{
        type:Date
    },
    email:{
        type:String,
        required:"Email is Required"
    },
    avatarUrl:{
        type:String,
    },
    backgroundUrl:{
        type:String,
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