import User from '../models/User';
import Room from '../models/Room';
import Chat from '../models/Chat';

export const createRoom = async (req, res) => {
    console.log('Making Room'); // 어떤 User가 채팅방을 만든다
};
export const invite = async (req, res) => {
    // 채팅방에 친구를 초대
    console.log('Invite User');
    try {
      const {
           body: roomId, hostId, guestId 
     } = req; 
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
            message: 'Failed to Invite User to Room',
        });
    }
};
  