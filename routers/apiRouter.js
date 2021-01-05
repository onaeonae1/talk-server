import express from "express";
import { addFriend, getChats, getUsers, getRooms } from "../controllers/apiController";
const apiRouter = express.Router();

apiRouter.get("/users", getUsers);
apiRouter.get("/rooms", getRooms);
apiRouter.get("/chats",getChats);
apiRouter.post("/addFriend", addFriend);

export default apiRouter;