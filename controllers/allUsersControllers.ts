import asyncHandler from 'express-async-handler';
import { UserModel } from '../models/userModel';


export const allUsersControllers = asyncHandler(async (req, res) => {
	console.log('hi');
	const allUsers = await UserModel.find()
	console.log(allUsers);
	res.json(allUsers)
})