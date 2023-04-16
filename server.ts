import express from 'express';
import cors from 'cors';
import connectDB from './config/connectDB';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import verifyJWT from './middleware/verifyJWT';
import authRouter from './routes/authRoutes';
import allUsersRouter from './routes/allUsersRoutes';
import refreshtTokenRouter from './routes/refreshTokenRoutes';
import deleteAllRouter from './routes/deletAllRoute';
import corsOptions from './config/corsOptions';
import credentials from './middleware/credentials';

dotenv.config()

const app = express();

connectDB();

app.use(credentials)
app.use(cors(corsOptions))

app.use(express.json())
app.use(cookieParser())

app.use('/auth', authRouter);
app.use('/refresh', refreshtTokenRouter)

app.use(verifyJWT);
app.use('/allUsers', allUsersRouter)
app.use('/deleteAll', deleteAllRouter)

app.listen(4444, () => {
	console.log('Server running');
})
