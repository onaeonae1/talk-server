import User from '../models/User';
import Room from '../models/Room';

export const createRoom = async (req, res) => {
  console.log('Create Room');
  let {
    body: { userList },
  } = req;
  const {
    body: { roomName, creator },
  } = req;
  userList = JSON.parse(userList);
  try {
    if (!userList || !roomName || !creator) throw Error();
    if (!await User.findOne({ _id: creator })) {
      throw Error('');
    }
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
    console.log(error.stack);
    res.status(400).send('Failed to Create Room');
  }
};

export const invite = async (req, res) => {
  console.log('Invite User');
  try {
    const { body: roomId, hostId, guestId } = req;
    const targetRoom = await Room.findOne({ _id: roomId });
    const targetGuest = await User.findOne({ _id: guestId });
    const targetHost = await User.findOne({ _id: hostId });
    if (!targetRoom || !targetGuest || !targetHost) {
      throw Error();
    }
    targetRoom.userList.push(guestId);
    targetGuest.roomList.push(roomId);
    targetRoom.save();
  } catch (error) {
    console.log(error.stack);
    res.status(400).send('Failed to invite user');
  }
};
export const exitRoom = async (req, res) => {
  console.log('exit room');
  const {
    body: { roomId, userId },
  } = req;
  try {
    const targetRoom = await Room.findOne({ _id: roomId });
    const targetUser = await User.findOne({ _id: userId });
    if (!targetRoom || !targetUser) {
      throw Error();
    } else {
      targetRoom.userList.pull({ _id: userId });
      targetUser.roomList.pull({ _id: roomId });
      targetRoom.save();
      targetUser.save();
      res.send(targetUser);
    }
  } catch (error) {
    console.log(error.stack);
    res.status(400).send('Failed to exit Room');
  }
};
export const getRoomChat = async (req, res) => {
  console.log('get Room Chat');
  try {
    const {
      query: { roomId, from, amount },
    } = req;
    const targetRoom = await Room.findOne({ _id: roomId }).populate({
      path: 'chatIdList',
      populate: {
        path: 'speaker',
      },
    });
    const { chatIdList } = targetRoom;
    const fromIndex = chatIdList.map((item) => item._id).indexOf(from);
    const start = fromIndex + 1 - amount < 0 ? 0 : fromIndex + 1 - amount;
    const slicedArr = chatIdList.slice(start, fromIndex + 1);
    // console.log(start, fromIndex);
    res.send(slicedArr);
  } catch (error) {
    console.log(error.stack);
    res.status(400).send('Failed to get Room Chat');
  }
};
