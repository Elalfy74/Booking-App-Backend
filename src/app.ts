import express from "express";

import dotenv from "dotenv";
import config from "config";
import "express-async-errors";

import connectToDB from "./startup/db";
import routes from "./startup/routes";
import middlewares from "./startup/middlewares";

dotenv.config();

const app = express();

middlewares(app);

routes(app);

const port = config.get("port") || 8000;

connectToDB().then(() => {
  app.listen(port, () => {
    console.info(`App is Listening to Port ${port}`);
  });
});
