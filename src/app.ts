import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/utils/globalErrorHandler/globalErrorHandler';
import router from './app/routes';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

//  routes
app.use('/api', router);

app.use(globalErrorHandler);
app.use((req: Request, res: Response) => {
  res.send("server is running")
});

export default app;
