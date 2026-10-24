# NEXUS PROPERTY NETWORK — Handoff

**Checked:** 2026-10-25
**Repository:** `nexuseventmanagementorg-cell/nexus.properties.network`
**Workspace:** `C:\Users\shamsa durrani\.gemini\antigravity\scratch\nexus.properties.network`
**Branch:** `main`
**Purpose:** Continue the existing property-network application without restarting, redesigning it, discarding local work, or claiming unverified backend/deployment behavior.

## Project and architecture

NEXUS PROPERTY NETWORK is a React 19, TypeScript, and Vite application for a property marketplace and network. The UI in `src/components/` is assembled by `src/App.tsx`; navigation and role routes are centralized in `src/routing/appRoutes.ts`. State and business operations are split across service modules in `src/services/`, with Supabase/local-storage repositories and database models under `src/database/`.

Vite development middleware is defined in `vite.config.ts`. Server-side API handlers are in `api/` and `src/server/`. The current handler entry points are `api/ai/chat.ts` and `api/agents/run.ts`, with implementation in `src/server/aiChat*`, `src/server/agentRunEndpoint.ts`, `src/server/agentOrchestrator.ts`, and `src/server/agentActivityStore.ts`. These do not imply that external AI providers or durable activity storage are configured.

### Important files

- `src/App.tsx` — application composition, route selection, session hydration, and protected dashboard route.
- `src/routing/appRoutes.ts` — public routes, dashboard roles, and path resolution.
- `src/components/Navbar.tsx` — public navigation and auth-state event subscription.
- `src/components/AuthPage.tsx`, `src/services/authService.ts`, `src/services/authRole.ts` — signup/login UI and session/profile handling.
- `src/services/supabaseClient.ts` — browser Supabase client and required public environment-variable names.
- `src/services/propertyService.ts` — property reads, sample fallback composition, and service-level create/update operations.
- `src/database/repositories/BaseRepository.ts`, `src/database/repositories/PropertyRepository.ts` — persistence and database field mapping/UUID validation.
- `src/services/databaseMigrations/0001_supabase_foundation.sql` and `src/services/databaseMigrations/README.md` — proposed foundation schema and its limitations.
- `src/components/ProductExperiencePage.tsx` — public product pages and browser-only property-listing wizard.
- `src/services/storageProvider.ts` — storage helper; bucket policy and wizard integration are not verified.

## Routes and local development

Public application routes include `/`, `/marketplace`, `/list-property`, `/agents`, `/pricing`, `/lead-protection`, `/deal-lock`, `/coverage`, `/faq`, `/contact`, `/messages`, `/notifications`, `/crm`, `/verification`, `/subscriptions`, `/payments`, `/commission`, `/ai`, and `/ai-workforce`. Authentication routes are `/auth/login` and `/auth/register`. Role routes use `/dashboard/{role}`; admin routes include `/admin`, `/admin/ai`, `/admin/audit`, `/ai-admin`, and `/super-admin`. See `src/routing/appRoutes.ts` for the canonical route map.

For local setup, use Node.js/npm, run `npm ci`, then `npm run dev -- --host 127.0.0.1 --port 5173`. Local `.env.local` must be configured locally and must remain untracked. The browser client reads `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`; only a public key for the intended non-production project belongs in browser configuration. Keep service-role, model, and other private values server-only. Do not copy credential values into chat, documentation, commits, or `VITE_` variables. Do not apply migrations as part of setup.

Commands:

- `npm test` — 21 tests passed in this handoff check.
- `npm run build` — TypeScript and Vite production build passed; Vite reports large asset/chunk warnings.
- `npm run lint` — exited successfully with 93 warnings and no lint errors in this handoff check.

## Authentication and profiles

`src/services/supabaseClient.ts` reads the two public Vite variables above. `registerUser` in `src/services/authService.ts` calls Supabase Auth signup, sends the configured redirect to the local app's login route, and handles missing session as email confirmation required. Profile data is loaded from `public.users` by Auth UUID. Trusted profile role/status—not browser signup metadata—controls the active user used for protected routes. `ProtectedDashboardRoute` in `src/App.tsx` hydrates and checks the session before rendering a dashboard. `logoutUser` clears local auth state after sign-out; `Navbar` listens for the auth-state event, and dashboard logout awaits completion before navigating home.

The user reported a successful staging signup, email confirmation, sign-in, and dashboard visit in the earlier work. That is user-reported manual verification, not a new runtime test performed in this handoff. No Auth account was created or changed during this handoff.

## Property service and listing status

`propertyService.ts` gates Supabase property reads on a trusted active profile. Public discovery combines any allowed live results with the existing sample/demo inventory; pre-login browsing must not issue anonymous reads to the private `properties` table. Authenticated property management continues through `PropertyRepository`, with UUID validation and database RLS expected to enforce ownership.

The listing wizard in `ProductExperiencePage.tsx` has city/area suggestions, custom entry options, and suggested/custom PKR price choices. It is explicitly a browser-only preview and does not call `createProperty`, upload images, save a draft, submit to Supabase, or publish a listing. Do not call the property submission feature complete because a table and insert policy exist.

Connecting the wizard safely still requires:

1. Separate transaction intent (`For Sale`/`For Rent`) from schema `purpose` (`Residential`/`Commercial`/`Investment`).
2. Add/validate required title, phase, numeric `price_raw`, and image data; decide the canonical numeric price unit before conversion.
3. Bind `owner_id` to a trusted active authenticated profile, never a browser-entered owner.
4. Resolve real city/area UUIDs or omit only when confirmed nullable; do not send sample catalog IDs.
5. Integrate image upload only after confirming the staging bucket and its access rules.
6. Compare the exact insert and returned columns against actual staging privileges. The repository inserts a mapped record and requests `select('*')`.
7. Keep the initial verification status pending. A review/approval UI, trusted approval operation, and durable review audit workflow are not implemented by the status field/policy alone.

## Supabase environment, schema, and evidence

The local `.env.local` was checked without displaying values: its Supabase project reference matched the requested staging reference `aetaxwtcawqfgtyvgvcg`; its configured key classified as public publishable; `.env.local` is Git-ignored and untracked. The local browser client uses those Vite variables. This does not establish production/Vercel environment values or a live database connection.

`src/services/databaseMigrations/README.md` describes `0001_supabase_foundation.sql` as proposed and not applied, and says there is no repository migration runner/history. Keep that source status separate from the staging evidence:

- User-provided staging query results reported that `public.users` and `public.properties` exist, property RLS is enabled, an owner-scoped pending-review insert policy exists, and profile/property/location foreign-key relationships exist.
- The reported insert policy requires matching `owner_id = auth.uid()`, `PENDING REVIEW`, and an active profile. Reported column grants exist, but the summary was not sufficient to prove the complete repository insert/`select('*')` succeeds.
- Those staging results were supplied by the user and were not independently queried during this handoff. The exact live policy/grant definitions, migration lineage, storage policies, and review workflow remain unverified.
- Other SQL files under `src/services/databaseMigrations/` include legacy drafts and seeds. Do not treat them as an ordered migration set or apply them to staging/production without explicit approval.

The foundation SQL proposes `public.users`, `public.cities`, `public.areas`, and `public.properties`; it is not evidence that this SQL created live staging objects. Do not access or modify production data or database settings as part of continuation work.

## Staging versus production

Local development configuration points to the staging project only. The Vercel deployment is a distinct environment; no production environment variables were inspected, copied, or changed. The repository has no tracked `vercel.json`, `.vercel` project link, or GitHub Actions workflow, and the Vercel CLI was unavailable in the handoff environment.

Browser verification on 2026-10-25 found:

- `https://nexus-properties-network.vercel.app/` returned HTTP 200 and rendered the NEXUS homepage.
- Direct navigation to `/marketplace`, `/list-property`, and `/auth/login` returned Vercel HTTP 404 pages. This indicates route fallback/deployment behavior needs investigation; it does not establish why Vercel is configured that way.
- No deployment was made. The deployed commit and production environment configuration could not be confirmed.

Because the existing Vercel project linkage, production branch/build settings, and deployment environment were not available for inspection, do not push to `main` or deploy until those are confirmed. A push might trigger an automatic production deployment.

## Git/worktree state at handoff

The local branch was `main`, tracking `origin/main`. Before handoff documentation edits, the branch was equal to fetched `origin/main` at `c0188a7`; the worktree contained 26 modified tracked files and 8 untracked project files, none staged. These are existing local work and must be preserved. `.env.local` is ignored/untracked. The remote URL was confirmed to be the requested GitHub repository.

The documentation and local code-quality checks do not authorize discarding or rewriting prior work. No push or production deployment was made in this handoff because the possible automatic production deployment target could not be verified. See the final Git status and commit state in the continuing Copilot session.

## Current limitations and next task

Known limitations include the preview-only property submission flow; unresolved field/schema mappings, price unit, location UUIDs, image storage policy, and reviewer workflow; no current end-to-end listing CRUD or payment callback proof; and large production assets/chunks. Automated tests cover AI chat, specialist orchestration, and Supabase-foundation static checks—not complete browser/backend integration.

**Exact next task:** establish read-only access to the existing Vercel project configuration and verify its project/domain association, production branch, build settings, and public environment-variable presence without displaying values. Then investigate and safely resolve the observed SPA direct-route 404 behavior, preferably in a preview first. Do not deploy to production or push a branch that may auto-deploy until the existing target is confirmed. After deployment safety is established, return to the property wizard and implement only the approved, owner-scoped pending-review submission contract with focused tests; do not invent the unresolved business mappings.
