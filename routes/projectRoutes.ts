import express from 'express';
import { createProject, getProjects } from '../controllers/projectControllers'

const router = express.Router();

router.route('/createProject').post(createProject);
router.route('/:id').get(getProjects)

export default router;