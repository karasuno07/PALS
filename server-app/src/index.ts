import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import { serve, setup } from 'swagger-ui-express';
import GroupRouter from './routes/group';
import PublicRouter from './routes/public';
import UserRouter from './routes/user';
import { errorHandler, jwtInterceptor, logger } from './shared/api';
import apiDocs from './shared/api-docs';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());
app.use(logger);
app.use(jwtInterceptor);

mongoose.connect(process.env.DATABASE_URL || '', {});

app.get('/', async (req: Request, res: Response) => {
  return res.redirect('/api-docs');
});

app.use('/api', PublicRouter);
app.use(
  '/api-docs',
  serve,
  setup(apiDocs, {
    explorer: true,
    swaggerOptions: {
      // url: 'http://petstore.swagger.io/v2/swagger.json',
    },
  })
);
app.use('/api/groups', GroupRouter);
app.use('/api/users', UserRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
