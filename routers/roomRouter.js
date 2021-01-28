import express from 'express';
import routes from '../routes';
import {
  createRoom,
  exitRoom,
  getRoom,
  getRoomChat,
  invite,
} from '../controllers/roomController';
import { isAuthenticated } from '../middlewares';

const roomRouter = express.Router();

roomRouter.post(routes.createRoom, isAuthenticated, createRoom);
roomRouter.post(routes.inviteRoom, isAuthenticated, invite);
roomRouter.post(routes.exitRoom, isAuthenticated, exitRoom);
roomRouter.get(routes.getRoomChat, isAuthenticated, getRoomChat);
roomRouter.get(routes.getRoom, isAuthenticated, getRoom);

export default roomRouter;
