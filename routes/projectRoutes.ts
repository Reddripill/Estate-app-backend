import express from 'express';
import { changeProject, createProject, getProjects } from '../controllers/projectControllers'

const router = express.Router();

router.route('/:id').get(getProjects)
router.route('/createProject').post(createProject);
router.route('/changeProject').post(changeProject);

export default router;