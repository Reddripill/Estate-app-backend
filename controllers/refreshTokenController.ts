import { Request, Response } from "express";
import { UserModel } from "../models/userModel";
import jwt from 'jsonwebtoken';



const refreshTokenController = (req: Request, res: Response) => {
	const cookies = req.cookies;
	if (cookies?.jwt) res.sendStatus(401);
	const refreshToken = cookies.jwt;
	const foundUser = UserModel.findOne({ refreshToken });
	jwt.verify(
		refreshToken,
		process.env.REFRESH_TOKEN_SECRET as string,
		(err, decoded) => {
			if (err || !foundUser) res.sendStatus(403);
			const accessToken = jwt.sign(
				{
					"firstname": decoded.firstname,
					"lastname": decoded.lastname,
				},
				process.env.ACCESS_TOKEN_SECRET as string,
				{ expiresIn: '15m' }
			)
			res.json({ accessToken })
		}
	)
}

export default refreshTokenController;