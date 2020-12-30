import express from "express";
import socketio from "socket.io";
import http from "http";

import apiRouter from "./routers/apiRouter";
const app = express();
app.use('/api', apiRouter);
export default app;