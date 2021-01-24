import User from '../models/User';
import Room from '../models/Room';
import Chat from '../models/Chat';
import { globalData } from '../globalData';

export const createRoom = async (req, res) => {
  console.log('Create Room');
  const {
    body: { userList },
  } = req;
  const {
    body: { roomName, creator },
  } = req;
  // console.log(userList, roomName, creator);
  try {
    if (!userList || !roomName || !creator) throw Error();
    if (!(await User.findOne({ _id: creator }))) {
      throw Error('');
    }
    const room = await Room.create({
      userList,
      roomName,
      creator,
    });
    await userList.forEach(async (item) => {
      const user = await User.findById(item);
      user.roomList.push(room._id);
      await user.save();
    });

    // 새로고침 시키기
    userList.forEach((item) => {
      const target = globalData.verifiedLogin.get(String(item));
      if (target) {
        target.send(
          JSON.stringify({
            type: 'getNewRoom',
            data: { room },
          }),
        );
      }
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

    const target = globalData.verifiedLogin.get(String(guestId));
    if (target) {
      target.send(
        JSON.stringify({
          type: 'getNewRoom',
          data: { room: targetRoom },
        }),
      );
    }

    targetRoom.userList.forEach((item) => {
      const tgt = globalData.verifiedLogin.get(String(guestId));
      if (String(item._id) !== String(targetGuest._id) && tgt) {
        target.send(
          JSON.stringify({
            type: 'changeRoomPeople',
            data: {
              roomId: targetRoom._id,
              userId: target._id,
              isOut: false,
            },
          }),
        );
      }
    });

    await targetRoom.save();
    res.send('succesfully invited');
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
  console.log(roomId, userId);
  try {
    const targetRoom = await Room.findOne({ _id: roomId });
    const targetUser = await User.findOne({ _id: userId });
    if (!targetRoom || !targetUser) {
      throw Error();
    } else {
      targetRoom.userList.pull({ _id: userId });
      targetUser.roomList.pull({ _id: roomId });

      await targetRoom.save();
      await targetUser.save();

      targetRoom.userList.forEach((item) => {
        const target = globalData.verifiedLogin.get(String(item));
        if (target) {
          target.send(
            JSON.stringify({
              type: 'changeRoomPeople',
              data: {
                roomId: targetRoom._id,
                userId: targetUser._id,
                isOut: true,
              },
            }),
          );
        }
      });

      // 다 나가면 방의 모든 챗 지움
      if (targetRoom.userList.length === 1) {
        const lastUser = await User.findById(targetRoom.userList[0]);
        lastUser.roomList.pull({ _id: roomId });
        await lastUser.save();

        await targetRoom.chatIdList.forEach(async (item) => {
          await Chat.findByIdAndRemove(item);
        });
        await Room.findByIdAndRemove(targetRoom._id);
      }
      res.send('succesfully exited Room');
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
    console.log(roomId, from, amount);
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

export const getRoom = async (req, res) => {
  console.log('getRoomInfo');
  try {
    const {
      query: { roomId },
    } = req;
    const roomObj = await Room.findById(roomId);
    res.send(roomObj);
  } catch (error) {
    console.log(error);
    res.status(400).send('Failed to get Rooom Info');
  }
};
