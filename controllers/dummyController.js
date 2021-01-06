import express from "express";
import mongoose from "mongoose";
import axios from "axios";

import User from "../models/User";
import Room from "../models/Room";
import Chat from "../models/Chat";

export const createDummyuser = async (req,res)=>{
    console.log("Creating Dummy User with data below..");
    console.log(req.body);
    try{
        const{
            body:{
                userName, email, 
            }
        } = req;
        const dummyUser = await User.create({
            userName:userName,
            email:email
        });
        res.send(dummyUser);
    }
    catch(error){
        console.log(error);
        res.send({
            statuscode:400,
            message:"Internal Server Error"
        });
    }
};
export const createDummyroom = async(req,res) =>{
    //특정 채팅방을 개설
    console.log("Make Dummy Room with data below..");
    console.log(req.body);
    try{
        const{
            body:{
                roomName, creator
            }
        } = req;
        const dummyRoom = await Room.create({
            roomName:roomName,
            creator:creator,
            userList:[creator, ]
        });
        res.send(dummyRoom);
    }
    catch(error){
        console.log(error);
        res.send({
            statuscode:400,
            message:"Internal Server Error"
        });
    }
};
export const createDummychat = async(req,res)=>{ 
    //특정 채팅방에 누가 말을 한다.
    console.log("Make Dummy Chat with data below..");
    console.log(req.body);
    try{
        const{
            body:{
                message, speaker, joiningRoom
            }
        } = req;
        const dummyChat = await Chat.create({
            message:message,
            speaker:speaker,
            joiningRoom: joiningRoom
        });
        res.send(dummyChat);
    }
    catch(error){
        console.log(error);
        res.send({
            statuscode:400,
            message:"Internal Server Error"
        });
    }
};

export const dummyPostUser = async (req,res)=>{
    console.log("dummy fetch test");
    try{
        await axios({
            method:'POST',
            url:"http://192.168.35.62:4000/dummy/user",
            data:{
                userName:"oaneonae3",
                email:"onaeonae3@konkuk.ac.kr"
            }
        });
        console.log("post user finished");
        res.redirect("/api/users");
    }
    catch(error){
        console.log(error);
    }
};
export const dummyPostRoom = async(req,res)=>{
    console.log("dummy fetch room");
    try{
        await axios({
            method:'POST',
            url:"http://192.168.35.62:4000/dummy/room",
            data:{
                roomName:"nodejs를 혐오하는 사람의 모임",
                creator: "5ff580df1feb980df879a8e7",
                userList:["5ff580df1feb980df879a8e7", ],
            }
        });
        console.log("post room finished");
        res.redirect("/api/rooms");
    }
    catch(error){
        console.log(error);
    }
};
export const dummyPostChat = async(req,res)=>{
    console.log("dummy fetch chat");
    try{
        await axios({
            method:'POST',
            url:"http://192.168.35.62:4000/dummy/chat",
            data:{
                message:"nodejs 정말 극혐이네요",
                speaker:"5ff580df1feb980df879a8e7",
                joiningRoom:"5ff586d7f044792e88e7985a",
            }
        });
        console.log("post chat finished");
        res.redirect("/api/chats");
    }
    catch(error){
        console.log(error);
    }

}