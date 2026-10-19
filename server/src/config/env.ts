import { z } from "zod";

const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(4000),
  MONGODB_URI: z.string().min(1).default("mongodb://localhost:27017/itcareer"),
  CORS_ORIGINS: z
    .string()
    .default("http://localhost:5173")
    .transform((value) => value.split(",").map((origin) => origin.trim()).filter(Boolean)),
});

export type Env = z.infer<typeof EnvSchema>;

export const env: Env = EnvSchema.parse(process.env);
