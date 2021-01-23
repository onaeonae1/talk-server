/* eslint-disable func-names */
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Schema 정의
const UserSchema = new mongoose.Schema({
	userName: {
		type: String,
		required: 'String is required',
	},
	dmMap: {
		type: Map,
		of: mongoose.Schema.Types.ObjectId,
	},
	// hashedPassword: {
	// 	type: String,
	// 	required: 'hashed password is required',
	// },
	isConnecting: {
		type: Boolean,
		default: false,
	},
	nickName: {
		type: String,
	},
	birthDay: {
		type: Date,
	},
	email: {
		type: String,
		required: 'Email is Required',
	},
	avatarUrl: {
		type: String,
	},
	backgroundUrl: {
		type: String,
	},
	quoteMessage: {
		type: String,
	},
	friendsList: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	],
	roomList: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Room',
		},
	],
	blockList: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	],
});
// Schema Methods
UserSchema.methods.setPassword = async (password) => {
	const hash = await bcrypt.hash(password, 10);
	this.hashedPassword = hash;
};
UserSchema.methods.checkPassword = async function (password) {
	const result = await bcrypt.compare(password, this.hashedPassword);
	return result;
};
UserSchema.statics.findByEmail = async function (email) {
	const result = await this.findOne({ email });
	return result;
};
const model = mongoose.model('User', UserSchema);
export default model;
