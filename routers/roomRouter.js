import express from 'express';
import routes from '../routes';
import {
  createRoom,
  exitRoom,
  getRoom,
  getRoomChat,
  invite,
} from '../controllers/roomController';

const roomRouter = express.Router();

roomRouter.post(routes.createRoom, createRoom);
roomRouter.post(routes.inviteRoom, invite);
roomRouter.post(routes.exitRoom, exitRoom);
roomRouter.get(routes.getRoomChat, getRoomChat);
roomRouter.get(routes.getRoom, getRoom);

export default roomRouter;
