import type { Request, Response, NextFunction } from "express";
import { ApiError, logger } from "../utils/index.js";

export const notFoundHandler = (_req: Request, res: Response) => {
  return res.status(404).json({
    success: false,
    message: "Route not found",
  });
};

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  logger.error(
    { err, url: req.url, method: req.method },
    "Unhandled application error"
  );

  let statusCode = 500;
  let message = "Internal server error";
  let details: any = null;

  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    details = err.details ?? null;
  }

  else if (err.code === 11000) {
    statusCode = 409;

    // Extract the field name from the error
    const keyValue = err.keyValue || {};
    const field = Object.keys(keyValue)[0];
    const value = field ? keyValue[field] : undefined;

    // Create user-friendly message
    if (field && value) {
      message = `This ${field} is already in use: "${value}"`;
      details = {
        field,
        value,
        suggestion: `Please use a different ${field}`
      };
    } else {
      message = "This record already exists in the database";
      details = keyValue;
    }
  }

  else if (err.name === "ValidationError") {
    statusCode = 422;
    message = "Validation failed";
    details = Object.values(err.errors).map((e: any) => ({
      field: e.path,
      message: e.message,
    }));
  }

  else if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid value for field '${err.path}'`;
    details = { value: err.value };
  }

  else if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid authentication token";
  }

  else if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Authentication token expired";
  }

  else if (err.type === "entity.parse.failed") {
    statusCode = 400;
    message = "Invalid JSON payload";
  }

  else {
    message = err?.message || message;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    ...(details && { details }),
    ...(process.env.NODE_ENV !== "production" && err.stack
      ? { stack: err.stack }
      : {}),
  });
};
