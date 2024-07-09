import * as winston from 'winston'
import 'winston-daily-rotate-file'

const logDir = 'logs'

const dailyRotateFileTransport = new winston.transports.DailyRotateFile({
  filename: `${logDir}/%DATE%-results.log`,
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d'
})

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new winston.transports.Console(),
    dailyRotateFileTransport
  ]
})

export class Logger {
  log = (message: string) => {
    logger.info(message)
  }

  error = (message: string) => {
    logger.error(message)
  }

  warn = (message: string) => {
    logger.warn(message)
  }

  debug = (message: string) => {
    logger.debug(message)
  }

  verbose = (message: string) => {
    logger.verbose(message)
  }
}