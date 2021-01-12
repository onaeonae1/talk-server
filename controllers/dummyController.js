import axios from 'axios';

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
export const dummyPostUser = async (req, res) => {
  console.log('dummy fetch test');
  try {
    await axios({
      method: 'POST',
      url: 'http://192.168.35.62:4000/dummy/user',
      data: {
        userName: 'oaneonae5',
        email: 'onaeonae5@konkuk.ac.kr',
        nickName: 'idiot',
        quoteMessage: "i'm idiot",
      },
    });
    console.log('post user finished');
    res.redirect('/api/getUsers');
  } catch (error) {
    console.log(error);
  }
};
export const dummyPostRoom = async (req, res) => {
  console.log('dummy fetch room');
  try {
    await axios({
      method: 'POST',
      url: 'http://192.168.35.62:4000/dummy/room',
      data: {
        roomName: 'nodejs를 혐오하는 사람의 모임',
        creator: '5ff580df1feb980df879a8e7',
        userList: ['5ff580df1feb980df879a8e7'],
      },
    });
    console.log('post room finished');
    res.redirect('/api/getRooms');
  } catch (error) {
    console.log(error);
  }
};
export const dummyPostChat = async (req, res) => {
  console.log('dummy fetch chat');
  try {
    await axios({
      method: 'POST',
      url: 'http://192.168.35.62:4000/dummy/chat',
      data: {
        message: '테스트 대화 3!',
        speaker: '5ff854bdd17cbf4f8ce728be',
        joiningRoom: '5ff9ac9d5ada9316fc244d44',
      },
    });
    console.log('post chat finished');
    res.redirect('/api/getChats');
  } catch (error) {
    console.log(error);
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
