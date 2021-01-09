import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import apiRouter from "./routers/apiRouter";
import io from "socket.io";
import dummyRouter from "./routers/dummyRouter";
import cors from "cors";
//app 기본 설정
const app = express();

app.use(cors());

//body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//custom Ruters
app.get("/", (req,res)=>{
    res.send({
        title:"Node API Main Page",
        description:"go to /api/getUsers"
    })
});
app.use("/dummy", dummyRouter);
app.use("/api", apiRouter);

export default app;
