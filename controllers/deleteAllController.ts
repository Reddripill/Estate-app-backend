import asyncHandler from 'express-async-handler';
import { UserModel } from '../models/userModel';


export const deleteAllController = asyncHandler(async (req, res) => {
	const status = await UserModel.deleteMany({});
	res.json(status)
})