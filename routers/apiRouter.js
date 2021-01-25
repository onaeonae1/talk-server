import express from 'express';
import {
  getUsers, getRooms, getChats, getUserInfo,
} from '../controllers/apiController';
import { login, logout, register } from '../controllers/authController';
import {
  getUser,
  addFriend,
  removeFriend,
  blockUser,
  getUserEmail,

} from '../controllers/userController';
import routes from '../routes';

const apiRouter = express.Router();

// Total Data
apiRouter.get(routes.getUsers, getUsers);
apiRouter.get(routes.getRooms, getRooms);
apiRouter.get(routes.getChats, getChats);
apiRouter.get(routes.userInfo, getUserInfo);

// Implemented Functions : authController
apiRouter.post(routes.login, login);
apiRouter.post(routes.register, register);
apiRouter.post(routes.logout, logout);

// Implemented Functions : userController
apiRouter.get(routes.getUser, getUser);
apiRouter.get(routes.getUserEmail, getUserEmail);
apiRouter.post(routes.addFriend, addFriend);
apiRouter.post(routes.removeFriend, removeFriend);
apiRouter.post(routes.blockUser, blockUser);

export default apiRouter;
