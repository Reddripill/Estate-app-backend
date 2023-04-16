import asyncHandler from 'express-async-handler';
import { UserModel } from '../models/userModel';


export const allUsersControllers = asyncHandler(async (req, res) => {
	const allUsers = await UserModel.find()
	res.json(allUsers)
})