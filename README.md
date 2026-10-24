# NEXUS PROPERTY NETWORK

NEXUS PROPERTY NETWORK is a React, TypeScript, and Vite property-network application. It combines public marketplace and property-discovery experiences with role dashboards, authentication, AI assistant interfaces, and service/repository integrations.

## Local development

Requirements: Node.js and npm compatible with the versions used by the project.

```powershell
npm ci
npm run dev -- --host 127.0.0.1 --port 5173
```

Create a root `.env.local` for local configuration. The browser Supabase client reads `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. For local work, configure only the intended staging project and its public publishable/legacy anon key. Never put service-role keys or other private credentials in `VITE_` variables, source files, or committed files. `.env.local` is ignored by Git; do not force-add it.

Server-only AI, operator, and database credentials use non-`VITE_` environment names in server-side code. Keep them out of browser bundles. `.env.example` is a template, not a source of real credentials. Do not run database migrations as part of routine local setup.

## Commands

```powershell
npm test
npm run build
npm run lint
```

`npm run build` runs the TypeScript project build before Vite production bundling. Oxlint currently reports existing warnings; consult [PROJECT_STATUS.md](./PROJECT_STATUS.md) for the latest checked totals. Build output is large, especially the bundled video and main JavaScript chunk.

## Application areas

- Public pages include the homepage, marketplace, property listing preview, agents, pricing, coverage, lead protection, deal lock, AI, and contact experiences.
- Authentication pages are `/auth/login` and `/auth/register`.
- Role dashboards use `/dashboard/{role}`.
- Vite mounts local development endpoints for `/api/ai/chat` and `/api/agents/run`; the corresponding Vercel-style handlers are under `api/`.
- Service code is under `src/services/`; Supabase repositories and database models are under `src/database/`.

See [HANDOFF.md](./HANDOFF.md) for the architecture, current integration status, setup limitations, and next recommended task. See [PROJECT_STATUS.md](./PROJECT_STATUS.md) for evidence-based status categories and [COPILOT_CONTINUATION_PROMPT.md](./COPILOT_CONTINUATION_PROMPT.md) for the ready-to-paste continuation prompt.

## Database and deployment cautions

The versioned foundation SQL in `src/services/databaseMigrations/0001_supabase_foundation.sql` is documented in the repository as proposed and not applied. Legacy SQL files are not an ordered migration plan. Do not run SQL or change RLS/grants without explicit approval and a staging-only verification plan.

The staging project is separate from the existing Vercel deployment. The production environment configuration is not available in this repository. The current public site was checked during the handoff: the homepage returned successfully, while direct navigation to several application routes returned 404. Do not deploy until the existing Vercel project, production branch, environment configuration, and SPA route handling are confirmed.
