# PHASE 12 AUTH BLOCKER AUDIT

## Audit Scope

Read-only source audit. No code was modified, repaired, or extended.

The current runtime blocker observed in the browser was:

`Production auth requires VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.`

## CHECK 1 - Locations Requiring `VITE_SUPABASE_URL`

| Result | File | Function / location | Lines | Behavior |
|---|---|---|---:|---|
| PASS | [src/services/supabaseClient.ts](src/services/supabaseClient.ts#L10-L15) | module configuration | 10-15 | Reads `VITE_SUPABASE_URL`; combines it with the anon key to set `isSupabaseConfigured`. |
| BLOCKED | [src/services/authService.ts](src/services/authService.ts#L13-L16) | `ensureProductionAuth` | 13-16 | Throws when the URL or anon key is missing. This is the direct AUTH runtime gate. |
| BLOCKED | [src/services/supabaseClient.ts](src/services/supabaseClient.ts#L24-L26) | `configError` and fallback client | 24-26 | Auth, database, and storage fallback methods throw the production configuration error when the real client is unavailable. |
| BLOCKED | [src/services/supabaseClient.ts](src/services/supabaseClient.ts#L57-L59) | `getSupabaseClient` | 57-59 | Throws the client configuration error when no configured client exists. |
| PASS | [src/services/ProductionProvider.ts](src/services/ProductionProvider.ts#L8-L16) | `hasSupabaseConfig`, `getProviderMode`, `productionProvider` | 8-16 | Uses the URL and anon key to select Supabase mode and production mode. This is provider selection, not a local auth fallback. |
| PASS | [src/services/databaseProvider.ts](src/services/databaseProvider.ts#L18-L30) | `getCurrentProvider` | 18-30 | Uses the URL and anon key to select `supabase` versus `local` repository labels. This does not authenticate a user. |
| PASS | [src/services/storageProvider.ts](src/services/storageProvider.ts#L21-L25) | `ensureStorage` | 21-25 | Refuses storage operations when Supabase configuration is missing. |
| PASS | [src/services/propertyService.ts](src/services/propertyService.ts#L53-L84) | property persistence branches | 53-84 | Selects repository persistence when configured and local store persistence otherwise. This is not an AUTH path. |

## CHECK 2 - Locations Requiring `VITE_SUPABASE_ANON_KEY`

| Result | File | Function / location | Lines | Behavior |
|---|---|---|---:|---|
| PASS | [src/services/supabaseClient.ts](src/services/supabaseClient.ts#L10-L15) | module configuration | 10-15 | Reads `VITE_SUPABASE_ANON_KEY`; both URL and anon key must be truthy for `isSupabaseConfigured`. |
| BLOCKED | [src/services/authService.ts](src/services/authService.ts#L13-L16) | `ensureProductionAuth` | 13-16 | Registration, login, session hydration, and password reset cannot continue without the anon key and URL. |
| BLOCKED | [src/services/supabaseClient.ts](src/services/supabaseClient.ts#L24-L26) | `configError` and fallback client | 24-26 | Fallback auth/database/storage methods throw instead of performing local auth. |
| BLOCKED | [src/services/supabaseClient.ts](src/services/supabaseClient.ts#L57-L59) | `getSupabaseClient` | 57-59 | Rejects access to the real client when either credential is absent. |
| PASS | [src/services/ProductionProvider.ts](src/services/ProductionProvider.ts#L8-L16) | provider mode detection | 8-16 | Treats the pair as the condition for Supabase provider selection. |
| PASS | [src/services/databaseProvider.ts](src/services/databaseProvider.ts#L18-L30) | `getCurrentProvider` | 18-30 | Treats the pair as the condition for a Supabase-ready provider. |
| PASS | [src/services/storageProvider.ts](src/services/storageProvider.ts#L21-L25) | `ensureStorage` | 21-25 | Storage upload/retrieve/delete is blocked when the pair is absent. |

## CHECK 3 - Does a Local Fallback Auth Path Still Exist?

**NO.**

Evidence:

- [src/services/authService.ts](src/services/authService.ts#L84-L116) calls Supabase `signUp` and `signInWithPassword` after `ensureProductionAuth()`.
- [src/services/authService.ts](src/services/authService.ts#L64-L76) calls Supabase `getSession` after `ensureProductionAuth()`.
- [src/services/authService.ts](src/services/authService.ts#L141-L148) calls Supabase password reset after `ensureProductionAuth()`.
- [src/services/storageAdapter.ts](src/services/storageAdapter.ts#L5-L31) is only a generic key/value store. It contains no registration, password validation, credential lookup, or local login function.
- [src/services/supabaseClient.ts](src/services/supabaseClient.ts#L26-L55) provides throwing stubs, not a local auth implementation.
- `getCurrentUser()` reads a persisted session at [src/services/authService.ts](src/services/authService.ts#L48-L60), but no local function creates or validates a login session without Supabase.

## CHECK 4 - Can Login Run Without Supabase?

**NO.**

Result: **FAIL / BLOCKED**

Evidence:

- [src/services/authService.ts](src/services/authService.ts#L108-L116), `loginUser`, calls `ensureProductionAuth()` at line 110 before `supabaseClient.auth.signInWithPassword()` at line 111.
- With missing configuration, `ensureProductionAuth()` throws at [src/services/authService.ts](src/services/authService.ts#L14-L16).
- [src/components/AuthPage.tsx](src/components/AuthPage.tsx#L39-L51) catches that exception and displays the error instead of routing to a dashboard.
- Browser runtime observation in Phase 11 displayed: `Production auth requires VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY. Please register or reset your password.`

## CHECK 5 - Can Registration Run Without Supabase?

**NO.**

Result: **FAIL / BLOCKED**

Evidence:

- [src/services/authService.ts](src/services/authService.ts#L84-L105), `registerUser`, calls `ensureProductionAuth()` at line 85 before `supabaseClient.auth.signUp()` at line 89.
- With missing configuration, the same gate throws at [src/services/authService.ts](src/services/authService.ts#L14-L16).
- [src/components/AuthPage.tsx](src/components/AuthPage.tsx#L39-L51) catches the exception and displays `Registration failed.` with the production configuration error.
- Browser runtime observation in Phase 11 displayed: `Production auth requires VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY. Registration failed.`

## CHECK 6 - Can Phase 10 Inventory Tests Execute Using Local Mode?

**YES** for the property-service data path, **BLOCKED** for the authenticated browser workflow.

Evidence for local property mode:

- [src/services/propertyService.ts](src/services/propertyService.ts#L53-L60) reads local live and archived stores when `isSupabaseConfigured` is false.
- [src/services/propertyService.ts](src/services/propertyService.ts#L63-L67) combines local live records with `SAMPLE_PROPERTIES` and excludes IDs returned by `getHiddenSampleIds`.
- [src/services/propertyService.ts](src/services/propertyService.ts#L71-L84) writes, updates, deletes, archives, and restores through the same property-service-owned local stores when Supabase is absent.
- Therefore direct local property-service tests can execute without AUTH.

Evidence for the browser workflow being blocked:

- [src/components/AuthPage.tsx](src/components/AuthPage.tsx#L39-L51) cannot complete Seller registration or login without Supabase credentials.
- [src/App.tsx](src/App.tsx#L87-L119) routes dashboard access through authenticated route handling.
- The Phase 10 browser tests require Seller login before creating the property, so those exact UI tests cannot execute in local mode.

## CHECK 7 - Hard Production Gates Blocking Runtime Testing

| Result | Gate | File and lines | Blocking behavior |
|---|---|---|---|
| BLOCKED | Supabase URL | [src/services/supabaseClient.ts](src/services/supabaseClient.ts#L10-L15), [src/services/authService.ts](src/services/authService.ts#L13-L16) | Missing URL makes the configured-client check false and causes auth operations to throw. |
| BLOCKED | Supabase anon key | [src/services/supabaseClient.ts](src/services/supabaseClient.ts#L10-L15), [src/services/authService.ts](src/services/authService.ts#L13-L16) | Missing anon key has the same effect. |
| BLOCKED | Auth registration | [src/services/authService.ts](src/services/authService.ts#L84-L105) | `registerUser` cannot reach `signUp` without both Supabase values. |
| BLOCKED | Auth login | [src/services/authService.ts](src/services/authService.ts#L108-L116) | `loginUser` cannot reach `signInWithPassword` without both Supabase values. |
| BLOCKED | Session hydration | [src/services/authService.ts](src/services/authService.ts#L63-L76) | `hydrateSession` cannot reach `getSession` without both Supabase values. |
| BLOCKED | Password reset | [src/services/authService.ts](src/services/authService.ts#L141-L148) | Reset request cannot reach Supabase without both values. |
| BLOCKED | Storage | [src/services/storageProvider.ts](src/services/storageProvider.ts#L21-L25) | Upload, retrieve, and delete throw when Supabase is absent. |
| BLOCKED | Database repository mode | [src/services/databaseProvider.ts](src/services/databaseProvider.ts#L18-L30) | Provider is labelled local when credentials are absent; real Supabase CRUD is not available. |
| BLOCKED | Production provider mode | [src/services/ProductionProvider.ts](src/services/ProductionProvider.ts#L8-L16) | Provider remains local unless Supabase credentials or explicit provider mode exists. |

No OAuth, storage, or payment gate was reached during the observed login attempt. OAuth configuration is displayed as unavailable in [src/components/AuthPage.tsx](src/components/AuthPage.tsx#L111-L114), but it is not the gate that produced the runtime auth error.

## Final Findings

- AUTH registration without Supabase: **NO** - blocked.
- AUTH login without Supabase: **NO** - blocked.
- Local fallback auth implementation: **NO**.
- Direct local property-service tests without AUTH: **YES** by source path.
- Authenticated browser Phase 10 tests in local mode: **BLOCKED**.
- No source code was modified during this audit.
