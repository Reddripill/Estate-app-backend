import { Request, Response } from "express";
import { UserModel } from "../models/userModel";
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';



const refreshTokenController = asyncHandler(async (req: Request, res: Response) => {
	const cookies = req.cookies;
	console.log("COOKIES: " + cookies);
	if (!cookies?.jwt) res.sendStatus(401);
	const refreshToken = cookies.jwt;
	const foundUser = await UserModel.findOne({ refreshToken });
	jwt.verify(
		refreshToken,
		process.env.REFRESH_TOKEN_SECRET as string,
		(err, decoded) => {
			console.log("ERROR: " + err);
			if (err || !foundUser) res.sendStatus(403);
			const accessToken = jwt.sign(
				{
					"firstname": decoded.firstname,
					"lastname": decoded.lastname,
				},
				process.env.ACCESS_TOKEN_SECRET as string,
				{ expiresIn: '15s' }
			)
			res.json({ accessToken })
		}
	)
})

export default refreshTokenController;