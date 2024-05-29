import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import GroupRouter from './routes/group';
import PublicRouter from './routes/public';
import UserRouter from './routes/user';
import { logger } from './shared/api';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());
app.use(logger);
// app.use(jwtInterceptor);

mongoose.connect(process.env.DATABASE_URL || '', {});

app.get('/', async (req: Request, res: Response) => {
  return res.send('Express + TypeScript Server');
});

app.use('/api', PublicRouter);
app.use('/api/groups', GroupRouter);
app.use('/api/users', UserRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
