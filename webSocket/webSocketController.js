import { globalData } from '../globalData';
import Chat from '../models/Chat';
import Room from '../models/Room';
import User from '../models/User';

export const authenticate = (data, client) => {
  const { userId } = data;
  const temp = globalData.verifiedLogin.get(String(userId));
  if (temp) {
    temp.send(JSON.stringify({ type: 'block', data: {} }));
  }
  globalData.verifiedLogin.set(String(userId), client);
};

export const sendRealTimeChat = async (data) => {
  const { roomId, userId, chat } = data;
  try {
    const room = await Room.findById(roomId);
    const speaker = await User.findById(userId);
    const newChat = await Chat.create({
      message: chat,
      speaker,
      joiningRoom: roomId,
    });

    room.chatIdList.push(newChat);
    room.recentChat = chat;
    room.recentChatTime = newChat.createdAt;
    await room.save();

    const sendObject = {
      type: 'getRealTimeChat',
      data: {
        chat: newChat,
        roomId,
      },
    };

    room.userList.forEach((item) => {
      const target = globalData.verifiedLogin.get(String(item));
      if (target) {
        target.send(JSON.stringify(sendObject));
      }
    });
  } catch (error) {
    console.log(error);
  }
};
export const quitServer = (data) => {
  const { userId } = data;
  globalData.connectingUser[userId] = undefined;
};
