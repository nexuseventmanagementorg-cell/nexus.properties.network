# NEXUS Property Network — Project Handoff

> Historical handoff retained to preserve prior work. Its checks and environment notes predate the 2026-10-25 review and may be stale. Use [HANDOFF.md](./HANDOFF.md), [PROJECT_STATUS.md](./PROJECT_STATUS.md), and [COPILOT_CONTINUATION_PROMPT.md](./COPILOT_CONTINUATION_PROMPT.md) as the current handoff and status record.

**Last inspected:** 2026-10-24
**Repository:** `nexuseventmanagementorg-cell/nexus.properties.network`
**Branch / baseline:** `main` at `c0188a7` (`feat: add property specialist run orchestration`)
**Purpose:** A new assistant/session should read this file first and continue the highest-priority unfinished work without asking the user to repeat the project context.

## Resume instruction

User can say: **“PROJECT_HANDOFF.md parho aur sab se pehla pending priority wala task continue karo.”**

Read this file and the relevant source before changing anything. Preserve existing user changes, do not assume old report scores are current, and do not invent or request secrets in chat. If the user has not specified the next feature, start with **P0: production authorization and Supabase RLS review/fix**, after confirming the available schema and configuration.

## Project overview

- React 19 + TypeScript + Vite frontend for a property marketplace / property-network product.
- `src/App.tsx` assembles the main marketing experience, marketplace, AI drawer, authentication, role dashboards, and architecture/document pages.
- `src/components/` contains the UI; `src/services/` contains auth, property, lead/deal, payment, storage, Supabase, and other service layers; `src/database/` contains repositories and models.
- `src/services/databaseMigrations/` contains SQL table and seed files for users, properties, leads, deals, messages, notifications, payments, subscriptions, invoices, verifications, cities/areas, sample properties, and AI agent activity.
- AI chat and specialist-agent server handlers exist under `src/server/`. Vite mounts local development middleware in `vite.config.ts`; Vercel-style handlers are in `api/ai/chat.ts` and `api/agents/run.ts`.
- `.env.example` is a placeholder template, not a configured backend. No `.env.local` was found during this inspection.
- `README.md` is still the generic Vite template and should eventually be replaced with actual setup/deployment guidance.

## Current verified baseline

- `npm run build`: **PASS** (TypeScript and Vite production build complete).
- `npm test`: **PASS**, 9 tests across the AI chat and agent orchestration suites. These primarily test server behavior with mocked provider responses; they are not end-to-end application/backend tests.
- `npm run lint`: exits successfully with **79 warnings, 0 errors** (mostly unused imports/variables).
- Build warnings: main JavaScript chunk is about **2.0 MB** minified; bundled video is about **36.6 MB**. The build reports oversized chunks. Consider code splitting and media optimization after launch-critical work.
- Local development server was started and verified at **http://localhost:3004**. It is the Vite dev server and is running in the current session only; if it is no longer available, restart it with:
  ```powershell
  npm run dev -- --host 127.0.0.1 --port 3004
  ```
- Browser loaded the site at `/`. A POST with an invalid body to `/api/ai/chat` returned HTTP 400, confirming the local Vite API middleware is mounted; it did not verify successful model-backed behavior.
- Git working tree was clean before this handoff file was added. This handoff is currently an uncommitted workspace file; commit/push it if it must be available in another clone/device.

## Highest-priority unfinished work

### P0 — Production authorization and data protection

- Dashboard protection in `src/App.tsx` uses `getCurrentUser()` and `canAccessRole()` from `src/services/authService.ts`. `getCurrentUser()` reads a user record, including its role, from browser `localStorage`; a frontend route check is not a server authorization boundary.
- Verify and enforce authorization in Supabase RLS and every privileged server operation. In the inspected SQL, `agent_activity.sql` explicitly enables RLS and limits access to `service_role`, but the inspected `users.sql`, `properties.sql`, and `payments.sql` contain table definitions without RLS policies. Audit every table and role/ownership policy before production use.
- Never expose Supabase service-role keys, payment secrets, JWT secrets, or model API keys to browser code. Keep server-only credentials out of `VITE_` variables.

### P0 — Configure and verify real authentication/backend

- `authService.ts` requires `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` for registration, login, session hydration, and password reset. Neither real configuration nor live Supabase behavior was available during inspection.
- Create a local `.env.local` only when the user supplies/configures real credentials. Do not commit it. Confirm email verification, callback URLs, password reset, sign-out, session refresh, role assignment, and unauthorized-role behavior against a test Supabase project.
- `.env.example` has OAuth/payment/API callback defaults on port 5173; local development here uses port 3004. Set the right callback/redirect origins for the environment rather than assuming the defaults are correct.

### P1 — Database migrations and persistent property workflows

- SQL migration files exist, but no live migration run or CRUD test was performed. Review/apply them to a test Supabase project, reconcile TypeScript models/repositories with SQL schema, then test create/read/update/archive/restore and role ownership against persisted records.
- Seed files exist. Clearly separate sample/demo inventory from verified live listings; test that editing, archiving, and removing live listings do not corrupt sample inventory.
- Set up and verify Storage buckets, upload/download/delete behavior, file limits, ownership policies, and property-image delivery.

### P1 — Payments are not end-to-end verified

- Payment service abstractions exist, but no merchant credentials, sandbox transaction, signed callback, invoice, or subscription activation were verified.
- `.env.example` refers to `/api/payments/callback` and `/api/payments/verify-callback`, but the current `api/` inventory contains only `api/ai/chat.ts` and `api/agents/run.ts`; the Vite middleware in `vite.config.ts` mounts only chat and agent-run routes. Implement/confirm server-side payment callback verification before treating payments as usable.
- Test provider signatures, replay/idempotency behavior, amount/currency checks, failure/cancel flows, invoice creation, and subscription activation with sandbox credentials.

### P1 — Runtime/regression coverage

- Existing automated tests cover AI chat and specialist orchestration only. Add focused tests for auth/session, role access, property CRUD/search, lead/deal lifecycle, storage, payment callbacks, notifications/messages, and route navigation.
- Existing `PHASE13_RUNTIME_RECOVERY_REPORT.md` records historical failures for auth without Supabase configuration, protected dashboard access, and some sample-property scenarios. Those reports are evidence from an earlier run, not a current full browser certification. Re-run browser workflows on the current branch once a test backend is configured.
- The AI gateway safely reports `AI_NOT_CONFIGURED` without a server model key; current tests use a mocked provider. Configure a server-only key and perform a bounded live test before claiming model-backed production behavior.
- Verify all role dashboards, direct-link refreshes, mobile layouts, list-property flow, inventory/search, and AI behavior against the actual target configuration.

### P2 — Delivery quality and integrations

- Resolve the 79 lint warnings and add a CI gate for lint, build, and tests.
- Optimize the large JavaScript bundle and media (especially the 36.6 MB video); measure loading performance on mobile.
- Replace the generic `README.md` with setup, environment-variable ownership, migration order, local run, tests, deployment, and troubleshooting instructions.
- Verify whether planned external services (email, Google OAuth, WhatsApp, payment providers, verification/government sources) are implemented end-to-end or remain interface/demo-only. Do not describe an adapter/UI as a live integration without provider-backed evidence.

## Configuration and safety notes

- Copy `.env.example` to an ignored local env file only for development; use real values from the project owner’s provider accounts. Never paste secrets into chat or commit them.
- Client-visible Supabase values must be the anon/public key only and protected by RLS. Service-role keys and provider secrets must only be available in server runtime.
- Do not infer launch readiness from percentage scores in older reports; use reproducible tests against the current branch and explicitly label unverified integrations.

## Useful commands

```powershell
npm run dev -- --host 127.0.0.1 --port 3004
npm test
npm run lint
npm run build
```

## Existing project reports

The repository contains Phase 1–13 reports and audits. Treat them as historical context and verify claims against current source and a current runtime. In particular, compare the Phase 5/9/13 reports with actual migrations, auth configuration, server endpoints, and test results before updating any readiness statement.
