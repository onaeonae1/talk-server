import express from 'express';
import {
  getUsers, getRooms, getChats, getUserInfo, isLoggedin,
} from '../controllers/apiController';
import { login, logout, register } from '../controllers/authController';
import {
  getUser,
  addFriend,
  removeFriend,
  blockUser,
  getUserEmail,
  changeProfileImage,
  changeBackground,

} from '../controllers/userController';
import { isAuthenticated, isAuthorized, apiLimitter } from '../middlewares';
import { uploadAvatar, uploadBackground } from '../upload';

import routes from '../routes';

const apiRouter = express.Router();
// To Limit API Calls
apiRouter.use(apiLimitter);

// Total Data -> only for admin. authorization middleware added.
apiRouter.get(routes.getUsers, isAuthenticated, isAuthorized, getUsers);
apiRouter.get(routes.getRooms, isAuthenticated, isAuthorized, getRooms);
apiRouter.get(routes.getChats, isAuthenticated, isAuthorized, getChats);

// user info -> public
apiRouter.get(routes.userInfo, getUserInfo);

// isLoggedin. if logged in? -> sends user _id
apiRouter.get(routes.isLoggedin, isAuthenticated, isLoggedin);

// Implemented Functions : authController
apiRouter.post(routes.login, login);
apiRouter.post(routes.register, register);
apiRouter.post(routes.logout, isAuthenticated, logout);

// Implemented Functions : userController
apiRouter.get(routes.getUser, getUser);
apiRouter.get(routes.getUserEmail, isAuthenticated, getUserEmail);

apiRouter.post(routes.addFriend, isAuthenticated, addFriend);
apiRouter.post(routes.removeFriend, isAuthenticated, removeFriend);
apiRouter.post(routes.blockUser, isAuthenticated, blockUser);

apiRouter.post(routes.changeProfileImage, isAuthenticated, uploadAvatar, changeProfileImage);
apiRouter.post(routes.changeBackground, isAuthenticated, uploadBackground, changeBackground);

export default apiRouter;
