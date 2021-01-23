import User from '../models/User';
import Room from '../models/Room';
import Chat from '../models/Chat';

export const getUsers = async (req, res) => {
	console.log('get Users');
	try {
		const users = await User.find({}).sort({ _id: -1 });
		res.send(users);
	} catch (error) {
		console.log(error.stack);
		res.status(400).send('Failed to get Users');
	}
};
export const getRooms = async (req, res) => {
	console.log('get rooms');
	try {
		const rooms = await Room.find({}).sort({ _id: -1 });
		res.send(rooms);
	} catch (error) {
		console.log(error.stack);
		res.status(400).send('Failed to get Rooms');
	}
};
export const getChats = async (req, res) => {
	console.log('get chats');
	try {
		const chats = await Chat.find({}).sort({ _id: -1 });
		res.send(chats);
	} catch (error) {
		console.log(error.stack);
		res.status(400).send('Failed to get Chats');
	}
};
