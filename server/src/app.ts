import path from "node:path";
import { fileURLToPath } from "node:url";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { errorHandler, notFound } from "./middleware/errors.js";
import { contactRouter } from "./modules/contact/contact.routes.js";
import { enrollmentRouter } from "./modules/enrollments/enrollment.routes.js";

interface AppOptions {
  corsOrigins: string[];
  /** Serve the built React app (client/dist) from this server. */
  serveClient?: boolean;
}

export function createApp({ corsOrigins, serveClient = false }: AppOptions) {
  const app = express();

  app.set("trust proxy", 1);
  app.use(helmet({ contentSecurityPolicy: serveClient ? undefined : false }));
  app.use(cors({ origin: corsOrigins }));
  app.use(express.json({ limit: "20kb" }));

  app.get("/api/health", (_req, res) => {
    res.json({ ok: true });
  });

  // Feature modules. Add jobs, companies, profiles, applications here as they are built.
  app.use("/api/enrollments", enrollmentRouter);
  app.use("/api/contact", contactRouter);

  app.use("/api", notFound);

  if (serveClient) {
    const clientDist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../client/dist");
    app.use(express.static(clientDist));
    app.get("/{*splat}", (_req, res) => {
      res.sendFile(path.join(clientDist, "index.html"));
    });
  }

  app.use(errorHandler);
  return app;
}
