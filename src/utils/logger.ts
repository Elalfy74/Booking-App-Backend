import config from 'config';
import winston from 'winston';

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

export const testLoggerEnv = () => {
  if (config.get('NODE_ENV') !== 'production') {
    logger.add(
      new winston.transports.Console({
        format: winston.format.simple(),
      })
    );
  }
};
