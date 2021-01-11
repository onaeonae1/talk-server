import { authenticate, quitServer } from "./webSocketController";

export const webSocketRouter = (messageObject, client) => {
  const { type, data } = messageObject;

  switch (type) {
    case "authenticate":
      authenticate(data, client);
      break;
    case "requestRoomChat":
      break;
    case "quitServer":
      quitServer(data, client);
    default:
      console.log("Error Wrong message:" + data);
      break;
  }
};
