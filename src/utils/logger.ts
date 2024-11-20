import winston from "winston";
import "winston-daily-rotate-file";
import { config } from "../config/serverConfig";
import LokiTransport from "winston-loki";

const { combine, timestamp, printf, colorize, errors } = winston.format;

// Define custom log format
const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

// Configure Winston logger
const logger = winston.createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    errors({ stack: true }), // Captures stack trace in error messages
    logFormat
  ),
  transports: [
    // Console logging for development
    new winston.transports.Console({
      format: combine(colorize(), logFormat),
    }),

    // // Daily file rotation for production logs
    // new winston.transports.DailyRotateFile({
    //   dirname: "logs",
    //   filename: "application-%DATE%.log",
    //   datePattern: "YYYY-MM-DD",
    //   maxFiles: "30d", // Keep logs for 30 days
    //   zippedArchive: true,
    // }),
    new LokiTransport({
      host: "http://localhost:3100",
      labels: { app: "automation-tool" },
      json: true,
      format: winston.format.json(),
      replaceTimestamp: true,
      onConnectionError: (err: any) => logger.error(err),
    }),
  ],
});

export default logger;
