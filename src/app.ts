import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/utils/globalErrorHandler/globalErrorHandler';
import router from './app/routes';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api', router);

// Global error handler
app.use(globalErrorHandler);

// Catch all middleware for handling undefined routes
app.use((req: Request, res: Response) => {
  res.send("server is running")
});

export default app;
