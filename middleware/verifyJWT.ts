import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';



const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers['authorization'];
	console.log("TOKEN: " + authHeader);
	if (!authHeader) return res.sendStatus(401);
	const token = authHeader.split(' ')[1];
	jwt.verify(
		token,
		process.env.ACCESS_TOKEN_SECRET as string,
		(err, decoded) => {
			if (err) return res.sendStatus(403);
			next();
		}
	)
}

export default verifyJWT;