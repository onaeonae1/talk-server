import mongoose from "mongoose";
import bcrypt from "bcrypt";
//Schema 정의
const UserSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:"String is required"
    },
    password:{
        type:String,
        minlength:5, 
    },
    isConnecting:{
        type:Boolean,
        default:false
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

//Schema Hook 추가
UserSchema.pre("save", function(next){
    console.log("pre save Hook Activated");
    next();
});
const model = mongoose.model("User", UserSchema);
export default model;