# NEXUS PROPERTY NETWORK — Current Project Status

**Checked:** 2026-10-25
This status separates source inspection, command output, browser evidence, and user-reported staging evidence. It is not a production security certification.

## Completed and verified

- The checked-out app is React 19 + TypeScript + Vite. `src/App.tsx` and `src/routing/appRoutes.ts` define the application shell and routes.
- Local Supabase configuration was checked without revealing values. The project reference matches `aetaxwtcawqfgtyvgvcg`; the configured browser key classified as a public publishable key; `.env.local` is Git-ignored and untracked.
- Source inspection confirms `supabaseClient.ts` reads `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`; server-only credentials are read separately by server handlers.
- `npm test`: **PASS — 21/21 tests**.
- `npm run build`: **PASS** — TypeScript build and Vite bundle completed. Vite emitted large asset/chunk warnings.
- `npm run lint`: **PASS with warnings** — exit success, 93 warnings, no lint errors.
- `git diff --check` passed before the handoff docs were added; repeat after any edits/commit.
- `.env.local` is excluded by `.gitignore`'s local/env rules, is not tracked, and contains no value in this report.

## Implemented but not fully verified

- Signup/sign-in/profile hydration and logout/navbar synchronization are implemented in `authService.ts`, `App.tsx`, and `Navbar.tsx`. The user previously reported completing a staging signup, email confirmation, sign-in, and dashboard visit. This session did not repeat that user flow or inspect Auth data.
- The public property-read guard is implemented in `propertyService.ts`; public discovery is designed to avoid anonymous reads from private Supabase properties and keep existing samples as demo data. No new browser network trace was performed in this handoff.
- Property repository persistence and owner UUID validation exist in `PropertyRepository.ts` and `BaseRepository.ts`. This is not a proof that the full current record can be inserted under live staging column grants.
- The user-provided staging findings report `public.users` and `public.properties`, RLS, owner/pending/active-profile insert conditions, and relevant foreign keys. These results were not independently queried in this session; the current foundation migration README still labels that migration proposed/not applied.

## Mock/demo-only functionality

- `ProductExperiencePage.tsx`'s listing wizard is explicitly a browser-only preview. It does not submit a listing or upload an image, and its completion message is not a persisted-success signal.
- Existing sample property/location catalogs are presentation/demo data. Sample IDs are not valid database foreign keys and samples are not verified listings.
- AI and agent endpoints exist, but provider-backed/live execution and durable activity storage depend on server-only configuration and are not verified by these checks.
- Lead/deal, messaging, notification, verification, subscription, and payment service interfaces or UI do not establish that each third-party or lifecycle workflow is operational in production.

## Pending implementation

- A safe listing submission contract: title, phase, schema-compatible property category, distinct sale/rent intent, canonical numeric price unit, trusted owner UUID, real location UUIDs/nullability rules, image upload and storage policy, pending-review insert, explicit errors, and focused tests.
- A trusted human review/approval workflow with reviewer authorization and durable audit records. A `verification_status` field or RLS insert check is not an approval workflow.
- Confirm exact live staging column privileges for the current repository insert payload and its `.select('*')` return. The user-reported grants summary alone does not prove the operation will succeed.
- Identify and verify the existing Vercel project association, production branch, build settings, and public environment configuration.
- Diagnose/fix direct-route deployment behavior and verify it in preview before production. The deployed homepage loaded, while direct `/marketplace`, `/list-property`, and `/auth/login` navigation returned HTTP 404 in the browser check.
- Verify storage policies, payment provider callbacks/idempotency, and non-demo external integrations before claiming end-to-end behavior.

## Known security and data-integrity considerations

- Never put service-role keys, private provider credentials, or secrets in browser code, `VITE_` variables, documentation, or Git. Only public Supabase keys belong in the browser.
- Treat browser route guards as UX; backend authorization must rely on Auth identity, database grants, and RLS.
- Keep properties private and owner-scoped. Do not solve a failed anonymous query by granting public property access.
- Use the authenticated user's trusted profile UUID for ownership. Do not trust signup metadata, local storage roles, or user-entered ownership.
- Keep inserts at `PENDING REVIEW`; do not expose client approval/publish operations.
- Sample city/area IDs are not UUIDs; do not send them to foreign-key columns.
- The exact live schema, policy/grant set, image bucket behavior, and production Vercel environment remain unverified. Do not run migrations or change database/Vercel settings as an incidental fix.
- The current deployment's direct-route 404 behavior is a launch blocker for those routes until understood and safely resolved.

## Recommended next task

First verify the existing Vercel project's identity, domain association, production branch, build settings, and public environment configuration without printing values. Investigate the SPA deep-link 404 in preview; do not push/deploy while the target could not be confidently identified. Then return to the property submission workflow with explicit decisions on category/transaction intent, `price_raw` units, location references, image storage, and human review.
