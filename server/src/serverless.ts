import type { IncomingMessage, ServerResponse } from "node:http";
import { createApp } from "./app.js";
import { connectDb } from "./config/db.js";
import { env } from "./config/env.js";

// Entry point for serverless hosts (Vercel). The site itself is served as static files by the host,
// so the Express app only handles /api routes here.
const app = createApp({ corsOrigins: env.CORS_ORIGINS });

// Reuse one MongoDB connection across invocations of a warm function.
let connection: Promise<void> | undefined;

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  connection ??= connectDb(env.MONGODB_URI).catch((err: unknown) => {
    connection = undefined;
    throw err;
  });

  try {
    await connection;
  } catch (err) {
    console.error("MongoDB connection failed", err);
    res.statusCode = 503;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ ok: false, error: "Service temporarily unavailable. Please try again shortly." }));
    return;
  }

  app(req, res);
}
