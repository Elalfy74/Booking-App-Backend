import mongoose from 'mongoose';
import { logger } from '../utils/logger';
import config from 'config';

export default async function connectToDB() {
  const db: string = config.get('db');

  try {
    mongoose.set('strictQuery', false);
    mongoose.set('strictPopulate', false);
    await mongoose.connect(db);
    logger.info(`Connected to ${db}...`);
  } catch (err) {
    logger.error(`unable to connect to DB ${db}...`);
  }
}
