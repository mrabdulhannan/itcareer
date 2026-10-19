import { createApp } from "./app.js";
import { connectDb } from "./config/db.js";
import { env } from "./config/env.js";

await connectDb(env.MONGODB_URI);

const app = createApp({ corsOrigins: env.CORS_ORIGINS, serveClient: env.NODE_ENV === "production" });

app.listen(env.PORT, () => {
  console.log(`ITcareer.pk API listening on http://localhost:${env.PORT}`);
});
