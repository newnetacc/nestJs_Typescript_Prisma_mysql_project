import { createLogger, format, transports } from 'winston';
const { combine, splat, timestamp, printf } = format;

export class Utils {
  static logger = createLogger({
    level: 'debug',
    format: combine(
      format.metadata(),
      format.colorize(),
      splat(),
      timestamp(),
      printf(({ level, message, timestamp, ...metadata }) => `${timestamp} ${level} : ${message} ${metadata ? JSON.stringify(metadata) : ''}`)
    ),
    transports: [
      new transports.Console()
    ]
  });
}
