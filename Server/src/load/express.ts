import express from "express";
import type { Application } from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import rateLimit from "express-rate-limit";
import pinoHttp from "pino-http";

import { logger } from "../utils/logger.js";
import { notFoundHandler, errorHandler } from "../middlewares/error.middleware.js";

export const createExpressApp = (): Application => {
  const app = express();

  app.use(helmet());

  app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    })
  );

  app.use(
    pinoHttp({
      logger,
      autoLogging: true,
    })
  );

  app.use(compression());

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));


  // Trust Vercel's proxy to get correct IP addresses
  app.set('trust proxy', true);

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 200,
      standardHeaders: true,
      legacyHeaders: false,
      // If we can't get the IP, we shouldn't block the request in production
      skip: (req) => !req.ip,
      validate: {
        xForwardedForHeader: false,
        default: true
      },
    })
  );

  return app;
};
