import User from '../models/User';
import Room from '../models/Room';
import Chat from '../models/Chat';

export const isLoggedin = async (req, res) => {
  // 문제가 많은 코드. 테스트 하고 제거할 거 같음
  if (!req.user) {
    res.status(400).send('You are NOT logged in. try log in');
  } else {
    const {
      userName, _id,
    } = req.user;
    res.send({
      _id,
      message: `you are logged in as :${userName}`,
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({ _id: -1 });
    res.send(users);
  } catch (error) {
    console.log(error.stack);
    res.status(400).send('Failed to get Users');
  }
};
export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find({}).sort({ _id: -1 });
    res.send(rooms);
  } catch (error) {
    console.log(error.stack);
    res.status(400).send('Failed to get Rooms');
  }
};
export const getChats = async (req, res) => {
  try {
    const chats = await Chat.find({}).sort({ _id: -1 });
    res.send(chats);
  } catch (error) {
    console.log(error.stack);
    res.status(400).send('Failed to get Chats');
  }
};

export const getUserInfo = async (req, res) => {
  const userId = req.query.id;
  console.log(userId);
  try {
    const user = await User.findOne({ _id: userId });
    const modified = await user.getInfo();
    res.send(modified);
  } catch (error) {
    console.log(error.stack);
    res.status(400).send('Failed to get Chats');
  }
};
