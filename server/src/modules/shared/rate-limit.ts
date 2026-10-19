import rateLimit from "express-rate-limit";

/** Limits public form submissions per IP. */
export const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, error: "Too many submissions. Please try again in a few minutes." },
});
