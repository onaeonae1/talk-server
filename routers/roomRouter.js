import express from 'express';
import routes from '../routes';
import {
  createRoom,
  exitRoom,
  getRoom,
  getRoomChat,
  invite,
} from '../controllers/roomController';
import { isAuth } from '../middlewares';

const roomRouter = express.Router();

roomRouter.post(routes.createRoom, isAuth, createRoom);
roomRouter.post(routes.inviteRoom, isAuth, invite);
roomRouter.post(routes.exitRoom, isAuth, exitRoom);
roomRouter.get(routes.getRoomChat, isAuth, getRoomChat);
roomRouter.get(routes.getRoom, isAuth, getRoom);

export default roomRouter;
