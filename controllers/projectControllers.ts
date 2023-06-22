import { ProjectModel } from '../models/projectModel';
import { Request, Response } from 'express';

export interface RequestWithCredentials extends Request {
	projectItem?: typeof ProjectModel;
}

export const createProject = async (req: Request, res: Response) => {
	console.log('REQUEST: ', req);
	const project = await ProjectModel.create(req.body);
	res.json({ project })
}