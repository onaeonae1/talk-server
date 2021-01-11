export const globalData = (() => {
  let verifiedLogin = new Map();
  // verifiedLogin[code] = userId;

  let connectingUser = new Map();
  // connectingUser[userId] = socketClient;

  return { verifiedLogin, connectingUser };
})();
