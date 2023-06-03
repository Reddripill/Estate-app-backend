import express from 'express';
import { changeUserCredentials, deleteUser, getUser } from '../controllers/userControllers';

const router = express.Router();

router.route('/:id').get(getUser);
router.route('/change').post(changeUserCredentials);
router.route('/delete').delete(deleteUser);

export default router;