// module imports
import winston from 'winston';
// google cloud client library for Winston import
import { LoggingWinston } from '@google-cloud/logging-winston';
// config import
import { VERSION_NUMBER } from '../config/version.config';

const api = process.env.API_NAME;
const loggingWinston = new LoggingWinston({
  prefix: api,
});
const { colorize, combine, timestamp, json } = winston.format;

// create a winston logger that streams to stackdriver logging
// logs will be written to: "projects/YOUR_PROJECT_ID/logs/winston_log"
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL,
  defaultMeta: { service: `[${api}]`, version: `${VERSION_NUMBER}` },
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    json(),
    colorize({ all: true }),
  ),
  transports: [
    new winston.transports.Console({
      handleExceptions: true,
    }),
  ],
});

// if in google cloud log with google-cloud/logging-winston
if (process.env.NODE_ENV !== 'dev') {
  // add stackdriver logging
  logger.add(loggingWinston);
}

export default logger;
