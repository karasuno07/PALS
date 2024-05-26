import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';

import GroupRouter from '@/routes/group';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.DATABASE_URL || '', {});

app.get('/', async (req: Request, res: Response) => {
  return res.send('Express + TypeScript Server');
});

app.use('/api/groups', GroupRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
