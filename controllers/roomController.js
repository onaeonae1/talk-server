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
