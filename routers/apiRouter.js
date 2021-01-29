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
import { isAuthenticated, isAuthorized } from '../middlewares';

import routes from '../routes';

const apiRouter = express.Router();

// Total Data -> use for test. need to add Authorization middlewares
apiRouter.get(routes.getUsers, isAuthenticated, isAuthorized, getUsers);
apiRouter.get(routes.getRooms, isAuthenticated, isAuthorized, getRooms);
apiRouter.get(routes.getChats, isAuthenticated, isAuthorized, getChats);
apiRouter.get(routes.userInfo, getUserInfo);

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

export default apiRouter;
