import { globalData } from "../globalData";
import User from "../models/User";
import Room from "../models/Room";
import Chat from "../models/Chat";

export const authenticate = (data, client) => {
  const { authKey, userId } = data;
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

export const requestRoomChat = (data, client) => {
  const { roomId, from, amount } = data;
  // DB에서 해당 Room에 접속, 요청한 메시지부터 amount개의 메시지를 수신하여
  // client에게로 보내줌e.log("Socket Error");
  client.send({
    type: "getRoomChat",
    data: {
      roomId,
      chatList: [],
      isEnd: true,
    },
  });
};
export const quitServer = (data, client) => {
  const { userId } = data;
  globalData.connectingUser[userId] = undefined;
};
