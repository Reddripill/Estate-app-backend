import express from 'express';
import { createProject } from '../controllers/projectControllers'

const router = express.Router();

router.route('/').post(createProject);

export default router;