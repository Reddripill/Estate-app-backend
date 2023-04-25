import { UserModel } from '../models/userModel';
import { RequestWithCredentials } from './authControllers';
import { Request, Response } from 'express';


export const getUser = async (req: RequestWithCredentials, res: Response) => {
	const accessToken = req.accessToken;
	const user = req.user;
	if (accessToken && user) {
		return res.json({ accessToken, user, id: user._id })
	} else {
		const requestedId = req.params.id;
		if (!requestedId) return res.sendStatus(404);
		const user = await UserModel.findOne({ _id: requestedId });
		if (!user) return res.sendStatus(404);
		return res.json(user)
	}
}