import express from "express";
import { getUsers, getRooms, getChats } from "../controllers/apiController";
import {
  dummyPostChat,
  dummyPostRoom,
  dummyPostUser,
} from "../controllers/dummyController";
import { createRoom } from "../controllers/roomController";

import {
  getUser,
  addFriend,
  removeFriend,
  blockUser,
} from "../controllers/userController";
const apiRouter = express.Router();

//Total Data
apiRouter.get("/getUsers", getUsers);
apiRouter.get("/getRooms", getRooms);
apiRouter.get("/getChats", getChats);

//dummy test
apiRouter.get("/testuser", dummyPostUser);
apiRouter.get("/testroom", dummyPostRoom);
apiRouter.get("/testchat", dummyPostChat);

//Implemented Functions
apiRouter.get("/getUser", getUser);
apiRouter.post("/addFriend", addFriend);
apiRouter.post("/removeFriend", removeFriend);
apiRouter.post("/blockUser", blockUser);
apiRouter.post("/createRoom", createRoom);

export default apiRouter;
