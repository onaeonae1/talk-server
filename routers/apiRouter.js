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
import { isAuth } from '../middlewares';

import routes from '../routes';

const apiRouter = express.Router();

// Total Data -> use for test. need to be removed
apiRouter.get(routes.getUsers, getUsers);
apiRouter.get(routes.getRooms, getRooms);
apiRouter.get(routes.getChats, getChats);
apiRouter.get(routes.userInfo, getUserInfo);

// Implemented Functions : authController
apiRouter.post(routes.login, login);
apiRouter.post(routes.register, register);

apiRouter.post(routes.logout, isAuth, logout);

// Implemented Functions : userController
apiRouter.get(routes.getUser, isAuth, getUser);
apiRouter.get(routes.getUserEmail, isAuth, getUserEmail);
apiRouter.post(routes.addFriend, isAuth, addFriend);
apiRouter.post(routes.removeFriend, isAuth, removeFriend);
apiRouter.post(routes.blockUser, isAuth, blockUser);

export default apiRouter;
