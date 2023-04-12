import express from 'express';
import cors from 'cors';
import connectDB from './config/connectDB';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import verifyJWT from './middleware/verifyJWT';
import authRouter from './routes/authRoutes';
import allUsersRouter from './routes/allUsersRoutes';
import refreshtTokenRouter from './routes/refreshTokenRoutes';

dotenv.config()

const app = express();

connectDB();
app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use('/auth', authRouter);
app.use('/refresh', refreshtTokenRouter)

app.use(verifyJWT);
app.use('/allUsers', allUsersRouter)

app.listen(4444, () => {
	console.log('Server running');
})
