import { UserModel } from '../models/userModel';
import { RequestWithCredentials } from './authControllers';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';


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

export const changeUserCredentials = async (req: Request, res: Response) => {
	const {
		firstname,
		lastname,
		email,
		currentPassword,
		confirmNewPassword,
		newPassword,
	} = req.body;

	const cookies = req.cookies;

	if (!cookies?.jwt) return res.sendStatus(401);

	const refreshToken = cookies.jwt;

	const foundUser = await UserModel.findOne({ refreshToken }).exec();

	if (!foundUser) return res.sendStatus(401)

	foundUser.firstname = firstname;
	foundUser.lastname = lastname;
	foundUser.email = email;
	if (!newPassword && !confirmNewPassword && !currentPassword) {
		await foundUser.save();
		res.json({ foundUser })
	} else if (newPassword && confirmNewPassword && currentPassword) {
		const passwordsMatch = await bcrypt.compare(currentPassword, foundUser.password);
		const newPasswordsMatch = newPassword === confirmNewPassword;
		if (passwordsMatch && newPasswordsMatch) {
			foundUser.password = await bcrypt.hash(newPassword, 10);
			await foundUser.save();
			res.json({ foundUser })
		} else {
			return res.sendStatus(401)
		}
	} else {
		return res.sendStatus(401)
	}
}


export const deleteUser = async (req: Request, res: Response) => {
	const cookies = req.cookies;

	if (!cookies?.jwt) return res.sendStatus(401);

	const refreshToken = cookies.jwt;

	const foundUser = await UserModel.findOne({ refreshToken }).exec();

	if (!foundUser) return res.sendStatus(401)

	const deletedUser = await UserModel.deleteOne({ refreshToken })

	console.log('USER: ', deletedUser);

	if (!deletedUser) return res.sendStatus(404);
	return res.json(foundUser)
}
