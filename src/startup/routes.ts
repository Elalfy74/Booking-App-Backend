import { Express, NextFunction, Request, Response } from 'express';
import createHttpError, { HttpError } from 'http-errors';

import authRoutes from '../routes/auth';
import cityRoutes from '../routes/city';
import countriesRoutes from '../routes/country';
// import roomCategoriesRoutes from "../routes/room-category";
// import hotelCategorieRoutes from '../routes/hotel-category';
import hotelRoutes from '../routes/hotel';
import roomUnitRoutes from '../routes/room-unit';
import { logger } from '../utils/logger';

export default function (app: Express) {
  app.use('/api/auth', authRoutes);
  app.use('/api/countries', countriesRoutes);
  app.use('/api/cities', cityRoutes);
  // app.use("/api/room-categories", roomCategoriesRoutes);
  // app.use('/api/hotel-categories', hotelCategorieRoutes);
  app.use('/api/hotels', hotelRoutes);
  app.use('/api/room-units', roomUnitRoutes);

  app.use((error: HttpError, req: Request, res: Response, next: NextFunction) => {
    if (!error.status) {
      error.message = error.message ?? 'Internel Server Error';
      error = createHttpError.InternalServerError(error.message);

      logger.log({
        level: 'error',
        message: error.message,
      });
    }

    res.status(error.status).send({ message: error.message });
  });
}
