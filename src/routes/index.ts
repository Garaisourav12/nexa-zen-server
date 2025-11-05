import express from 'express';
import authRouter from './authRoutes';

const apiRouter = express.Router();

apiRouter.use('/auth', authRouter);

export default apiRouter;
