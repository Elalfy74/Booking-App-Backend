import express, { Express } from "express";

import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";

export default function (app: Express) {
  app.use(express.json());
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );
}
