import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express, { Response } from 'express';
import connectDB from './db';
import {
  globalErrorHandler,
  routeNotFoundErrorHandler,
} from './middlewares/errorHandler';
import apiRouter from './routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

(async () => {
  // Connect to MongoDB
  await connectDB();

  // Middleware
  app.use(express.json());
  app.use(cookieParser());

  // Welcome message
  app.get('/', (_, res: Response) => {
    res.status(200).json({ message: 'Welcome to the CRM Service' });
  });

  // Routes
  app.use('/api', apiRouter);

  // Global error handler (must be last)
  app.use(globalErrorHandler);

  // Route not found error handler
  app.use(routeNotFoundErrorHandler);

  app.listen(port, () => {
    // Log on production only
    if (process.env.NODE_ENV === 'production') {
      process.stdout.write(`⚠️ Server started [Production Build]\n`);
    } else {
      console.log(`🚀 Server running on port ${port}`);
      console.log(`http://localhost:${port}`);
    }
  });
})();
