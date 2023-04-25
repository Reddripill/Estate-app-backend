import { Request, Response } from "express";
import { UserModel } from "../models/userModel";
import jwt from 'jsonwebtoken';



const refreshTokenController = async (req: Request, res: Response) => {
	const cookies = req.cookies;
	if (!cookies?.jwt) return res.sendStatus(401);

	const refreshToken = cookies.jwt;

	res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'none' })

	const foundUser = await UserModel.findOne({ refreshToken });

	if (!foundUser) {
		return res.sendStatus(403);
	}

	const newRefreshTokenArray = foundUser.refreshToken.filter(rt => rt !== refreshToken);

	jwt.verify(
		refreshToken,
		process.env.REFRESH_TOKEN_SECRET as string,
		async (err, decoded) => {
			if (err) {
				foundUser.refreshToken = [...newRefreshTokenArray];
				await foundUser.save();
			}
			if (err || decoded.firstname !== foundUser.firstname) return res.sendStatus(403)
			const accessToken = jwt.sign(
				{
					"firstname": decoded.firstname,
					"lastname": decoded.lastname,
				},
				process.env.ACCESS_TOKEN_SECRET as string,
				{ expiresIn: '15s' }
			)

			const newRefreshToken = jwt.sign(
				{
					"firstname": decoded.firstname,
					"lastname": decoded.lastname,
				},
				process.env.REFRESH_TOKEN_SECRET as string,
				{ expiresIn: '15m' }
			)

			foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken]
			await foundUser.save();

			res.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 })

			res.json({ accessToken, user: foundUser, id: foundUser.id })
		}
	)
}

export default refreshTokenController;