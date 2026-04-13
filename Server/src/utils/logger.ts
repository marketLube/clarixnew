import pino from "pino";
import type { LoggerOptions } from "pino";

const isProd = process.env.NODE_ENV === "production" || process.env.VERCEL === "1";

const options: LoggerOptions = {
  level: isProd ? "info" : "debug",
  timestamp: pino.stdTimeFunctions.isoTime,
};


if (!isProd) {
  (options as any).transport = {
    target: "pino-pretty",
    options: { colorize: true },
  };
}

export const logger = pino(options);
