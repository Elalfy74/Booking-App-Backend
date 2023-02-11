import express from 'express';
import middleware from './middleware';
import routes from './routes';

function createServer() {
  const app = express();

  middleware(app);
  routes(app);

  return app;
}

export default createServer;
