/* eslint-disable func-names */
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Schema 정의
const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: 'String is required',
  },
  dmMap: {
    type: Map,
    of: mongoose.Schema.Types.ObjectId,
  },
  hashedPassword: {
    type: String,
    required: 'hashed password is required',
  },
  isConnecting: {
    type: Boolean,
    default: false,
  },
  nickName: {
    type: String,
  },
  birthDay: {
    type: Date,
  },
  email: {
    type: String,
    required: 'Email is Required',
  },
  avatarUrl: {
    type: String,
    default: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Lionel_Messi_20180626.jpg',
  },
  backgroundUrl: {
    type: String,
    default: 'https://ww.namu.la/s/6b26c346f9a59f3c34413e566d89726771cc247b6126b6a7a8b1a13b2031b9e0ae8fcdc2c40e82337640484eadf59dffafaf1a5950505109d4002ff0ebf21415e47a18453d667d57444e16aa2335c13d5108a305ad33094a796ff066150b2555dffac4615f6b49065a929b507789a4f2',
  },
  quoteMessage: {
    type: String,
    default: 'hello socket talk!',
  },
  verified: { // 이메일 인증여부
    type: Boolean,
    default: false,
  },
  friendsList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  roomList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
    },
  ],
  blockList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  role: {
    type: String,
    default: 'vanilla',
  },
});
// Schema Methods
UserSchema.methods.setPassword = async function (password) {
  try {
    this.hashedPassword = await bcrypt.hash(password, 10);
    return true;
  } catch (error) {
    return error;
  }
};
UserSchema.methods.checkPassword = async function (password) {
  const result = await bcrypt.compare(password, this.hashedPassword);
  return result;
};
UserSchema.methods.getInfo = async function () {
  // 다른 사용자가 조회할 수 있는 부분
  const ret = {
    _id: this._id,
    userName: this.userName,
    email: this.email,
    avatarUrl: this.avatarUrl,
    backgroundUrl: this.backgroundUrl,
    birthDay: this.birthDay,
    nickName: this.nickName,
    quoteMessage: this.quoteMessage,
  };
  return ret;
};
UserSchema.methods.addFriend = async function (friendId) {
  if (this.friendsList.includes(friendId)) {
    return false;
  }
  this.friendsList.push(friendId);
  await this.save();
  return true;
};
UserSchema.methods.activateUser = async function () {
  // 이메일 인증 성공
  this.verified = true;
};
UserSchema.statics.findByEmail = async function (email) {
  const result = await this.findOne({ email });
  return result;
};
UserSchema.statics.registerUser = async function (userName, email, password) {
  try {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (error, hashedPassword) => {
        await this.create({
          userName,
          email,
          hashedPassword,
        });
        console.log('successfully registerd');
      });
    });
    return true;
  } catch (error) {
    return error;
  }
};
const model = mongoose.model('User', UserSchema);
export default model;
