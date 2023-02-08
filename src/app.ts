// import 'express-async-errors';

import config from 'config';
import dotenv from 'dotenv';
// import express from 'express';
import http from 'http';

import connectToDB from './startup/db';
// import middlewares from './startup/middlewares';
// import routes from './startup/routes';
import checkConfig from './startup/config';
import { logger, testLoggerEnv } from './utils/logger';
import app from './startup/create-server';

// dotenv.config();
testLoggerEnv();
checkConfig();

const port = config.get('port') || 8000;

// const app = express();

// middlewares(app);
// routes(app);

const server = http.createServer(app);

connectToDB().then(() => {
  server.listen(port, () => {
    logger.info(`Running at Port ${port}`);
  });
});

export default app;
