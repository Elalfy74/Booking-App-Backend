import "express-async-errors";

import config from "config";
import dotenv from "dotenv";
import express from "express";

import connectToDB from "./startup/db";
import middlewares from "./startup/middlewares";
import routes from "./startup/routes";
// import { addCities } from "./scripts/scipt";
// import { addCountries } from "./scripts/scipt";

dotenv.config();

const app = express();

middlewares(app);

routes(app);

const port = config.get("port") || 8000;

connectToDB().then(() => {
  app.listen(port, () => {
    // addCountries();
    // addCities();
    console.info(`App is Listening to Port ${port}`);
  });
});
