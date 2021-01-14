import {
  authenticate,
  quitServer,
  sendRealTimeChat,
} from "./webSocketController";

export const webSocketRouter = (messageObject, client) => {
  console.log(messageObject);
  const { type, data } = messageObject;

  switch (type) {
    case "authenticate":
      authenticate(data, client);
      break;
    case "sendRealTimeChat":
      sendRealTimeChat(data);
      break;
    case "quitServer":
      quitServer(data, client);
    default:
      console.log("Error Wrong message:" + JSON.stringify(messageObject));
      break;
  }
};
