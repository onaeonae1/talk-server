import express from "express";
import { getUsers, getRooms, getChats } from "../controllers/apiController";
import {
  dummyPostChat,
  dummyPostRoom,
  dummyPostUser,
} from "../controllers/dummyController";
import { createRoom, getRoomChat } from "../controllers/roomController";
import {
  getUser,
  addFriend,
  removeFriend,
  blockUser,
} from "../controllers/userController";
import routes from "../routes";

const apiRouter = express.Router();

//Total Data
apiRouter.get(routes.getUsers, getUsers);
apiRouter.get(routes.getRooms, getRooms);
apiRouter.get(routes.getChats, getChats);

//dummy test
apiRouter.get(routes.testUser, dummyPostUser);
apiRouter.get(routes.testRoom, dummyPostRoom);
apiRouter.get(routes.testChat, dummyPostChat);

//Implemented Functions
apiRouter.get(routes.getUser, getUser);
apiRouter.post(routes.addFriend, addFriend);
apiRouter.post(routes.removeFriend, removeFriend);
apiRouter.post(routes.blockUser, blockUser);

apiRouter.get(routes.getRoomChat, getRoomChat);
apiRouter.post(routes.createRoom, createRoom);


export default apiRouter;
