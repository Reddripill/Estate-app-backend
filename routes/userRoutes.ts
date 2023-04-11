import express from 'express';
import { userRegister } from '../controllers/authControllers';

const router = express.Router();

router.route('/signup').post(userRegister);

export default router;