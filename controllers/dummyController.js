import express from "express";
import mongoose from "mongoose";

import User from "../models/User";
import Room from "../models/Room";
import Chat from "../models/Chat";

export const createDummyuser = async (req,res)=>{
    console.log("Creating Dummy User with data below..");
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
