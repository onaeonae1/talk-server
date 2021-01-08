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
    console.log("Add Friend");
    try{
        const {
            body:{user_id, friend_id},
        } = req;
        const targetUser = await User.findOne({_id:user_id});
        targetUser.friendsList.push(friend_id);
        targetUser.save();
        res.redirect("/api/users");
    }
    catch(error){
        console.log(error);
        res.send({
            statusCode:400,
            message:"Failed to Add Friend"
        });
    }
};
export const changeProfile = async (req,res)=>{
    console.log("Change Profile");
    try{
        const{
            body:{user_id, avatarUrl, backgroundUrl, nickName, quoteMessage}
        } = req;
        const targetUser = await User.findById(user_id);
        targetUser.avatarUrl = avatarUrl;
        targetUser.backgroundUrl = backgroundUrl;
        targetUser.nickName = nickName;
        targetUser.quoteMessage = quoteMessage;
        targetUser.save();
        console.log("Successfully Changed Profile");
        console.log(targetUser);

    }
    catch(error){
        res.send({
            statuscode:400,
            message:"Failed to Change Profile"
        })
    }
};
export const createRoom = async (req,res)=>{
    //채팅방 개설.
};
export const invite = async(req,res)=>{ 
    //채팅방에 친구를 초대
}