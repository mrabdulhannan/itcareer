# ITcareer.pk

The official ITcareer.pk website: a one-page home page for the courses (Shopify Development and Cyber Security, weekend classes) with working enrolment, contact and hiring forms. It is built on the MERN stack so the IT job marketplace can be added as new modules later.

- **Frontend:** React 19 + TypeScript + Vite + Tailwind CSS (`client/`)
- **Backend:** Node + Express 5 + Mongoose (MongoDB), written in TypeScript (`server/`)
- **Validation:** Zod on the API; Pakistani mobile numbers are normalised to `+923XXXXXXXXX`

## Run it locally

Requirements: Node 20+ and MongoDB (local via `docker compose up -d`, or a free MongoDB Atlas cluster).

```bash
cp .env.example .env          # set MONGODB_URI
npm install
npm run dev                   # API on :4000, site on http://localhost:5173
```

## Fill these in before going live

All page content lives in `client/src/config/site.ts`:

| What | Where |
|---|---|
| Course fees, duration, next batch date | `courses[].fee`, `.duration`, `.nextBatch` (shows "Ask for fee" while `null`) |
| JazzCash / Easypaisa / bank account details | `site.payment` (shows "shared on WhatsApp" while `null`) |
| WhatsApp number (adds the WhatsApp button) | `VITE_WHATSAPP_NUMBER` in `client/.env`, e.g. `923001234567` |
| Contact email | `site.email` |
| Course modules, FAQs, instructor bio | `courses[].modules`, `faqs`, `site.instructor` |
| Instructor photo | put `client/public/instructor.jpg` and swap it in `components/Instructor.tsx` |

## Production

```bash
npm run build
NODE_ENV=production npm start   # Express serves the API and the built site on PORT
```

Host on any Node server (a VPS with Nginx + PM2, Render, Railway) with MongoDB Atlas. Set `MONGODB_URI`, `PORT`, `CORS_ORIGINS` and `NODE_ENV=production`.

## Deploy on Vercel (free)

The repo is ready for Vercel: `vercel.json` builds the site into static files (`client/dist`) and runs the API as one serverless function (`api/index.js` → `server/src/serverless.ts`).

1. **Database:** create a free MongoDB Atlas **M0** cluster (see step 1 below). Under Network Access allow `0.0.0.0/0`, because Vercel has no fixed IP addresses.
2. Sign in at vercel.com with GitHub → **Add New → Project** → import `itcareer`. Leave Framework Preset as **Other**; build settings come from `vercel.json`.
3. Add environment variables before the first deploy:
   - `MONGODB_URI`: your Atlas connection string, e.g. `mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/itcareer?retryWrites=true&w=majority`
   - `CORS_ORIGINS`: `https://itcareer.pk,https://www.itcareer.pk` (optional; the site and API share one domain)
   - `VITE_WHATSAPP_NUMBER`: optional, e.g. `923001234567`
4. Deploy. The site is live at `https://<project>.vercel.app`; check `/api/health` returns `{"ok":true}`.
5. **Domain:** Project → Settings → Domains → add `itcareer.pk` and `www.itcareer.pk`, then add the DNS records Vercel shows at your .pk registrar.

## Deploy for free (Render + MongoDB Atlas)

1. **Database:** sign up at mongodb.com/atlas, create a free **M0** cluster (region: Mumbai or Singapore), add a database user, allow access from `0.0.0.0/0`, and copy the connection string (`mongodb+srv://...`). Add `/itcareer` before the `?` so data goes into the `itcareer` database.
2. **Server:** sign up at render.com with GitHub, choose **New → Blueprint**, pick this repository. Render reads `render.yaml`. Paste the Atlas string as `MONGODB_URI` and, optionally, your WhatsApp number as `VITE_WHATSAPP_NUMBER`.
3. The site goes live at `https://itcareer.onrender.com` (or similar). Free services sleep after 15 minutes without visitors, so the first visit after that takes up to a minute.
4. **Domain later:** in Render, open the service → Settings → Custom Domains → add `itcareer.pk` and `www.itcareer.pk`, then add the DNS records Render shows at your .pk domain registrar. HTTPS is set up automatically.

## Where submissions go

| Form | API | MongoDB collection |
|---|---|---|
| Enrolment | `POST /api/enrollments` | `enrollments` (status `pending` until you confirm payment) |
| Contact | `POST /api/contact` (`topic: course/general`) | `contactmessages` |
| Hiring enquiry | `POST /api/contact` (`topic: hiring`) | `contactmessages` |

Until there is an admin panel, view them in MongoDB Compass or Atlas.

## Project structure

```
client/src/
  config/site.ts        all editable content
  components/           one file per page section
  lib/api.ts            API calls
server/src/
  app.ts                Express app; register new modules here
  modules/
    enrollments/        schema (Zod) + model (Mongoose) + routes
    contact/
    shared/             validators, rate limiting
server/test/            API tests (Vitest + Supertest)
```

## Adding the job marketplace later

Each feature is a module under `server/src/modules/<name>/` with `*.schema.ts`, `*.model.ts` and `*.routes.ts`, mounted in `app.ts`. Planned next modules: `auth`, `candidates`, `companies`, `jobs`, `applications`, then an admin dashboard. The frontend will move to React Router when there is more than one page.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | API + site with hot reload |
| `npm run build` | Build the site and compile the API |
| `npm test` | API tests (uses `MONGODB_TEST_URI` if set, otherwise an in-memory MongoDB) |
| `npm run typecheck` | TypeScript checks for client and server |
