import express from 'express';
import { authControllers } from '../controllers';
import verifyToken from '../middlewares/verifyToken';

const authRouter = express.Router();

authRouter.post('/register', authControllers.registerUser);
authRouter.post('/login', authControllers.loginUser);
authRouter.get('/logout', authControllers.logoutUser);
authRouter.get('/getMyProfile', verifyToken, authControllers.getMyProfile);

export default authRouter;
