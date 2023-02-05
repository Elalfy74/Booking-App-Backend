import mongoose from "mongoose";
import winston from "winston";
import config from "config";

export default async function connectToDB() {
  const db: string = config.get("db");

  try {
    mongoose.set("strictQuery", false);
    mongoose.set("strictPopulate", false);

    await mongoose.connect(db, {});
    console.info(`Connected to ${db}...`);
    // winston.info(`Connected to ${db}...`);
  } catch (err) {
    // winston.error(`unable to connect to DB ${db}...`);
    console.error(`unable to connect to DB ${db}...`);
  }
}
