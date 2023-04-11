import express from 'express';
import { allUsersControllers } from '../controllers/allUsersControllers';

const router = express.Router();

router.route('/').get(allUsersControllers);

export default router;