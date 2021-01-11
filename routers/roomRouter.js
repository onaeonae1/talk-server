import express from "express";
import routes from "../routes";
import { createRoom, exitRoom, getRoomChat, invite } from "../controllers/roomController";
const roomRouter = express.Router();

roomRouter.post(routes.createRoom, createRoom);
roomRouter.post(routes.inviteRoom, invite);
roomRouter.post(routes.exitRoom, exitRoom);
roomRouter.get(routes.getRoomChat, getRoomChat);

export default roomRouter;