import asyncHandler from 'express-async-handler';
import { UserModel } from '../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const userRegister = asyncHandler(async (req, res) => {
	const {
		firstname,
		lastname,
		email,
		password,
		phoneNumber,
		country,
	} = req.body;
	if (
		!firstname || !lastname || !email ||
		!password || !phoneNumber || !country
	) {
		res.status(400)
	}
	const hashedPassword = await bcrypt.hash(password, 10);
	const accessToken = jwt.sign(
		{
			"firstname": firstname,
			"lastname": lastname,
		},
		process.env.ACCESS_TOKEN_SECRET as string,
		{ expiresIn: '15s' }
	)
	const refreshToken = jwt.sign(
		{
			"firstname": firstname,
			"lastname": lastname,
		},
		process.env.REFRESH_TOKEN_SECRET as string,
		{ expiresIn: '15m' }
	)
	const user = await UserModel.create({
		firstname,
		lastname,
		email,
		password: hashedPassword,
		phoneNumber,
		country,
		refreshToken,
	})
	res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
	res.json({ accessToken });
})


export const login = asyncHandler(async (req, res) => {

})