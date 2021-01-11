import User from "../models/User";
import Room from "../models/Room";
import Chat from "../models/Chat";

export const createRoom = async (req, res) => {
  console.log("Create Room");
  let { userList, roomName, creator } = req.body;
  userList = JSON.parse(userList);
  try {
    if (!userList || !roomName || !creator) throw Error();
    const room = await Room.create({
      userList,
      roomName,
      creator,
    });
    await userList.map(async (item) => {
      const user = await User.findById(item);
      user.roomList.push(room._id);
      user.save();
    });
    res.send(room);
  } catch (error) {
    console.log(error);
    res.send({
      statusCode: 400,
      message: "Failed to Create Room",
    });
  }
};

export const invite = async (req, res) => {
  console.log("Invite User");
  try {
    const { body: roomId, hostId, guestId } = req;
    const targetRoom = await Room.findById(roomId);
    const targetGuest = await User.findById(guestId);
    const targetHost = await User.findById(hostId);
    targetRoom.userList.push(targetGuest._id);
    targetRoom.save();
  } catch (error) {
    res.send({
      statusCode: 400,
      message: "Failed to Invite User to Room",
    });
  }
};
export const exitRoom = async (req, res) => {

};
export const getRoomChat = async (req,res) =>{
  console.log("get Room Chat");
  try{
    const {
      query:{roomId, from, amount}
    } = req;
    const targetRoom = await Room.findOne({_id:roomId});
    console.log(targetRoom);
    const chatList = targetRoom.chatList;
    const fromIndex = chatList.indexOf(from);
    const start = fromIndex+1-amount<0 ? 0 : fromIndex+1-amount;
    const slicedArr = chatList.slice(start, fromIndex);
    res.send(slicedArr);
  }
  catch(error){
    res.send(error);
  }
};