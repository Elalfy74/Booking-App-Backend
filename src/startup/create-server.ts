import 'express-async-errors';
import dotenv from 'dotenv';
import express from 'express';
import middlewares from './middlewares';
import routes from './routes';

dotenv.config();
const app = express();

middlewares(app);
routes(app);

export default app;
