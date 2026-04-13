// Vercel serverless entry point (ESM)
import dotenv from "dotenv";
dotenv.config();

let app = null;
let connectDB = null;
let dbConnected = false;

// Initialize database connection with timeout protection
const initDB = async () => {
    if (dbConnected) return;

    if (!connectDB) {
        const dbModule = await import("../dist/config/db.js");
        connectDB = dbModule.connectDB;
    }

    await connectDB();
    dbConnected = true;
};

// Lazy load the Express app
const getApp = async () => {
    if (!app) {
        const appModule = await import("../dist/app.js");
        app = appModule.default;
    }
    return app;
};

// Timeout helper - prevents function from hanging forever
const withTimeout = (promise, ms) => {
    return Promise.race([
        promise,
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error(`Operation timed out after ${ms}ms`)), ms)
        ),
    ]);
};

// Vercel serverless handler
export default async function handler(req, res) {
    try {
        // 10 second timeout for cold start initialization (DB connection)
        await withTimeout(initDB(), 10000);
        const expressApp = await getApp();

        // Let Express handle the request
        return expressApp(req, res);
    } catch (error) {
        console.error("Serverless function error:", error);

        // Reset connection state on error so next invocation retries
        dbConnected = false;
        connectDB = null;

        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.end(
            JSON.stringify({
                success: false,
                error: "Internal Server Error",
                message: error.message || "Server initialization failed",
            })
        );
    }
}
