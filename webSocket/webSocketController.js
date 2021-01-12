import { globalData } from '../globalData';
import Chat from '../models/Chat';
import Room from '../models/Room';

export const authenticate = (data, client) => {
  const { userId } = data;
  // const verifiedUserId = globalData.verifiedLogin[authKey];
  // if (verifiedUserId) {
  //   globalData.connectingUser[verifiedUserId] = client;
  //   globalData.verifiedLogin[authKey] = undefined;
  // } else {
  //   globalData.verifiedLogin[data.authKey] = undefined;
  // }
  // 로그인 기능이 완성되면 적용

  globalData.verifiedLogin[userId] = client;
};

export const sendRealTimeChat = async (data) => {
  const { roomId, userId, chat } = data;

  const room = await Room.findById(roomId);
  const newChat = await Chat.create({
    message: chat,
    speaker: userId,
    joiningRoom: roomId,
  });
  room.chatList.push(newChat);
  room.save();

  const sendObject = {
    type: 'getRealTimeChat',
    data: {
      chat,
      roomId,
    },
  };
  room.userList.forEach((item) => {
    const target = globalData.connectingUser[item._id];
    if (target) {
      target.send(JSON.stringify(sendObject));
    }
  });
};
export const quitServer = (data) => {
  const { userId } = data;
  globalData.connectingUser[userId] = undefined;
};
