import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	firstname: {
		type: String,
		required: true,
	},
	lastname: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	phoneNumber: String,
	country: String,
	refreshToken: [String],
})

export const UserModel = mongoose.model('Users', userSchema);

