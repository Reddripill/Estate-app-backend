import asyncHandler from 'express-async-handler';
import { UserModel } from '../models/userModel';
import { Document } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

export interface RequestWithCredentials extends Request {
	accessToken?: string;
	user?: Document;
}

export const userRegister = async (req: RequestWithCredentials, res, next) => {
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
		{ expiresIn: '15m' }
	)
	const refreshToken = jwt.sign(
		{
			"firstname": firstname,
			"lastname": lastname,
		},
		process.env.REFRESH_TOKEN_SECRET as string,
		{ expiresIn: '15d' }
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
	req.accessToken = accessToken;
	req.user = user;
	next()
}


export const login = async (req: Request, res: Response) => {
	const cookies = req.cookies;
	const { email, password } = req.body;
	if (!email || !password) {
		res.status(400)
	}

	const user = await UserModel.findOne({ email }).exec();

	if (!user) return res.sendStatus(401);

	const passwordsMatch = await bcrypt.compare(password, user.password);

	if (passwordsMatch) {
		const accessToken = jwt.sign(
			{
				"firstname": user.firstname,
				"lastname": user.lastname,
			},
			process.env.ACCESS_TOKEN_SECRET as string,
			{ expiresIn: '15m' }
		)
		const newRefreshToken = jwt.sign(
			{
				"firstname": user.firstname,
				"lastname": user.lastname,
			},
			process.env.REFRESH_TOKEN_SECRET as string,
			{ expiresIn: '15d' }
		)

		let refreshTokenArray =
			!cookies.jwt ?
				user.refreshToken :
				user.refreshToken.filter(rt => rt !== cookies.jwt);

		if (cookies?.jwt) {
			const refreshToken = cookies.jwt;
			const findToken = await UserModel.findOne({ refreshToken }).exec();
			if (!findToken) {
				refreshTokenArray = []
			}
			res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'none' })
		}

		user.refreshToken = [...refreshTokenArray, newRefreshToken];
		await user.save();

		res.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 })
		res.json({ accessToken, user, id: user._id.toString() });
	} else {
		res.sendStatus(401);
	}
}


export const logout = async (req: Request, res: Response) => {
	const cookies = req.cookies;
	if (!cookies?.jwt) return res.sendStatus(401);

	const refreshToken = cookies.jwt;

	res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'none' })

	const foundUser = await UserModel.findOne({ refreshToken }).exec();

	if (!foundUser) return res.sendStatus(403);

	const refreshTokenArray = foundUser.refreshToken.filter(rt => rt !== refreshToken);

	foundUser.refreshToken = [...refreshTokenArray];

	await foundUser.save();

	res.json({ refreshToken })
}