import { ProjectModel } from '../models/projectModel';
import { Request, Response } from 'express';

export interface RequestWithCredentials extends Request {
	projectItem?: typeof ProjectModel;
}

export const createProject = async (req: Request, res: Response) => {
	const currentDate = new Date().toLocaleDateString('en-US');
	console.log({ creationDate: currentDate, ...req.body });
	const project = await ProjectModel.create({ creationDate: currentDate, ...req.body });
	res.json({ project })
}

export const getProjects = async (req: Request, res: Response) => {
	const requestedId = req.params.id;
	if (!requestedId) return res.sendStatus(404);
	const user = await ProjectModel.find({ userId: requestedId });
	if (!user) return res.sendStatus(404);
	return res.json(user)
}