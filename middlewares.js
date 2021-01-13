/* eslint-disable import/prefer-default-export */
import mongoose from "mongoose";

import User from "./models/User";
import Room from "./models/Room";
import Chat from "./models/Chat";
import routes from "./routes";

export const localsMiddleware = (req, res, next) => {
  res.locals.routes = routes;
  next();
};

export const userCheck = (req, res, next) => {
  // const {
  //   userId, friendId, blockId,
  // }
  next();
};
