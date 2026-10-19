# ITcareer.pk

The official ITcareer.pk website: a one-page home page for the courses (Shopify Development and Cyber Security, weekend classes).

It is a **React-only** static site (React 19 + TypeScript + Vite + Tailwind CSS), with no server or database. The enrolment, contact and hiring forms check the details, then open **WhatsApp** (0320 7668724) or the visitor's **email app** (officialitcareer@gmail.com) with everything filled in, so the visitor only presses send.

## Run it locally

Requirements: Node 20+.

```bash
npm install
npm run dev        # http://localhost:5173
```

## Edit the content

Everything on the page comes from `src/config/site.ts`:

| What | Where |
|---|---|
| WhatsApp number, phone, email | `site.whatsappNumber`, `site.phone`, `site.email` |
| JazzCash / Easypaisa / bank details | `site.payment` (shows "shared on WhatsApp" while `null`) |
| Course fees, duration, next batch date | `courses[].fee`, `.duration`, `.nextBatch` (shows "Ask for fee" while `null`) |
| Course modules, FAQs, instructor bio | `courses[].modules`, `faqs`, `site.instructor` |
| Instructor photo | put `public/instructor.jpg` and swap it in `src/components/Instructor.tsx` |

## Deploy on Vercel (free)

1. Sign in at vercel.com with GitHub → **Add New → Project** → import `itcareer`.
2. Vercel detects Vite automatically (`vercel.json` sets it too). No environment variables are needed.
3. Click **Deploy**. The site is live at `https://<project>.vercel.app`.
4. **Domain:** Project → Settings → Domains → add `itcareer.pk` and `www.itcareer.pk`, then add the DNS records Vercel shows at your .pk registrar.

Every push to `main` redeploys automatically.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Local site with hot reload |
| `npm run build` | Type-check and build into `dist/` |
| `npm run preview` | Serve the built site locally |
| `npm run typecheck` | TypeScript checks only |

## Project structure

```
src/
  config/site.ts     all editable content
  components/        one file per page section
  lib/send.ts        WhatsApp and email links for the forms
  lib/validate.ts    form checks (names, emails, Pakistani mobile numbers)
```

## Later: the job marketplace

The job marketplace will need a backend and database again. An Express + MongoDB API was built earlier and is in the git history (commit `1e80d34`, folder `server/`) to start from.
