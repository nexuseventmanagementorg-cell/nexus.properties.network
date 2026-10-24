# Ready-to-paste Copilot continuation prompt

```text
Continue the existing NEXUS PROPERTY NETWORK project. Do not recreate the project or redesign the application.

Workspace:
C:\Users\shamsa durrani\.gemini\antigravity\scratch\nexus.properties.network
GitHub repository:
https://github.com/nexuseventmanagementorg-cell/nexus.properties.network
Existing public site:
https://nexus-properties-network.vercel.app/
Local Supabase staging project reference:
aetaxwtcawqfgtyvgvcg

Read README.md, HANDOFF.md, PROJECT_STATUS.md, and this prompt first. Preserve every existing local change; do not reset, clean, overwrite, or silently revert files. Never display or commit environment values, keys, tokens, or private credentials. Keep .env.local ignored and local. Do not use service-role keys in frontend code.

Where work stopped:
- The worktree already contained 26 modified tracked files and 8 untracked project files before the latest handoff docs. They represent prior work and must be preserved. Inspect current git status and commit state before acting.
- Local .env.local was safely checked: it points to the requested staging project and uses a public publishable key. No value should be printed. This does not reveal or verify Vercel/production configuration.
- Current tests passed 21/21, `npm run build` passed with Vite large-asset/chunk warnings, and `npm run lint` exited successfully with 93 warnings and no errors.
- The user reported successful staging signup, email confirmation, sign-in, and dashboard access earlier. Do not repeat signup or create users.
- Property reads are guarded in `src/services/propertyService.ts` for a trusted active profile; existing samples remain demo-only.
- Auth/navbar/logout synchronization is in `src/services/authService.ts`, `src/components/Navbar.tsx`, `src/components/RoleDashboardPage.tsx`, and the dashboard guard in `src/App.tsx`.
- `src/components/ProductExperiencePage.tsx` has city/area and PKR input usability improvements. Its final listing step remains a preview only; it does not call `createProperty`, upload, save, or submit.
- The proposed `src/services/databaseMigrations/0001_supabase_foundation.sql` is described by `src/services/databaseMigrations/README.md` as not applied. User-provided staging results reported users/properties tables, RLS, an owner-scoped pending-review insert policy, and relevant relationships; do not claim independent database verification or apply SQL.

Immediate next task:
1. Use read-only inspection to establish the existing Vercel project linkage and confirm it is the project for the given production domain. Verify production branch, build settings, and public environment configuration without displaying any values.
2. Browser checks on 2026-10-25 showed the production homepage returned HTTP 200, while direct navigation to `/marketplace`, `/list-property`, and `/auth/login` returned Vercel 404 pages. Diagnose SPA fallback/deployment routing using the existing project context; do not assume the cause.
3. There is no tracked vercel.json, no local .vercel project metadata, and no Vercel CLI in the previous environment. If the target/branch/env still cannot be confidently verified, stop before push or production deployment. A push to main might auto-deploy.
4. If authorized configuration access is unavailable, ask the user to link/select the existing project through the official workflow and provide a safe way to verify association; never request secrets in chat. Preview first, production only after target confirmation and passing checks.

After deployment safety is resolved, the next feature is the safe property listing workflow. Inspect `ProductExperiencePage.tsx`, `src/services/propertyService.ts`, `src/database/repositories/PropertyRepository.ts`, `src/database/repositories/BaseRepository.ts`, `src/services/authService.ts`, `src/services/storageProvider.ts`, `src/services/models.ts`, `src/data/sampleCities.ts`, `src/data/sampleAreas.ts`, and `src/services/databaseMigrations/0001_supabase_foundation.sql`.
Before implementation, resolve (do not guess):
- sale/rent transaction intent versus schema `purpose` category (`Residential`, `Commercial`, `Investment`);
- required title and phase fields;
- canonical numeric unit and conversion rule for `price_raw`;
- staging column INSERT/SELECT privileges for the exact repository insert and `select('*')`;
- actual city/area UUIDs and whether nullable IDs are permitted;
- image bucket/storage policies and public/private image URL expectations;
- trusted active profile UUID ownership and the separate human review/approval process.
Keep the database private and owner-scoped. A user property must be inserted as `PENDING REVIEW`; browser code must not approve or publish. Add focused tests and truthful success/error handling. Never create sample live listings or mark demo data verified.

Do not run SQL, apply migrations, change RLS/grants, create users/listings, modify production data, change Vercel/Supabase production settings, or deploy without explicit approval. Report what is source-verified, user-reported, runtime-tested, and still unknown separately.
```
