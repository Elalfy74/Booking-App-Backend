import express from 'express';
import middlewares from './middlewares';
import routes from './routes';

function createServer() {
  const app = express();

  middlewares(app);
  routes(app);

  return app;
}

export default createServer;
