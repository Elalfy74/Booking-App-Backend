import express, { Express } from 'express';
import config from 'config';

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';

export default function (app: Express) {
  const frontEndUrl = config.get<string>('frontEndUrl') || 'http://localhost:5173';

  app.use(express.json());
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(
    cors({
      origin: frontEndUrl,
      credentials: true,
    })
  );
}
