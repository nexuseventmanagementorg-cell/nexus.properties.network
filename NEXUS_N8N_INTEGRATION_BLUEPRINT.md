# NEXUS PROPERTY NETWORK™ / NEXUS OS™
## Read-only architecture and n8n integration blueprint

**Audit scope:** Existing repository source, UI architecture definitions, data and assistant registry, services, repositories, SQL migrations, API handlers, environment template, and tests.

**Change boundary:** This report is the only file created for this task. No application files, credentials, database records, migrations, packages, or production configuration were changed. No migration or live integration was run.

## Evidence labels

- **VERIFIED** — directly established by repository source or repository configuration.
- **IMPLEMENTED BUT UNTESTED** — executable source exists, but no live provider/backend behavior was verified.
- **SIMULATED** — illustrative UI/data, in-memory/local behavior, mock provider, or design-only representation.
- **MISSING** — no corresponding implementation was found in the inspected API/service/schema surface.
- **NOT TESTED** — requires a configured environment, live provider, or end-to-end execution unavailable in this read-only audit.

These labels describe repository evidence, not a claim that a remote service is or is not configured outside the repository.

## 1. Actual current architecture and repository structure

### Runtime architecture

**VERIFIED**

1. **Web client:** React 19 + TypeScript + Vite. `src/main.tsx` mounts the application; `src/App.tsx` composes the marketing experience, product routes, role dashboards, architecture/document pages, AI drawer, and existing Sections 1–39. The current section set must be preserved; this blueprint does not propose adding Sections 40 or 41.
2. **UI and design registry:** `src/components/` contains landing sections and dashboard/product pages. `src/architecture/` and `src/components/Section19...` through `Section39...` express operating-system designs and proposed product structures; descriptions of planned APIs, assistants, locks, or governance in these files are not evidence those services are deployed.
3. **Data and inventory:** `src/data/` contains seeded sample cities, areas, properties, FAQs, and the 54-entry assistant design registry. `src/data/inventoryManager.ts` compares live listings with sample inventory and filters results.
4. **Service layer:** `src/services/` contains auth, authorization, properties, leads, deals, payments, subscriptions, invoices, notifications, messages, storage, and provider abstractions. Most domain services still use `storageAdapter.ts` (a process-memory map and optional global in-memory store) rather than the corresponding Supabase repositories.
5. **Repositories and database models:** `src/database/repositories/` provides generic Supabase/local repository operations, and `src/database/schemas/models.ts` defines TypeScript record shapes. `src/services/databaseMigrations/` contains SQL files, but no migration runner/application orchestration was found. `src/services/productionSql.ts` separately contains inline alternative table definitions; it is not a migration runner.
6. **Server-side code:** `src/server/` implements an AI chat handler, a fixed agent orchestrator, and server-side agent-activity storage. There are exactly two deployable API route files under `api/`: `api/ai/chat.ts` and `api/agents/run.ts`. `vite.config.ts` mounts corresponding middleware for local development.
7. **Provider configuration:** the browser Supabase client uses the public URL and anon key. Server AI and agent-activity handlers expect server environment variables. `.env.example` is a list of placeholders, not evidence of configured credentials; no `.env.local` was present during inspection.
8. **Tests:** `npm test` is configured to run two Node test files, covering AI chat and agent orchestration only. There are no repository test files for auth, RLS, property CRUD/deduplication, leads, deals, payment callbacks, notifications, storage, or end-to-end user journeys.

### Architectural distinction

The repository combines:

- a relatively complete **visual product prototype**;
- deterministic **sample-data** inventory and some local UI workflows;
- **Supabase client/repository code** that activates when frontend Supabase configuration exists;
- two actual server/API handlers (AI chat and agent runner); and
- extensive **future architecture definitions**.

It does **not** currently provide a complete, server-authorized business API for n8n to call. The API routes depicted in `src/components/ApiArchitectureSection.tsx` are design entries, not implemented route handlers.

## 2. Real implementation status of all 54 planned assistants

**VERIFIED:** `src/data/nexusData.ts` exports `AI_EMPLOYEES`, a design/UI roster of 54 entries (`ai-01`–`ai-54`). Its source comment explicitly says the entries are design entries and that legacy status, task, and accuracy fields are illustrative placeholders. All entries render an `ONLINE` status, which is not live agent telemetry.

**VERIFIED:** `src/server/agentOrchestrator.ts` exports exactly three executable sequential specialist steps. The steps make model calls through the same Gemini gateway and pass prior model output as untrusted context. The workflow does not dispatch 54 independent agents, run a job queue, or invoke n8n.

**IMPLEMENTED BUT UNTESTED:** the ordinary AI drawer posts to `/api/ai/chat`. `agentName` is accepted as request data; the general chat system prompt describes a Nexus Property Advisor for that role, rather than loading an independently implemented assistant definition for each roster entry.

### Registry entries (all are roster definitions, not deployed assistant services)

| IDs | Assistant names | Department |
|---|---|---|
| AI-01–AI-12 | Listing Auditor AI; Duplicate Radar AI; Title Deed Guardian AI; Biometric Identity AI; Satellite Boundary AI; Agent Credential AI; Fraud Sentry AI; Court Order Scanner AI; NOC Validator AI; Tax Compliance AI; Listing Expiry Engine AI; Trust Consensus AI | Verification & Trust |
| AI-13–AI-24 | Lead Lock Guardian AI; Deal Lock Escrow AI; Intent Classifier AI; Budget Verifier AI; Smart Lead Router AI; Commission Split AI; Token Vault AI; Dispute Preventer AI; Transfer Appointment AI; Lead Reopen Arbitrator AI; Overseas Escrow Liaison AI; Deal Archive AI | Lead & Deal Operations |
| AI-25–AI-34 | National Property Valuator AI; Rental Yield Forecaster AI; Society Infrastructure Index AI; Market Momentum Forecaster AI; Commercial ROI AI; Industrial Corridor AI; Agri-Land Fertility AI; High-Rise Feasibility AI; Heatmap Matrix AI; Construction Cost Radar AI | Valuation & Intelligence |
| AI-35–AI-44 | WhatsApp AI Negotiator; Multilingual Voice AI; Property Matching AI; Automated CRM Dispatch AI; Legal Contract Drafter AI; Virtual Staging & Render AI; Omnichannel Marketing AI; Tenant Screening AI; Lead Re-engagement AI; Customer Success AI | Automation & Communication |
| AI-45–AI-54 | Urban Planning Compliance AI; AML & PEP Scanner AI; Inheritance Succession AI; Overseas Power of Attorney AI; Environmental Clearance AI; Developer Escrow Compliance AI; Digital Signature Sentry AI; Property Tax Grievance AI; Drone Inspection AI; AI Admin Supervisory Core | Legal & Governance |

**Classification:** the roster is **SIMULATED/design-only**; its external-data claims, accuracy values, completed-task counts, integrations, and `ONLINE` flags are not production telemetry. Some entries describe proposed roles or explicitly unmeasured activity; none should be presented to n8n as a callable agent merely because it has a registry ID.

**VERIFIED executable assistant-like steps:** Property Matching AI → Listing Auditor AI → QA Testing Bot (`src/server/agentOrchestrator.ts`, `NEXUS_AGENT_STEPS`). Note that the roster calls Listing Auditor AI AI-01 and Property Matching AI AI-37, but there is no registry-driven binding or 54-agent routing mechanism.

## 3. Existing backend endpoints n8n could call

Only the two API routes below were found. Their Vercel route adapters are in `api/`; local development equivalents are mounted in `vite.config.ts`.

### `POST /api/ai/chat`

**Status: IMPLEMENTED BUT UNTESTED against a live Gemini account.**

- **Handler:** `api/ai/chat.ts` → `handleNexusChatEndpoint` in `src/server/aiChatEndpoint.ts` → `generateNexusChatReply` in `src/server/aiChat.ts`.
- **Method:** POST only. Other methods return HTTP 405, `{"error":"Use POST to send a chat message.","code":"METHOD_NOT_ALLOWED"}`.
- **Authentication:** no bearer token or user/session authorization is checked. A same-origin guard rejects mismatched `Origin` and host when both headers are supplied. It is not a substitute for webhook authentication or authorization.
- **Throttling:** in-memory per-address window, 12 calls per minute; state is process-local and not shared across serverless instances. The address is derived from `X-Forwarded-For` where present.
- **Required JSON shape:**

  ```json
  {
    "messages": [
      {"role": "user", "text": "Message text"}
    ],
    "language": "en",
    "agentName": "Property Matching AI",
    "sourceContext": "Optional context"
  }
  ```

- **Validation:** `language` must be `en`, `ur`, or `roman_ur`; `agentName` is a string up to 100 characters; 1–14 messages, each non-empty and at most 2,500 characters; total message characters at most 9,000. History starts with a user message after leading model messages are removed and ends with a user message. Optional context is truncated to 3,500 characters.
- **Server configuration:** `NEXUS_GEMINI_API_KEY` is required for a model response; `NEXUS_GEMINI_MODEL` is optional and defaults to `gemini-2.5-flash`. Missing key returns HTTP 503 with `AI_NOT_CONFIGURED`. Provider/model errors return HTTP 502; validation errors return HTTP 400.
- **Success response:** `{"reply":"...","provider":"gemini","model":"gemini-2.5-flash"}`.
- **n8n suitability:** not suitable for trusted workflow actions or private data as currently configured. It is a model-only public chat endpoint; it does not verify user roles, access business records, create leads, or perform operations.

### `GET /api/agents/run`

**Status: IMPLEMENTED BUT UNTESTED against a configured durable activity database.**

- **Handler:** `api/agents/run.ts` → `handleAgentRunEndpoint` in `src/server/agentRunEndpoint.ts`.
- **Method:** GET. Returns `{"events":[...]}` containing up to 100 recent activity events. The event shape includes `runId`, `step`, `kind`, sender/recipient roles, optional instruction/reply/artifact, and `createdAt`.
- **Authentication:** when `NEXUS_AGENT_RUN_TOKEN` is configured, requires `Authorization: Bearer <operator-token>`. The handler compares SHA-256 digests and also checks token length. Missing/invalid token returns 401. In production, a missing token returns 503 `RUNNER_NOT_CONFIGURED`. This is one shared operator credential, not per-user authorization.
- **Storage requirement:** requires server-only Supabase URL and service-role key to read the `nexus_agent_activity` table. Missing config, unavailable table, or DB error returns HTTP 503. Production also requires HTTPS for the configured storage URL.
- **No pagination/caller scoping:** GET returns recent event content for any caller holding the shared operator token; the current query is bounded to 100 rows but not scoped to a run or caller.

### `POST /api/agents/run`

**Status: IMPLEMENTED BUT UNTESTED against configured Gemini and durable Supabase activity storage.**

- **Authentication and storage:** same requirements as GET above. POST first checks that durable storage is reachable before starting a run.
- **Required JSON body:**

  ```json
  {"goal":"Project instruction, 1 to 1200 characters"}
  ```

- **Workflow:** runs the same three sequential model steps every time; `NEXUS_GEMINI_API_KEY` is required. The endpoint has a Vercel `maxDuration` of 60 seconds.
- **Success response:** `{"runId":"<uuid>","completedSteps":3,"totalSteps":3,"events":[...]}`
- **Errors:** invalid goal returns 400 `INVALID_GOAL`; model key missing returns 503 `AI_NOT_CONFIGURED`; failed model step returns 502 `AGENT_STEP_FAILED`; bad/missing operator token returns 401; production token configuration or activity storage failures return 503. Unexpected model/storage failures are returned as generic 503 `AGENT_RUN_UNAVAILABLE`.
- **Input/body constraints:** the orchestrator enforces goal length; Vite's local middleware additionally caps request JSON at 24,000 bytes. The Vercel adapter relies on platform request parsing and the goal validator; no explicit Vercel body-byte cap is set here.
- **Idempotency/retries:** no idempotency key, job ID supplied by caller, duplicate-run prevention, queue, retry policy, or cancellation endpoint exists. Retrying POST can start and bill for another run.
- **n8n suitability:** can be called by a narrowly scoped n8n service credential for bounded AI analysis only, after token, quota, network, event-content, and retry controls are agreed. It is not a general business workflow API.

### Routes shown in UI architecture but not implemented

`src/components/ApiArchitectureSection.tsx` depicts `/api/auth/*`, `/api/properties/*`, `/api/leads/*`, `/api/deals/*`, `/api/payments/*`, and other routes. In the inspected `api/` directory and Vite middleware, those handlers do not exist. The React client calls Supabase Auth/DB directly in places and uses local service functions elsewhere; those are not equivalent to a stable n8n-facing API.

## 4. Database entities and relationships

### Entities declared in SQL

The following tables are declared in `src/services/databaseMigrations/`:

| Entity/table | Declared columns and intended relationship from source | Evidence/status |
|---|---|---|
| `users` | UUID `id`, `full_name`, unique `email`, `role`, status and timestamps. No `auth.users` reference or trigger is declared. | `users.sql`; **IMPLEMENTED BUT UNTESTED** |
| `properties` | UUID `id`, UUID `owner_id`, title, city, area, phase, property type, price, status, timestamps. No FK to users or cities. | `properties.sql`; **IMPLEMENTED BUT UNTESTED** |
| `leads` | UUID `id`, UUID `property_id`, UUID `owner_id`, text `assigned_to`, status and timestamps. No FK to property/user. | `leads.sql`; **IMPLEMENTED BUT UNTESTED** |
| `deals` | UUID `id`, UUID `property_id`, UUID `owner_id`, text `assigned_to`, status and timestamps. No FK to property/user. | `deals.sql`; **IMPLEMENTED BUT UNTESTED** |
| `notifications` | UUID `id`, UUID `recipient_id`, type/title/body/read/status/timestamps. No FK to users. | `notifications.sql`; **IMPLEMENTED BUT UNTESTED** |
| `messages` | UUID `id`, UUID `conversation_id`, UUID sender/recipient IDs, body/direction/status/timestamps. No `conversations` table is in the migrations and no FKs are declared. | `messages.sql`; **IMPLEMENTED BUT UNTESTED** |
| `subscriptions` | UUID `id`, UUID `owner_id`, plan/billing cycle/status/timestamps. No FK to users. | `subscriptions.sql`; **IMPLEMENTED BUT UNTESTED** |
| `payments` | UUID `id`, UUID `owner_id`, amount/currency/provider/status/timestamps. SQL has no `subscription_id`, event type, callback/provider transaction identity, lock/deal/lead reference, or FK. | `payments.sql`; **IMPLEMENTED BUT UNTESTED** |
| `invoices` | UUID `id`, UUID `owner_id`, amount/currency/type/reference/status/timestamps. No FK to payment/subscription. | `invoices.sql`; **IMPLEMENTED BUT UNTESTED** |
| `verifications` | UUID `id`, UUID `owner_id`, polymorphic `entity_type` + UUID `entity_id`, status/timestamps. SQL has no reviewer, evidence, decision, or FK. | `verifications.sql`; **IMPLEMENTED BUT UNTESTED** |
| `cities`, `areas` | City names/province and area name/city ID. Migrations do not define FK constraints or unique city/area keys. | `cities_seed.sql`, `seed_areas.sql`; **IMPLEMENTED BUT UNTESTED** |
| `nexus_agent_activity` | Run ID, step, event type, sender/recipient, instruction/reply/artifact, timestamp. This is the only inspected table with RLS enabled and an explicit service-role grant/revocation. | `agent_activity.sql`; **IMPLEMENTED BUT UNTESTED** |

The SQL files mostly declare columns and types, not relational constraints. `REFERENCES`/foreign-key declarations, table-specific `CREATE POLICY` statements, and business-entity idempotency constraints were not found in the inspected migrations. No migration execution against a real database was performed.

### Runtime relationship intent versus enforced database relationships

- A **property** belongs to an owner; a **lead** and **deal** refer to a property and owner/assignee; a **notification** belongs to a recipient; a **message** connects sender, recipient, and a conversation; a **subscription**, **payment**, **invoice**, and **verification** identify an owner or subject.
- Those are mostly application/model intentions, **not SQL-enforced relationships**: the migration definitions do not add foreign keys. `verifications.entity_type/entity_id` is polymorphic and cannot express a simple FK without additional design.
- `src/database/schemas/models.ts` declares richer records than the SQL: for example, `Payment.subscriptionId`, `Verification.reviewerId/decision/evidence`, and `Conversation` exist in TypeScript models but are not all represented in the SQL migrations.
- `src/services/productionSql.ts` declares a second, divergent inline schema (including `ai_conversations`, `deal_commissions`, and `admin_audit_log`) that differs from migration files. No application path invoking it was found. It must not be treated as the applied database schema.
- Some seed scripts conflict with declared types: `seed_areas.sql` inserts `AREA-...` IDs into UUID columns; `seed_sample_properties.sql` inserts `OWNER-...` into UUID `owner_id`. `cities_seed.sql` and `seed_cities.sql` both seed overlapping city data with different IDs. These are **migration/seed risks; NOT TESTED** on a database.

## 5. Authoritative property data and read/write consistency

### What is authoritative now?

There is not one unified authoritative source in all modes.

- **When Supabase URL and anon key are configured:** `propertyService.ts` uses `propertyRepository` for live and archived records. Search still combines those records with the in-code `SAMPLE_PROPERTIES` catalog.
- **When Supabase is not configured:** live/archive records use `readStore`/`writeStore`; `storageAdapter.ts` holds values in a process-local `Map` and a `globalThis` object. This is not durable browser storage, not a shared DB, and can be lost on reload/process restart. The sample catalog remains imported static data.
- **Sample inventory:** `SAMPLE_PROPERTIES` in `src/data/sampleProperties.ts` is explicitly sample data and is never proof of ownership, verification, availability, or a live listing.
- **Supabase data:** no configured credentials, database contents, or successful live read/write were available to confirm current records.

### Read/write gaps

1. `searchProperties()` reads live data and always merges in sample data, filtering samples only by `getHiddenSampleIds()`. Consumers must preserve sample/unverified status; the merged result is not a single trusted live inventory.
2. `propertyService.ts` selects Supabase persistence for properties, but `leadService.ts`, `dealService.ts`, `notificationService.ts`, `messageService.ts`, and `auditService.ts` write through local `storageAdapter.ts`; they do not call the corresponding Supabase repositories. As a result, the apparent repository layer does not make these service workflows durable or consistent.
3. `BaseRepository` uses direct Supabase table operations when configured and local memory otherwise. `ProductionProvider` and `SupabaseRepositories` separately use an in-memory `globalThis` store, not the Supabase database. These are multiple persistence mechanisms with different lifecycle guarantees.
4. SQL uses UUID IDs. Domain services generate IDs like `LIVE-${Date.now()}`, `LEAD-${Date.now()}`, `DEAL-${Date.now()}`, `PAY-${Date.now()}`, `SUB-${Date.now()}`, and `INV-${Date.now()}`. Those values are not valid UUIDs for the migrated primary-key columns. A configured DB write using those service paths is likely to fail unless IDs/schema are reconciled; **NOT TESTED** against Supabase.
5. SQL columns do not consistently match repository payloads/models: lead and deal services include fields such as `title`/`ownerRole` absent from their SQL; payments include `event_type` and `subscription_id` absent from `payments.sql`; service/property models include more inventory fields than `properties.sql`.
6. The browser Supabase client directly accesses tables with the anon key. No service-side API abstraction currently guarantees that property, lead, deal, notification, message, payment, and verification reads/writes share authorization rules or transaction boundaries.

**Recommended authority:** after schema and role rules are stabilized, make a server-authorized database API the sole mutation boundary for production inventory and business workflows. Treat sample catalog records as separate seed/demo records, explicitly marked and excluded from verified/live queries.

## 6. Duplicate-property prevention

### Existing behavior

`src/data/inventoryManager.ts` has `sameInventoryKey()` and `getHiddenSampleIds()`. It hides a sample from mixed search when a live record matches a normalized key consisting of city, area, phase, property type, and area size.

### Gaps

- This is a **sample-display suppression rule**, not duplicate-property prevention. It does not compare live records with other live records, does not reject or merge incoming listings, and does not lock concurrent writes.
- `Duplicate Radar AI` is a roster/design entry only. No image-hash, geospatial, vector, or duplicate-review service is connected.
- `properties.sql` has no unique constraint for a verified external parcel/registry identity, location key, or dedupe fingerprint; the schema does not declare coordinates, parcel/title identifiers, or image hashes.
- Case/whitespace normalization is partial; area/phase matching, aliases, different size spellings, coordinates, parcel subdivisions, and cross-broker evidence can evade the current tuple match. The tuple itself may also conflate distinct units with the same listed attributes.
- Timestamp-derived IDs are not idempotency keys and do not protect against simultaneous submissions or retried n8n/webhook executions.

### Required production prevention

1. Define a canonical identity hierarchy with human-reviewed sources: jurisdiction + scheme + block + parcel/plot/unit, normalized coordinates/boundary, and provenance; distinguish same property syndicated by several brokers from multiple sale/lease offers.
2. Persist a versioned normalized dedupe fingerprint and supporting evidence; use database uniqueness/transactional constraints for truly canonical identifiers, plus a candidate-match workflow for probabilistic matches.
3. Make duplicate detection return `NEW`, `POSSIBLE_DUPLICATE`, or `CONFIRMED_DUPLICATE` with evidence and threshold; only an authorized human reviewer may merge/archive disputed records.
4. Require request idempotency keys and DB-enforced uniqueness to make retries/concurrent submissions safe.
5. Keep sample inventory separate from live listing state and ensure sample filtering cannot serve as the only duplicate safeguard.

## 7. Lead Lock, Deal Lock, and payment status

### Lead Lock

**SIMULATED / MISSING:** `leadService.ts` stores lead rows in the local adapter. `updateLead()` writes a `lead-lock` audit event when the status is `Negotiating`; it does not create an exclusive lock record, lock holder, expiry, atomic claim, release/renew operation, or durable lock history. The `LeadLockAdapter` in `frontendContracts.ts` is only an interface. No `/api/leads/lock` endpoint exists. Payment helpers can create a payment categorized as `lead-lock`, but there is no implemented link from successful payment to an active lead lock.

### Deal Lock

**SIMULATED / MISSING:** `dealService.ts` stores deal rows locally and records a `deal-lock` audit event on status `Pending Payment`. No atomic deal lock, participant authorization, hold period, milestone state machine, extensions, release/dispute workflow, escrow, or payment-confirmation activation exists. A `DealLockAdapter` is an interface; the architecture page describes a proposed endpoint, not an implementation.

### Payments/subscriptions/invoices

**IMPLEMENTED BUT UNTESTED; not production-verified:**

- `paymentService.ts` has service functions for creating payment records, subscription payment, callback processing, status updates, and payment summaries.
- JazzCash/Easypaisa are represented by `SandboxGateway`; it calls environment-configured URLs and expects provider references/checkout URLs. No merchant credential/signature implementation or live provider SDK is shown in this service.
- `handlePaymentCallback()` expects a callback service at `VITE_PAYMENT_CALLBACK_API_URL`, but **no `/api/payments/*` handler exists** in the inspected routes or Vite middleware. The UI architecture file lists payment routes, but they are not deployed handlers.
- The callback code looks up a payment by provider reference and updates its status; a paid subscription can then be activated. No demonstrated cryptographic provider signature verification, replay guard, amount/currency comparison, provider event uniqueness, allowed-transition check, or atomic transaction spans payment, invoice, and subscription updates.
- `createLeadLockPayment()` and `createDealLockPayment()` create categorized payments but do not enforce locks; the default Deal Lock provider is `Bank Transfer`, which does not use the sandbox gateway. No bank reconciliation handler is present.
- `createPayment()` saves a payment and then creates an invoice in separate operations; a partial failure can leave one without the other. IDs/references rely on `Date.now()`; DB IDs conflict with UUID schemas. No idempotency table/unique provider event key is declared.
- `markPaymentStatus()` accepts a status and saves it without a state-transition policy at this layer. Payment/invoice/subscription mutations have no n8n-facing endpoint or verified server-only authorization boundary.

**NOT TESTED:** merchant sandbox transactions, real signatures, callbacks, cancellation/failure/refund paths, invoice persistence, subscription activation, duplicate callback behavior, and settlement/reconciliation.

## 8. Secure webhooks, roles, RLS, idempotency, retries, and audit

### Existing controls and limitations

- **Agent run endpoint:** a shared static bearer token is checked if configured. It is not bound to a role, user, workflow, or individual permission. No token rotation, expiration, per-client scopes, replay nonce, or request-signature timestamp is implemented.
- **AI chat endpoint:** same-origin check and process-local rate limiting exist, but no login, tenant, user, or webhook identity is required.
- **Role checks:** `authService.ts` derives the UI role from session user data/metadata and stores a copy in browser localStorage. `canAccessRole()` and `src/App.tsx` route checks are client-side checks, not server authorization. `registerUser()` accepts role input and sends it as user metadata. Do not use this client-controlled role as an n8n permission claim.
- **Authorization helper:** `src/services/authorization.ts` contains a static role/action map, but no use of `requirePermission()` was found in the application/server API path.
- **RLS:** `agent_activity.sql` enables RLS, revokes anon/authenticated table rights, and grants service-role access. The other inspected application entity migrations do not define RLS policies. Actual Supabase grants/configuration were not inspected; access outcomes depend on remote configuration and must be verified before production.
- **Secrets:** `.env.example` distinguishes server-only Gemini and service-role credentials from browser Supabase settings, but `supabaseClient.ts` also reads `VITE_SUPABASE_SERVICE_ROLE_KEY`. Any secret placed in a `VITE_` variable is client-bundle-visible and must not be used for a privileged key. Use a server-only `NEXUS_SUPABASE_SERVICE_ROLE_KEY`/`SUPABASE_SERVICE_ROLE_KEY` only in trusted server runtime; never share actual values with n8n executions/logs unnecessarily.
- **Audit:** `auditService.ts` writes audit events to the same local store, uses timestamp-derived identifiers, and does not guarantee durable or append-only server audit history. Payment/verification helper events are not automatically a tamper-resistant audit ledger.
- **Retries:** neither agent nor business workflows have idempotency keys, persistent job state, dead-letter queue, or retry policy. Blind retries can duplicate model spend, payments, notifications, or future mutations.
- **Human approval:** no general approval service/endpoint is implemented. Proposed UI/constitution content does not enforce approval.

### Minimum n8n production boundary

1. n8n calls only a dedicated HTTPS server API; it must not use browser/localStorage state or receive a database service-role key as a general credential.
2. Give each workflow a separate least-privilege credential, scoped to named actions and records. Prefer short-lived signed service tokens with audience, issuer, expiry, role/scope, and rotation, or HMAC signatures with timestamp + nonce + request-body digest. Reject stale timestamps and reused nonces.
3. Validate request schema, tenant/user ownership, role permissions, allowed state transitions, body size, content type, and rate/quotas on the server. Do not trust n8n-supplied `ownerId`, `role`, price, payment status, verification result, or approval.
4. Enforce RLS and grants for every table; test as anon, authenticated user A, user B, staff role, and service identity. Ensure service-role access is server-only and selectively used.
5. Add caller idempotency keys and unique DB constraints. Persist inbound webhook ID, provider ID, payload hash, processing state, result, attempt count, and timestamps in a transactional inbox/outbox. Return the original result on safe replay.
6. Use bounded retries with exponential backoff + jitter only for transient errors; do not retry validation/permission failures or non-idempotent payment operations. Add dead-letter/manual-replay controls and alerting.
7. Persist immutable, correlated audit records for actor/service identity, action, target IDs, before/after state or safe diff, approval, external event ID, idempotency key, outcome, timestamps, and trace/run IDs. Redact secrets, documents, credentials, and unnecessary PII.
8. Keep irreversible/high-impact actions (verification approval, duplicate merge, lead/deal lock release, payment/refund, legal/identity decisions, user role changes, and outbound messages) behind defined human review until policy, evidence, permissions, and recovery are approved.

## 9. Proposed n8n workflow map and dependencies

This is a proposed integration design, not an assertion that these workflows/endpoints already exist.

### Foundation dependency chain (must precede live business automations)

**F0 — Define production contract and data authority**

- Approve canonical IDs, UUID strategy, schemas, status enums, role ownership, tenant boundaries, duplicate policy, data retention, consent, and payment rules.
- Reconcile SQL migrations, `productionSql.ts`, TypeScript models, repository payloads, and service contracts. Design any required FKs, unique constraints, indexes, and RLS policies.
- Decide which existing schema is the canonical migration source and establish versioned migration/review/rollback procedures.

**F1 — Server API/security foundation**

- Implement server-side authentication/authorization and business APIs; do not expose the DB service-role credential to browser code or n8n.
- Add webhook authentication, request validation, idempotency inbox/outbox, durable job state, observability, rate limits, and API contract tests.
- Establish owner/tenant-scoped RLS and privilege test matrix before migrating data or enabling workflows.

**F2 — Persistent storage and domain services**

- Make property/lead/deal/notification/message/payment/subscription/invoice/verification writes durable and transactional through the authorized server boundary.
- Add explicit audit ledger, workflow events, and domain events/outbox.
- Add migrations and integration tests before calling workflows.

### Workflow map

| Workflow | Trigger → n8n nodes (proposed) | Dependencies / human checkpoint |
|---|---|---|
| **W1 Property intake and review** | Authenticated app/API submission or approved import → validate/sanitize → normalize location and canonical fields → dedupe candidate lookup → store pending draft → notify reviewer → human approve/reject/merge → publish/archive → audit and owner notification. | F0–F2; private document/image storage and ownership controls. Human approval required for verification, duplicate merge, and publish until evidence policy is approved. |
| **W2 Listing freshness** | Scheduled query of published properties → detect stale/failed re-verification → notify owner and reviewer → expire/archive only through a guarded idempotent transition → audit. | F0–F2; expiry duration and restore rules approved. Do not let an AI roster entry autonomously purge listings. |
| **W3 Buyer inquiry → lead** | Authenticated inquiry event → consent check → normalize/dedupe contact and inquiry key → validate property is active → persist lead → optional AI intent summary → assignment suggestion → eligible human/agent approval → notify parties → record SLA. | F0–F2; privacy/consent, lead ownership, routing and source idempotency defined. AI may recommend, not set authoritative financial or identity facts. |
| **W4 Lead Lock lifecycle** | Authorized lock request → server eligibility check → atomic conditional claim + expiry/history record → optional payment intent → provider webhook verification → transition to active only after validated payment/policy → reminders → authorized release/expiry/reopen → audit. | Requires a real lock schema/API, transaction/unique constraints, payment verification, policy decisions, and human dispute path. Current service only changes lead status. |
| **W5 Deal lifecycle and Deal Lock** | Authorized lead conversion → create deal with linked property/participants → document checklist → human milestone approvals → payment/escrow state events → final transfer evidence → close/archive. | Requires deal state machine, permissions, documents/storage, explicit lock policy, payments/escrow integrations, and legal review. Do not equate `Pending Payment` with a lock. |
| **W6 Payment/subscription lifecycle** | Server-created payment intent → provider checkout → signed provider webhook → verify signature, merchant, event ID, reference, amount/currency and status → idempotent ledger update → invoice/subscription transition in a transaction → notify → reconcile exceptions. | Requires provider-specific server credentials, callback routes, signature verification, event inbox, payment/refund schema, tests, and finance approval. n8n must not accept client-reported “paid” status. |
| **W7 Verification and evidence review** | Private document upload/case creation → malware/type/size checks → evidence metadata/hash → optional bounded extraction/OCR → reviewer queue → human decision → append verification event → notify owner. | Requires storage buckets/RLS, verification evidence schema, retention/consent rules, government/identity provider authorization, and human decision. No government verification adapters are currently established. |
| **W8 Notifications, CRM, and messaging** | Domain event/outbox → preference/consent check → provider-specific message template → dispatch → provider receipt/webhook → delivery status/retry/dead letter → audit. | Requires provider credentials, callback endpoints, consent/opt-out, message ownership, delivery-event schema, and templates. WhatsApp/social integrations are not connected in this audit. |
| **W9 AI assistant support** | Approved user question → authenticated server gateway → retrieve only authorized/verified facts → role-specific allowed tool selection → return suggestion with provenance → optional human review → audit interaction metadata. | Requires privacy and retention decisions, user authorization, safe retrieval, prompt/tool boundaries, cost controls, and live tests. Existing chat is a general Gemini text endpoint and should not be treated as a trusted action API. |
| **W10 AI workforce rollout** | Registry entry selected → define bounded capability/permissions → connect to a tested workflow/node → add evaluation and observability → limited pilot → human sign-off → staged enablement. | Do not activate the 54 roster records together. Start with one low-risk read-only assistant, then add roles only when data, evaluation, authorization, fallback, and owners are defined. |
| **W11 Exception/reconciliation** | Scheduled comparison of provider event ledger, payment records, invoices, subscriptions, workflow outbox and dead letters → flag mismatches → reviewer queue → approved correction → audit. | Depends on durable event/audit ledgers and provider reconciliation API/export; never silently rewrite payment status. |

### Workflow sequencing recommendation

Foundation F0 → F1 → F2 → W1 property review → W3 lead intake → W4/W5 lock and deal lifecycle → W6 payments → W7 verification and W8 communication (provider-specific sequencing) → W9 assistant actions → W10 workforce expansion → W11 reconciliation.

Read-only retrieval and draft/suggestion workflows can be piloted earlier only after authentication, data minimization, and RLS/ownership controls are verified. Mutating or financial workflows must wait for F0–F2 and explicit human approvals.

## 10. Missing endpoints, credentials, migrations, tests, and approvals

### Missing endpoints

**MISSING as deployable route handlers:**

- Auth/session/profile API suitable for service-to-service use, role/ownership checks, and account administration.
- Properties: create draft, update, submit/review/approve, search/details, archive/restore, upload metadata, duplicate candidates, merge/reject.
- Leads: create, list/get with owner scope, assignment, status, activity, lock/renew/release/expire/reopen, consent/communication preference.
- Deals: create/convert, state transitions/timeline, lock/extension/release, document checklist, milestone approval, dispute.
- Payments: create intent, provider callback/webhook, verify event, refund/cancel, invoice read, subscription lifecycle, reconciliation.
- Verification: submit case/evidence, reviewer queue, approve/reject/request-more-evidence, status read.
- Notifications/messages/CRM: authenticated user-scoped access, send/mark-read, provider webhooks, consent/opt-out.
- Audit/events: durable append/query, outbox/inbox, idempotency status, job status/retry/replay, health/metrics.
- n8n-specific inbound webhook/API gateway with scoped service identity, event signature, replay defense, schema version, and stable response/error contract.

The only existing business-adjacent routes are AI chat and operator-token-protected agent execution/activity; neither supplies those domain APIs.

### Credentials/configuration needed (names/categories only; no values requested or exposed)

- **Supabase:** browser `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY` (public client configuration only); server-only `NEXUS_SUPABASE_URL` + `NEXUS_SUPABASE_SERVICE_ROLE_KEY` for narrowly scoped trusted server tasks. Never set a service-role key under any `VITE_` name.
- **AI:** server-only `NEXUS_GEMINI_API_KEY`, optional `NEXUS_GEMINI_MODEL`; set usage ceilings and data policy.
- **Agent runner:** dedicated, rotatable `NEXUS_AGENT_RUN_TOKEN` if retaining the current shared-token endpoint. Prefer separate short-lived scoped credentials for new n8n APIs.
- **Payments:** provider-issued JazzCash/Easypaisa merchant credentials, callback-signing secrets/certificates, and verified server callback URLs; bank-transfer reconciliation credentials/process where relevant. Current sandbox URL variables alone do not prove provider configuration.
- **Messaging:** WhatsApp/Meta app and webhook credentials, approved sender/template setup, signing secret, user consent/opt-out policy.
- **Identity/OAuth/email/storage:** Google OAuth client credentials/redirects if enabled; email provider credentials; Supabase Storage bucket policies; government/registry/identity provider access only after formal authorization and privacy review.
- **n8n:** HTTPS base URL, secret store, separate service credential per workflow/environment, encryption key, execution-data retention/redaction, backup/restore, and restricted network ingress/egress.

No actual credential values were inspected or included; `.env.example` contains placeholders.

### Migrations/schema work needed

1. Choose one canonical schema/migration source; reconcile it with `productionSql.ts`, `src/database/schemas/models.ts`, `src/services/models.ts`, and repository/service input/output shapes.
2. Reconcile all IDs to UUIDs or deliberately change SQL IDs before relying on current timestamp-prefixed IDs. Fix seed IDs/types and remove/rework duplicate city seed sources.
3. Add explicit FKs/check constraints/unique indexes for owner/property/assignee/conversation/payment/subscription/invoice/verification relations; decide whether IDs are required or nullable, with delete/archive semantics.
4. Add versioned role/tenant-aware RLS policies and grants for every table. Include storage object policies. Add tests that prove cross-owner reads/writes are denied.
5. Add event inbox/outbox, idempotency key records, webhook provider event IDs, payment attempt/ledger/refund records, state transition history, lock records with holder/expiry/history, notification delivery attempts, and durable audit events.
6. Add verification reviewer/evidence/decision fields and private storage metadata/retention rules. Design message conversations explicitly.
7. Add canonical property identity and duplicate candidate/fingerprint evidence. Decide what is a true duplicate versus a separate offer/listing.
8. Add operational indexes and migration rollback/forward-compatibility process only after schema review. No migrations were run for this audit.

### Tests required before production integrations

- **Unit/contract:** endpoint request/response schemas, all HTTP methods, role/action matrix, state transition policies, canonical ID mapping, dedupe matching, provider event verification, retry classification.
- **Database/RLS integration:** apply migrations to isolated test Supabase; test anonymous, user A, user B, staff, and service identities; verify all foreign keys, uniqueness, rollback, ownership isolation, and UUID/model compatibility.
- **Property:** create/update/archive/restore/search against persisted DB; sample-vs-live labelling; alias/coordinate/parcel cases; concurrent identical submissions; retry idempotency.
- **Leads/deals:** ownership, routing, assignment, lock concurrency/expiry/release/reopen, converted-deal links, dispute and audit history.
- **Payments:** signed provider fixtures, invalid signatures, wrong merchant/reference/amount/currency, replayed events, duplicate callbacks, concurrent callback delivery, legal status transitions, partial failures across payment/invoice/subscription, refunds/cancellation/reconciliation.
- **Security:** CSRF/origin and webhook signature rules, service-token expiry/scope/rotation, body limits, brute-force/rate limits, secret leakage, RLS/storage policy verification, audit redaction.
- **Messaging/verification:** consent/opt-out enforcement, webhook authenticity, storage upload policy, malicious/oversized file rejection, reviewer approval path.
- **End-to-end:** user signup/login/session expiry, role authorization, seller submit-to-publish, buyer inquiry-to-lead, approved payment-to-invoice/subscription, notification delivery, mobile and error recovery.
- **AI/n8n:** prompt injection and untrusted retrieved content, tool authorization, PII minimization, factual provenance, cost/timeout/quotas, n8n retry/idempotency, dead-letter/replay, and human approval behavior.

Current repository tests do not cover these flows. No test suite was run as part of this read-only report.

### Human decisions/approvals required

- MVP scope and whether n8n is orchestration-only or permitted to initiate domain mutations.
- Canonical property identity, dedupe thresholds, duplicate merge/archive authority, listing verification standards, sample data labeling.
- Role assignment policy, especially admin roles; user/agent/agency/developer ownership and tenant boundaries.
- Lead Lock eligibility, duration, exclusivity, pricing, payment relationship, release/expiry/reopen, dispute and appeal authority.
- Deal Lock duration/milestones/extension/escrow, payment and refund policy, commission policy, legal review, and which actors approve each transition.
- Payment provider, merchant accounts, fees, settlement, signed callback contract, refunds, reconciliation, and financial operator approvals.
- Verification sources, document retention/deletion, identity/government-data access authorization, reviewer qualifications and final approval authority.
- AI role permissions, allowed tools and records, accuracy/evaluation gates, human escalation thresholds, conversation retention/consent, and prohibited decisions.
- n8n hosting/security owner, credential rotation, execution log retention, incident response, retries/dead-letter replay ownership, and release/rollback responsibility.

## Source index

- Main app and sections: `src/App.tsx`, `src/components/`, `src/architecture/`, `src/routing/appRoutes.ts`.
- Assistant registry: `src/data/nexusData.ts` (`AI_EMPLOYEES`), `src/components/AIWorkforceSection.tsx`, `src/components/AIWorkforceConstitutionSection.tsx`.
- AI handlers: `src/server/agentOrchestrator.ts` (`NEXUS_AGENT_STEPS`, `runNexusAgentWorkflow`), `src/server/agentRunEndpoint.ts` (`handleAgentRunEndpoint`), `src/server/aiChat.ts` (`generateNexusChatReply`), `src/server/aiChatEndpoint.ts` (`handleNexusChatEndpoint`), `src/server/agentActivityStore.ts`.
- Routes/dev middleware: `api/agents/run.ts`, `api/ai/chat.ts`, `vite.config.ts`.
- Auth/access: `src/services/authService.ts` (`registerUser`, `loginUser`, `getCurrentUser`, `canAccessRole`), `src/services/authorization.ts`, `src/services/supabaseClient.ts`, `src/App.tsx` dashboard route handling.
- Data/providers: `src/services/propertyService.ts`, `src/data/inventoryManager.ts`, `src/data/sampleProperties.ts`, `src/services/storageAdapter.ts`, `src/services/ProductionProvider.ts`, `src/services/databaseProvider.ts`, `src/services/SupabaseRepositories.ts`, `src/database/repositories/BaseRepository.ts`.
- Domain services: `src/services/leadService.ts`, `src/services/dealService.ts`, `src/services/paymentService.ts`, `src/services/subscriptionService.ts`, `src/services/invoiceService.ts`, `src/services/notificationService.ts`, `src/services/messageService.ts`, `src/services/auditService.ts`, `src/services/frontendContracts.ts`.
- Schema and migration evidence: `src/database/schemas/models.ts`, `src/services/models.ts`, `src/services/productionSql.ts`, `src/services/databaseMigrations/*.sql`.
- API design-only list: `src/components/ApiArchitectureSection.tsx`.
- Tests and scripts: `tests/ai-chat.test.ts`, `tests/agent-orchestration.test.ts`, `package.json`.
- Placeholder environment variable names: `.env.example`.
