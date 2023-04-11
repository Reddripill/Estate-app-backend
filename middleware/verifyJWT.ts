import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';



const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
	const authHeader: string = req.header['authorization'];
	if (!authHeader) res.sendStatus(401);
	const token = authHeader.split(' ')[1];
	jwt.verify(
		token,
		process.env.ACCESS_TOKEN_SECRET as string,
		(err, decoded) => {
			if (err) res.sendStatus(403);
			next();
		}
	)
}

export default verifyJWT;