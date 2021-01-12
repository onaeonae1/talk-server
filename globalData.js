/* eslint-disable import/prefer-default-export */
export const globalData = (() => {
  const verifiedLogin = new Map();
  // verifiedLogin[code] = userId;

  const connectingUser = new Map();
  // connectingUser[userId] = socketClient;

  return { verifiedLogin, connectingUser };
})();
