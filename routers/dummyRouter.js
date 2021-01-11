//implemented to make test data. need to be removed
import express from "express";
import {createDummychat, createDummyroom, createDummyuser} from "../controllers/dummyController";
const dummyRouter = express.Router();

//dummy Routers
dummyRouter.post("/user", createDummyuser);
dummyRouter.post("/chat", createDummychat);
dummyRouter.post("/room", createDummyroom);
export default dummyRouter;