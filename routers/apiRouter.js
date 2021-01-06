import express from "express";
import { addFriend, getChats, getUsers, getRooms } from "../controllers/apiController";
import { dummyPostChat, dummyPostRoom, dummyPostUser } from "../controllers/dummyController";
const apiRouter = express.Router();

apiRouter.get("/users", getUsers);
apiRouter.get("/rooms", getRooms);
apiRouter.get("/chats",getChats);
apiRouter.post("/addFriend", addFriend);

//dummy test
apiRouter.get("/testuser", dummyPostUser);
apiRouter.get("/testroom", dummyPostRoom);
apiRouter.get("/testchat", dummyPostChat);
export default apiRouter;