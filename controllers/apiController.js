import express from "express";
import mongoose from "mongoose";

import User from "../models/User";
import Room from "../models/Room";
import Chat from "../models/Chat";

export const getUsers = async(req,res)=>{
    console.log("get Users");
    try{
        const users = await User.find({}).sort({ _id: -1 });
        res.send(users);
    }
    catch(error){
        res.send({
            statuscode:400,
            message:"Internal Server Error"
        });
    }
};
export const getRooms = async(req,res)=>{
    console.log("get rooms");
    try{
        const rooms = await Room.find({}).sort({_id:-1});
        res.send(rooms);
    }
    catch(error){
        res.send({
            statuscode:400,
            message:"Internal Server Error"
        });
    }
};
export const getChats = async(req,res) =>{
    console.log("get chats");
    try{
        const chats = await Chat.find({}).sort({_id:-1});
        res.send(chats);
    }
    catch(error){
        res.send({
            statuscode:400,
            message:"Internal Server Error"
        });
    }
};

export const addFriend = async (req,res)=>{
    //내가 누군가를 친구로 추가
    console.log("Add Friend");
    const {
        body:{user_id, friend_id},
    } = req;
    const targetUser = await User.findById(user_id);
    targetUser.friendsList.push(friend_id);
    targetUser.save();
    console.log(targetUser);
};
export const invite = async(req,res)=>{ 
    //친구를 초대
}