import express from 'express';
import { login, logout, userRegister } from '../controllers/authControllers';
import { getUser } from '../controllers/userControllers';

const router = express.Router();

router.route('/signup').post(userRegister, getUser);
router.route('/login').post(login);
router.route('/logout').delete(logout);

export default router;