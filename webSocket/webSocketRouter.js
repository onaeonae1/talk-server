export const webSocketRouter = (message) => {
  const { type, data } = message;

  switch (type) {
    case "authenticate":
      break;
    case "requestRoomChat":
      break;
    default:
      console.log("Error Wrong message:" + data);
      break;
  }
};
