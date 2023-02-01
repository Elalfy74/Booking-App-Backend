import express, { NextFunction, Request, Response } from "express";
import createError, { HttpError } from "http-errors";
import dotenv from "dotenv";
import config from "config";

import bodyParser from "body-parser";
import cors from "cors";
import "express-async-errors";

import connectToDB from "./startup/db";

import authRoutes from "./routes/auth";
import cityRoutes from "./routes/city";
import countriesRoutes from "./routes/country";
import roomCategoriesRoutes from "./routes/room-category";
import hotelCategorieRoutes from "./routes/hotel-category";
import hotelRoutes from "./routes/hotel";

dotenv.config();

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/countries", countriesRoutes);
app.use("/api/cities", cityRoutes);
app.use("/api/room-categories", roomCategoriesRoutes);
app.use("/api/hotel-categories", hotelCategorieRoutes);
app.use("/api/hotels", hotelRoutes);

app.use((error: HttpError, req: Request, res: Response, next: NextFunction) => {
  if (!error.status) {
    error = createError.InternalServerError(
      error.message ?? "Internel Server Error"
    );
  }

  res.status(error.status).send({ message: error.message });
});

const port = config.get("port") || 8000;

connectToDB().then(() => {
  app.listen(port, () => {
    console.info(`App is Listening to Port ${port}`);
  });
});
