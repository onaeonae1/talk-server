/* eslint-disable func-names */
import mongoose from 'mongoose';

const ChatSchema = new mongoose.Schema({
  message: {
    type: String,
    required: 'message is required',
  },
  messageType: {
    // Text, Image
    type: String,
  },
  src: {
    // for Image
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  speaker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  joiningRoom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
  },
});
ChatSchema.methods.sendEmoticon = async function (src) {
  this.type = 'emoticon';
  this.src = src;
  await this.save();
};
const model = mongoose.model('Chat', ChatSchema);
export default model;
