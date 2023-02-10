import 'express-async-errors';

import config from 'config';
import dotenv from 'dotenv';
import http from 'http';

import connectToDB from './startup/db';
import checkConfig from './startup/config';
import { logger, testLoggerEnv } from './utils/logger';
import createServer from './startup/create-server';

import { addHotels, addCountries, addCities } from './scripts/scipt';

dotenv.config();
testLoggerEnv();
checkConfig();

const port = config.get('port') || 8000;

const app = createServer();

const server = http.createServer(app);

if (process.env.NODE_ENV !== 'test') {
  connectToDB().then(() => {
    server.listen(port, () => {
      logger.info(`Running at Port ${port}`);
      // addHotels();
      // addCities();
      // addCountries();
    });
  });
}

export default app;
