import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	firstname: String,
	lastname: String,
	email: String,
	password: String,
	phoneNumber: String,
	country: String,
	refreshToken: String,
})

export const UserModel = mongoose.model('Users', userSchema);

