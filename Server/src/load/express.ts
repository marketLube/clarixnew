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

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
          styleSrc: ["'self'", "'unsafe-inline'", "https:"],
          imgSrc: [
            "'self'",
            "data:",
            "blob:",
            "https://images.unsplash.com",
            "https://upload.wikimedia.org",
            "https://*.wikimedia.org",
            "https://*.wikipedia.org",
            "https://campusways.com",
            "https://*.campusways.com",
            "https://xalesassets.sgp1.digitaloceanspaces.com",
            "https://res.cloudinary.com",
            "https://ui-avatars.com",
            "https://api.duckduckgo.com",
            "https://*.googleusercontent.com",
          ],
          connectSrc: [
            "'self'",
            "https://api.clarixeducation.com",
            "https://*.clarixeducation.com",
            "http://localhost:8000",
            "http://localhost:3000",
            "ws://localhost:3000",
            "wss://localhost:3000",
          ],
          fontSrc: ["'self'", "https:", "data:"],
          objectSrc: ["'none'"],
          mediaSrc: ["'self'"],
          frameSrc: ["'self'"],
        },
      },
      hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
      },
      crossOriginEmbedderPolicy: false,
      crossOriginResourcePolicy: { policy: "cross-origin" },
    })
  );

  app.use(
    cors({
      origin: [
            "https://clarixeducation.com",
            "https://www.clarixeducation.com",
            "https://clarix.in",
            "https://www.clarix.in",
            "https://admin.clarixeducation.com",
            "http://localhost:3000",
            "http://localhost:3001",
            "http://localhost:3002",
        ],
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

  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ limit: '10mb', extended: true }));


  // Trust 1 proxy hop (nginx reverse proxy on the same server)
  app.set('trust proxy', 1);

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 200,
      standardHeaders: true,
      legacyHeaders: false,
      validate: {
        trustProxy: false,
        xForwardedForHeader: false,
        default: true,
      },
    })
  );

  return app;
};
