import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";

import { logger } from "./utils/logger.js";
import { connectDatabase } from "./config/db.js";

const startServer = async () => {
  try {
    await connectDatabase();

    const server = app.listen(process.env.PORT, () => {
      logger.info(`🚀 Server running on port ${process.env.PORT}`);
    });

  } catch (err) {
    logger.error({ err }, "❌ Server startup failed");
    process.exit(1);
  }
};

startServer();
