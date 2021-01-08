import User from "../models/User";
import Room from "../models/Room";
import Chat from "../models/Chat";

export const getUser = async (req, res) => {
  console.log("getUser");

  const userId = req.query.id;
  try {
    const user = await User.findOne({ _id: userId }).populate("friendsList");
    res.send(user);
  } catch (error) {
    res.send({
      statuscode: 400,
      message: "No such People",
    });
  }
  res.send("hi");
};

export const getUsers = async (req, res) => {
  console.log("get Users");
  try {
    const users = await User.find({}).sort({ _id: -1 });
    res.send(users);
  } catch (error) {
    res.send({
      statuscode: 400,
      message: "Internal Server Error",
    });
  }
};
export const getRooms = async (req, res) => {
  console.log("get rooms");
  try {
    const rooms = await Room.find({}).sort({ _id: -1 });
    res.send(rooms);
  } catch (error) {
    res.send({
      statuscode: 400,
      message: "Internal Server Error",
    });
  }
};
export const getChats = async (req, res) => {
  console.log("get chats");
  try {
    const chats = await Chat.find({}).sort({ _id: -1 });
    res.send(chats);
  } catch (error) {
    res.send({
      statuscode: 400,
      message: "Internal Server Error",
    });
  }
};

export const addFriend = async (req, res) => {
  console.log("Add Friend");
  try {
    const {
      body: { userId, friendId },
    } = req;
    const targetUser = await User.findOne({ _id: userId });
    targetUser.friendsList.push(friendId);
    targetUser.save();
    res.redirect("/api/users");
  } catch (error) {
    console.log(error);
    res.send({
      statusCode: 400,
      message: "Failed to Add Friend",
    });
  }
};
export const changeProfile = async (req, res) => {
  console.log("Change Profile");
  try {
    const {
      body: { userId, avatarUrl, backgroundUrl, nickName, quoteMessage },
    } = req;
    const targetUser = await User.findById(userId);
    targetUser.avatarUrl = avatarUrl;
    targetUser.backgroundUrl = backgroundUrl;
    targetUser.nickName = nickName;
    targetUser.quoteMessage = quoteMessage;
    targetUser.save();
    console.log("Successfully Changed Profile");
    console.log(targetUser);
  } catch (error) {
    res.send({
      statuscode: 400,
      message: "Failed to Change Profile",
    });
  }
};
export const createRoom = async (req, res) => {
  console.log("Making Room"); //어떤 User가 채팅방을 만든다
};
export const invite = async (req, res) => {
  //채팅방에 친구를 초대
  console.log("Invite User");
  try {
    const { body: roomId, hostId, guestId } = req;
    const targetRoom = await Room.findById(roomId);
    const targetGuest = await User.findById(guestId);
    const targetHost = await User.findById(hostId);
    console.log(targetRoom.roomName);
    console.log(targetGuest.nickName);
    console.log(targetHost.nickName);
    targetRoom.userList.push(targetGuest._id);
    targetRoom.save();
  } catch (error) {
    res.send({
      statusCode: 400,
      message: "Failed to Invite User to Room",
    });
  }
};
