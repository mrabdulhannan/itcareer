import type { ErrorRequestHandler, RequestHandler } from "express";
import { ZodError } from "zod";

export const notFound: RequestHandler = (_req, res) => {
  res.status(404).json({ error: "Not found" });
};

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof ZodError) {
    res.status(400).json({
      error: "Please check the highlighted fields.",
      fields: Object.fromEntries(err.issues.map((issue) => [issue.path.join("."), issue.message])),
    });
    return;
  }
  console.error(err);
  res.status(500).json({ error: "Something went wrong. Please try again." });
};
