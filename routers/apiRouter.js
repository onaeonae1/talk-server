import express from 'express';
import { getUsers, getRooms, getChats } from '../controllers/apiController';
import { login, register } from '../controllers/authController';
import {
  getUser,
  addFriend,
  removeFriend,
  blockUser,

} from '../controllers/userController';
import routes from '../routes';

const apiRouter = express.Router();

// Total Data
apiRouter.get(routes.getUsers, getUsers);
apiRouter.get(routes.getRooms, getRooms);
apiRouter.get(routes.getChats, getChats);

// Implemented Functions : authController
apiRouter.post(routes.login, login);
apiRouter.post(routes.register, register);
// logout

// Implemented Functions : userController
apiRouter.get(routes.getUser, getUser);
apiRouter.post(routes.addFriend, addFriend);
apiRouter.post(routes.removeFriend, removeFriend);
apiRouter.post(routes.blockUser, blockUser);

export default apiRouter;
