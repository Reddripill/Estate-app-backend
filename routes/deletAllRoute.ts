import express from 'express';
import { deleteAllController } from '../controllers/deleteAllController';

const router = express.Router();

router.route('/').delete(deleteAllController);

export default router;