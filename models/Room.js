import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema({
  userList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  chatIdList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chat',
    },
  ],
  roomName: {
    type: String,
    required: 'Room name is required',
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: 'Creator is Required',
  },
  recentChat: {
    type: String,
    default: '',
  },
  recntChatTime: {
    type: Date,
  },
});
const model = mongoose.model('Room', RoomSchema);
export default model;
