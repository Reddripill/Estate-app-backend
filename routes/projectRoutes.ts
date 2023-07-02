import express from 'express';
import { changeProject, createProject, deleteProject, getProjects } from '../controllers/projectControllers'

const router = express.Router();

router.route('/:id').get(getProjects)
router.route('/createProject').post(createProject);
router.route('/changeProject').post(changeProject);
router.route('/deleteProject').delete(deleteProject);

export default router;