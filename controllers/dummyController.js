import mongoose from 'mongoose';
import User from '../models/User';
import Room from '../models/Room';
import Chat from '../models/Chat';

export const createDummyuser = async (req, res) => {
  console.log('Creating Dummy User with data below..');
  console.log(req.body);
  try {
    const {
      body: {
        userName, email, nickName, quoteMessage,
      },
    } = req;
    const dummyUser = await User.create({
      userName,
      email,
      nickName,
      quoteMessage,
    });
    res.send(dummyUser);
  } catch (error) {
    console.log(error);
    res.send({
      statuscode: 400,
      message: 'Internal Server Error',
    });
  }
};
export const createDummyroom = async (req, res) => {
  // 특정 채팅방을 개설
  console.log('Make Dummy Room with data below..');
  console.log(req.body);
  try {
    const {
      body: {
        roomName, creator,
      },
    } = req;
    const dummyRoom = await Room.create({
      roomName,
      creator,
      userList: [creator],
    });
    res.send(dummyRoom);
  } catch (error) {
    console.log(error);
    res.send({
      statuscode: 400,
      message: 'Internal Server Error',
    });
  }
};
export const createDummychat = async (req, res) => {
  // 특정 채팅방에 누가 말을 한다.
  console.log('Make Dummy Chat with data below..');
  console.log(req.body);
  try {
    const {
      body: {
        message, speaker, joiningRoom,
      },
    } = req;
    const targetRoom = await Room.findOne({ _id: joiningRoom });
    if (!targetRoom) {
      throw Error();
    } else {
      const dummyChat = await Chat.create({
        message,
        speaker,
        joiningRoom,
      });
      targetRoom.chatList.push(dummyChat.id);
      targetRoom.save();
      res.send(dummyChat);
    }
  } catch (error) {
    console.log(error);
    res.send({
      statuscode: 400,
      message: 'Internal Server Error',
    });
  }
};
export const dummySearch = async (req, res) => {
  console.log('dummy Search Test');
  try {
    const {
      body: { userId, friendId, amount },
    } = req;
    const targetUser = await User.findOne({ _id: userId });
    const { friendsList } = targetUser;
    const friendIndex = targetUser.friendsList.indexOf(friendId);

    const start = friendIndex + 1 - amount < 0 ? 0 : friendIndex + 1 - amount;
    const slicedArr = friendsList.slice(start, friendIndex + 1);
    res.send(slicedArr);
  } catch (error) {
    console.log('dummy search error');
  }
};

export const dummyValid = async (req, res) => {
  console.log('dummy valid test for User ID');
  try {
    const {
      body: { testId },
    } = req;
    const result = mongoose.Types.ObjectId.isValid(testId);
    res.send({ result });
  } catch (error) {
    res.send('test fail');
  }
};
export const dummyReq = async (req, res) => {
  console.log('dummy req user test');
  console.log(req.user);
  if (req.user) {
    res.send(req.user);
  } else {
    res.send('fail');
  }
};
