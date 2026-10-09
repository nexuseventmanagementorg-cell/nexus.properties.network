# NEXUS FULL-SCALE MASTER BUILD PLAN v1.0

**Status:** Planning baseline; implementation not started by this document  
**Scope:** Production roadmap for the existing NEXUS PROPERTY NETWORK repository  
**Evidence rule:** Current source code establishes current implementation. Architecture modules describe target intentions, not deployed behavior. Historical reports are cited as dated verification evidence and do not override source.  
**Planning constraint:** Preserve the existing React application. This plan does not authorize a rewrite, broad refactor, database deployment, or fabricated production data.

## 1. Executive Vision

Build the existing NEXUS PROPERTY NETWORK into a Pakistan-focused property operating system, beginning with a Lahore pilot, validating the model, expanding across Pakistan, and considering international expansion only after the national platform is proven.

The target includes a property marketplace and listing lifecycle; buyer, seller, renter, professional, enterprise and government workflows; identity/property verification, KYC, trust and fraud operations; lead and deal lifecycles with server-enforced locks; commission accounting; payments, invoices and subscriptions; communications and CRM; governed AI assistance; administration, audit, analytics, API, mobile architecture and the existing 3D experience.

The target is a product vision, not a statement that these capabilities currently operate in production.

## 2. Current State

The repository is a React 19 / TypeScript / Vite frontend with Supabase JS as a dependency. [src/App.tsx](./src/App.tsx) renders a long-form marketing/architecture surface, login/register and document pages, animation pages, and eleven dashboard URLs through a shared dashboard component.

Real-capable source paths exist for Supabase Auth, repositories, property inventory, storage operations and sandbox payment adapters. No configured runtime `.env` or live Supabase/provider credentials were found during this inspection. Current local record stores are in-memory (`Map`/global object), not durable production persistence. The login/register code requires Supabase configuration.

The 54 entries in [src/data/nexusData.ts](./src/data/nexusData.ts) are a static AI workforce roster. One shared drawer and keyword router exist; no 54 independent model-backed assistants were found.

`FINAL_NEXUS_STATUS.md` and `NEXUS_FULL_SCALE_MASTER_BUILD_PLAN_v1.0.md` did not exist at inspection time. `FINAL_BUSINESS_RULES_AUDIT.md` and numerous phase/audit reports do exist; their implementation claims are treated as historical evidence only.

## 3. Target State

Production behavior must be driven by authoritative persisted records, server-side authorization, server timestamps, explicit state transitions, immutable audit events, and tested integrations. UI controls must call real authorized operations and visibly distinguish verified, user-submitted, system-derived, AI-suggested, and demo/sample data.

Target deployment is PostgreSQL/Supabase with Supabase Auth and Storage, Row Level Security (RLS), privileged server-side operations, constraints, indexes, transactional business operations, audited payment webhooks and idempotency. Exact hosting topology and operational SLOs remain decisions for production design.

## 4. Canonical Business Rules

The user-provided rules in the planning brief are adopted as the product baseline:

### Lead Lock

- Duration is **48 hours**.
- It protects an active agent lead opportunity; the property remains visible and shows `LEAD LOCK ACTIVE`.
- Another eligible agent cannot simultaneously lock the same protected opportunity. Existing viewers/favorites may continue viewing.
- Backend state and timestamps are authoritative; expiry is enforced server-side.
- Reopening and reassignment follow lifecycle policy. The previous locking agent must not automatically regain a reopened lead when excluded by policy.
- The old 24- and 72-hour variants in [src/architecture/Section22LeadLifecycleOperatingSystem.ts](./src/architecture/Section22LeadLifecycleOperatingSystem.ts) are non-canonical.

### Deal Lock

- Initial duration is **7 days**; extensions are allowed, to a **maximum total of 15 days**.
- It protects an active transaction opportunity. Participants, extension decisions and milestones are auditable; expiry is server-side.
- Old 3/7/15/30-day and custom variants in [src/architecture/Section23DealLifecycleOperatingSystem.ts](./src/architecture/Section23DealLifecycleOperatingSystem.ts) are not competing policy.

### Commission

- NEXUS platform share is **1%**. Never use 5%.
- A complete engine must record transaction amount, eligible participants, platform share, participant splits, ledger entries, settlement and audit trail.
- Eligibility and distribution must be evidence-backed and dispute-aware. Percentage base, tax treatment, rounding, and who pays are not specified and need an explicit business decision before implementation.

### Non-payment and enforcement

Escalation sequence: reminder → warning → verified badge removed → new locks disabled → human review → ban only if approved. AI may detect, flag, recommend and escalate; it must not independently impose an irreversible permanent ban. Human/Super Admin approval is required.

### AI data integrity

AI must not invent properties, prices, statistics, ownership, verification/legal status, agent credentials, payment/deal status, government records or external verification results. If authoritative information is unavailable, say **“Information not available.”** Every answer/data surface must distinguish verified, user-submitted, system-derived, AI suggestion and demo/sample.

### Property and demo data

Never create fake production inventory to fill the marketplace. Demo content must be labelled `DEMO` or `SAMPLE`. Real listings require provenance and verification state. Where no verified inventory is available, show **“No verified property available.”**

### Roles

Keep the runtime role set exactly: Buyer, Seller, Agent, Agency, Developer, Investor, Industrial, Corporate, Government, AI Admin, Super Admin. Additional architecture labels are not new runtime roles.

### Plans and fees

Preserve current plan prices: Starter — PKR 1,000/month; Professional — PKR 5,000/month; Enterprise — PKR 25,000/month. Preserve premium listing prices: Featured Listing — PKR 15,000; Premium Listing — PKR 30,000; Developer Spotlight — PKR 50,000. These are current code values, not proof of successful billing. Lead-/deal-lock fees and plan feature quotas are **NOT FOUND** as executable constants.

## 5. Role Constitution

The current role union is defined in [src/database/schemas/models.ts](./src/database/schemas/models.ts) and is consistent with the eleven-role runtime list above. The shared dashboard in [src/components/RoleDashboardPage.tsx](./src/components/RoleDashboardPage.tsx) presents role-labelled capabilities but does not itself enforce security.

Target role model:

- Buyer/Seller: personal profile, own inquiries, authorized property/deal interaction.
- Agent: verified professional identity, eligible assigned leads, protected lock actions and own deal participation.
- Agency: verified organization/branches, only authorized team visibility and assignments.
- Developer: organization/project-scoped inventory, leads and milestones.
- Investor/Industrial/Corporate/Government: scoped assets, inquiries, portfolios and organization data under separately approved rules.
- AI Admin: operational review and reversible/authorized actions only; human review for material decisions.
- Super Admin: tightly controlled platform authority, explicit reasons/approvals and immutable audit.

This target mapping is not final authorization policy. Define an action/resource matrix and RLS before privileged operations. No UI-only role checks are security controls.

## 6. Product Surface

Preserve and incrementally complete the existing public marketplace and landing page, auth, role workspaces, property search/listing, lead/deal views, AI drawer, 3D experience, and legal/API-document surfaces.

The current `/privacy`, `/terms`, and `/api-docs` are static copy. Main runtime dashboard paths are `/dashboard/{buyer,seller,agent,agency,developer,investor,industrial,corporate,government,ai-admin,super-admin}`. Current login/register routes are `/auth/login` and `/auth/register`; animations use `/3d-animation` and `/hero-animation`. Unrecognized paths fall through to the landing page. `adminRole` is computed but is not used to render a separate route.

Renter-specific role/workflow, durable saved searches/favorites, and a functioning standalone API surface are not established by current runtime code.

## 7. Frontend Architecture

Keep React/TypeScript/Vite and current components. Build around typed API/domain contracts and reusable status/verification/provenance elements. Keep demo data isolated from production queries and visibly marked. Remove synthetic “verified/trust/lock/agent/location” metadata from real-looking property cards unless those fields come from authoritative records.

Replace dashboard placeholder counts and fallback sample rows only when backed by the relevant data service. UI loading, empty, error, offline, and permission-denied states must remain distinct. Maintain responsive and accessible controls. Avoid replacing the existing app with a starter template.

## 8. Backend Architecture

Introduce a server-side boundary for sensitive operations: auth/profile provisioning, role grant, verification decisions, lead/deal lock acquisition/extension/expiry, reassignment, commission calculation/settlement, privileged admin action, payment callback processing, and subscription entitlements.

Use domain services with validated inputs, explicit state transitions, transactions where invariants span records, idempotency keys where retries are possible, structured errors, and append-only event/audit records. Do not treat browser code as a privileged backend.

## 9. Supabase Architecture

Use Supabase PostgreSQL, Auth and Storage as the chosen target, contingent on environment configuration and operational setup. The browser receives only the anon/public key. Do not expose a service-role key, JWT signing secret, payment secret or provider credential via `VITE_*` client variables; server-only secrets belong in protected server/edge-function configuration.

RLS must be enabled and tested on user-owned and organization-scoped records. Use database constraints and indexes for uniqueness, referential integrity, lock uniqueness/expiry, searchable inventory and event lookups. Privileged functions must validate the JWT, role, resource scope, state transition, and reason.

Buckets proposed from current storage code are `property-images`, `verification-documents`, and `avatars`; bucket existence, access policies, file size/type constraints and retention remain unverified.

## 10. Canonical Database Schema

This is a design target, not a migration or deployed schema. Use UUID primary keys, `created_at`/`updated_at` timestamps, explicit foreign keys, controlled status values, and event history. Prefer `auth.users.id` as the identity key and a `public.profiles` record for application profile/role data.

| Domain/table | Minimum production record purpose and key fields |
|---|---|
| `profiles` | Auth user FK, full name, contact, primary role, account status, verification summary, timestamps. |
| `organizations`, `organization_members`, `branches` | Verified agency/company ownership, role membership, scopes, city/service coverage and member status. |
| `cities`, `areas`, `societies` | Canonical geography; `areas.city_id` FK, society/phase relationships, active state and unique names within parent. |
| `properties` | Owner/org, title, type, purpose, city/area/society, phase, size, bedrooms/bathrooms, price/currency, lifecycle status, verification state, provenance, published/expiry timestamps. |
| `property_media`, `property_documents` | Property FK, storage object path, uploader, media/document type, verification/retention state, content metadata and audit timestamps. |
| `verifications`, `verification_evidence`, `verification_decisions` | Subject type/ID, queue/state, evidence references, reviewer, decision, reason, timestamps and appeal/review linkage. |
| `leads`, `lead_assignments`, `lead_events` | Source, requester, property/intent, owner and current assignment, qualification/state, consent, response activity and append-only history. |
| `lead_locks` | Lead, agent, acquired/expiry server timestamps, state, extension/release reason and audit references; enforce at most one active protected lock per lead transactionally. |
| `deals`, `deal_participants`, `deal_events`, `deal_offers`, `deal_milestones` | Lead/property linkage, parties, authorized participant roles, state, offer terms, evidence, milestone state and append-only transitions. |
| `deal_locks` | Deal, actor/eligible participants, initial expiry, extension history/reason, total expiry capped at 15 days and release/expiry audit. |
| `commission_calculations`, `commission_ledger_entries`, `commission_settlements` | Deal/transaction base, canonical 1% platform share, participant split calculation, approved adjustments, payable state, settlement reference and audit. |
| `payments`, `payment_events`, `invoices`, `refunds` | Owner, amount/currency, purpose, provider, unique idempotency/reference, provider event/signature-verification result, status and invoice/receipt/refund linkage. |
| `plans`, `subscriptions`, `entitlements` | Plan version/pricing, monthly billing cycle, subscription status and authoritative paid entitlements; do not derive entitlement from client state. |
| `conversations`, `messages`, `notifications` | Participants, channel, sender/recipient, content/reference, delivery/read state and timestamps. |
| `ai_agents`, `ai_capabilities`, `ai_conversations`, `ai_tool_events` | Registry metadata, allowed tools/data scopes, session history under retention policy, invocation/evidence/escalation/audit; never imply 54 agents until actually deployed. |
| `audit_events`, `system_events`, `disputes`, `fraud_cases` | Actor, action, target, reason, before/after or event payload, correlation ID, evidence, review/decision state and immutable chronology. |

Foreign keys should link profile/org ownership and membership; geography; property/lead/deal; lock/participant; invoice/payment/subscription; and audit actor/target where feasible. Decide privacy, legal retention and deletion/anonymization policy before storing identity documents, conversation history or financial data.

## 11. Auth & Authorization

Current `authService` calls Supabase Auth and stores a UI session snapshot in browser local storage. `canAccessRole` allows matching role or AI Admin/Super Admin for any role; this is client-side gating only. Current registration accepts Buyer, Seller, Agent, Agency, Developer, Investor, Industrial, Corporate and Government; it does not offer AI Admin or Super Admin. Do not let public registration grant privileged roles.

Target: account creation creates an unprivileged profile; privileged role grants require a governed server-side process. Enforce organization/resource/action permissions in server functions and RLS. Verify email/contact and KYC/professional credentials as policy requires before protected actions. Implement refresh/revocation, session lifecycle, recovery, audit and abuse controls with live Supabase tests.

## 12. Property Lifecycle

Target: draft → submitted → pending verification → approved/published or correction/rejected → active → expired/suspended/archived → restored where policy permits. Store provenance and verification separately from publication. Only eligible owners/editors may change their records. Search must separate verified results from unverified submissions and samples.

Current property service supports create/update/delete/archive/restore and sample suppression based on city/area/phase/type/size matching. It may create records with `PENDING REVIEW`; no implemented review process establishes verification. Public samples are supplied from static files and must remain clearly sample-labelled. Do not call a user-submitted listing “verified.”

## 13. Verification Lifecycle

Target evidence-based identity, role, property, document, media and compliance queues with reviewer separation, reasoned decisions, evidence references, expiration/reverification, appeal/escalation and auditable status changes. AI may flag/analyze; authorized humans make consequential decisions. Integration results must identify provider/source and timestamp.

The current `verifications` schema is minimal; verification layers/workflows are in architecture modules, not a demonstrated verification engine. Never generate “verified” from placeholder defaults.

## 14. Lead Lifecycle

Target capture → consent/source attribution → qualification → eligibility-based routing → assignment/communication → active/inactive → converted, closed, expired, cancelled or disputed. Preserve assignment changes and evidence. The old architecture has aspirational states/rules, but a persisted production lead lifecycle and server routing engine are not established in current code.

Routing must use approved service-area, role, eligibility, capacity, consent and trust rules. Reassignment must be reasoned/audited and preserve prior owners and exclusions.

## 15. Lead Lock Lifecycle

Target acquire → active for 48 hours → activity and notifications → eligible extension only if separately approved by policy → release/expiry → reopen/reassign under deterministic exclusion rules. Backend transaction and server clock own acquisition and expiry. A unique active-lock constraint prevents double-lock races. Display `LEAD LOCK ACTIVE` while leaving property visible; existing viewers/favorites retain view access.

No production lead-lock service/table/lifecycle was found. `lead-lock` payment helper accepts a caller-supplied amount and creates a payment flow; it does not establish lock authorization or activation. Lock fee, payment prerequisite, lock extension fee, and exact activity/extension eligibility are **NOT FOUND** and must be decided before paid locks ship.

## 16. Deal Lifecycle

Target lead conversion/opportunity → participants → visits/offers/negotiation → agreement/documents → milestones/payment → completion review → settlement/close/archive, with cancel/expire/dispute/fraud paths. Preserve each participant's role and contribution history; freeze destructive changes in unresolved disputes. Current deal lifecycle detail is principally architecture content, not a backed end-to-end workflow.

## 17. Deal Lock Lifecycle

Target acquire for 7 days → auditable extension decisions → server expiry/release, with total active duration never exceeding 15 days. Protect active transaction context and participants/milestones, not just a UI label. Enforce eligibility, participant changes and expiry in backend transactions. No live deal-lock service was found. Amount, fee, who may extend, extension count/length and payment prerequisite are **NOT FOUND**.

## 18. Commission Lifecycle

Target calculate only after transaction amount and eligible participant contribution are evidenced; apply platform share of 1%; persist versioned calculation and splits; obtain required approvals; settle through reconciled payment/ledger entries; retain disputes and reversals without deleting history. Define rounding, tax, chargeback/refund and participant-split policy before implementation.

`deal_commissions` appears in `productionSql.ts`, but no functioning commission calculation/ledger/settlement service was found. Old percentages in reports or other documentation must not override 1%.

## 19. Payment Lifecycle

Target: plan/fee selection → server-calculated immutable invoice → initiation → provider checkout → authenticated signed callback/webhook → signature and amount/reference validation → idempotent event record → reconciliation → invoice/payment transition → entitlement activation → receipt and audit. Bank transfer requires a separate evidence/reconciliation/reviewer path.

Current service has JazzCash/Easypaisa sandbox adapters and Bank Transfer selection. Browser code posts to configured endpoints; the callback handler delegates verification to a separately configured API URL. Current service does not establish signature verification, idempotency, reconciliation, refunds, or provider settlement. Never accept client-controlled paid status or amount as authoritative.

## 20. Subscription Lifecycle

Keep Starter PKR 1,000/month, Professional PKR 5,000/month, Enterprise PKR 25,000/month. Existing executable constants encode these prices and `monthly`, but no feature/usage quotas are present. Architecture documentation describes other role-specific plan names and billing cycles; it is not executable pricing and conflicts with the simple runtime plans.

Target: pending subscription → verified payment → active entitlement → renewal/grace/suspension/cancellation/expiry/refund with history and notices. Define feature access, quotas, trial/grace duration, renewal timing and refund/entitlement behavior before release. Do not activate solely on a browser callback.

Keep code prices for premium tiers: Featured Listing PKR 15,000; Premium Listing PKR 30,000; Developer Spotlight PKR 50,000. Architecture tiers such as Basic/Verified/Enterprise listings lack aligned code pricing and need reconciliation.

## 21. Notification & Messaging

Current notification/message service functions write to the local in-memory adapter. Supabase tables/repositories also exist but these particular UI services do not constitute verified durable communication. Target user-scoped, permission-checked message and notification records, delivery/read state, preference/consent, retry behavior, and auditable notification triggers. Distinguish internal messages from external delivery.

## 22. CRM

Target persistent contacts, tasks, appointments, follow-ups, consent, activity timeline and scoped reporting linked to lead/deal ownership. Current architecture describes CRM; a complete durable CRM workflow is **NOT FOUND**. Do not implement automated outreach without opt-in, provider configuration, rate limits and auditable opt-out handling.

## 23. AI Architecture

Target a model/provider-neutral server-side orchestrator with typed tool contracts, per-request identity/role/scope, evidence provenance, citations/record IDs, confidence, policy filter, rate/cost controls, trace IDs, error states and human escalation. Responses must not fabricate data; empty/uncertain authoritative search returns “Information not available” or “No verified property available.”

Current implementation in [src/utils/routingEngine.ts](./src/utils/routingEngine.ts) is keyword routing. `AIAssistantDrawer` uses a deterministic shared handler, static FAQ/sample data and fallback copy. Some fallback claims are stronger than the actual records support. No model gateway, production AI memory, independent tool execution or governance service was found.

## 24. 54-AI Workforce

Preserve all 54 existing roster records and IDs as the canonical roster. Build registry records for identity/name, version, capability, permitted tools, allowed data classes, model/provider, status, owner, safety policy and audit configuration. Route only to capabilities actually enabled. Shared implementation or different display names must not be presented as 54 live agents.

Build in this order: registry contract → single supervised orchestrator → one evidence-grounded property/FAQ capability → tool permission and audit → measurable evaluations → specialist rollout behind flags. No mass integration of 54 providers is implied.

## 25. AI Governance

AI may summarize, classify, recommend, flag and route under least privilege. Require evidence and confidence where material; log prompt/tool/model/version and result in privacy-aware form. Human approval gates verification rejection, account enforcement, financial settlement, lock exceptions and permanent bans. Prohibit AI-only permanent ban. Provide appeal/escalation and adversarial/fabrication evaluation.

## 26. Admin / Super Admin

Target read-scoped operational queues, audit views, case investigation and explicit reasoned actions with permission/approval boundaries. Emergency controls must execute a backend operation, record actor/reason/approval/outcome and notify affected users. Current command-center UI labels its emergency actions as blueprint-only; no real enforcement should be inferred.

## 27. Audit & Compliance

Use append-only audit/system events for identity, role grants, property changes, verification decisions, lead assignment/locks, deal participants/locks/milestones, commission, payments, subscription entitlements and privileged actions. Record actor, role, action, target, server timestamp, reason, correlation ID, outcome and evidence references. Define retention, access, export, privacy and tamper-evidence. Current `recordAudit` calls and `admin_audit_log` DDL are not proof of complete immutable server audit.

## 28. External Integrations

Treat JazzCash, Easypaisa and Bank Transfer as adapters pending verified production onboarding. Identify ownership and configuration for identity/KYC, email/SMS, WhatsApp, Facebook, maps, signature, voice and government/property records before implementing each. Require sandbox credentials, provider callbacks, signed webhooks, privacy review, failure handling, rate limits and test evidence. No third-party integration is considered live solely because it appears in an architecture list or `.env.example`.

## 29. API Architecture

Define versioned contracts for Auth/Profile, Role/Organization, Geography, Properties/Verification, Leads/Locks, Deals/Locks/Commission, Payments/Subscriptions/Invoices, Messages/Notifications, AI, Admin/Audit and Analytics. Specify auth, authorization scopes, request validation, pagination, idempotency, stable error model, rate limits and OpenAPI. Current `/api-docs` is static marketing copy; no deployed API surface is verified.

## 30. Analytics

Start from persisted, permission-scoped events and documented metric definitions. Distinguish observed totals from estimates/predictions; every forecast needs source, timestamp and confidence. Target inventory quality, lead response/conversion, deal milestones, payments/reconciliation, subscription churn, fraud queues and platform reliability. No production analytics warehouse or verified predictive metrics were found.

## 31. 3D Architecture

Preserve current 3D/cinematic experiences as frontend features. Separate presentation assets from verified property facts; property overlays must use authorized records and show freshness/provenance. Optimize model/texture loading, reduced-motion/accessibility, device fallback and performance budgets. 3D rendering is not evidence of a digital twin, GIS boundary or verified parcel.

## 32. Mobile Architecture

Mobile apps are target architecture only. Reuse versioned APIs, auth scopes and design tokens; plan deep links, notification consent, secure storage, offline-safe read behavior and app-store privacy disclosures. Do not duplicate domain rules in mobile clients.

## 33. Security

Threat-model identity takeover, privilege escalation, cross-tenant reads, forged verification, lead poaching, duplicate lock races, callback spoofing/replay, price/commission manipulation, document exposure, prompt injection, scraping and denial of service. Use least privilege, RLS, server validation, secret isolation, signed webhooks, idempotency, rate limiting, secure upload validation, dependency updates and incident response. Run security review and dependency audit before production certification.

## 34. Performance

Set measurable budgets after pilot workload assumptions are approved. Add indexed, paginated queries; bounded image sizes and responsive media; caching with explicit invalidation; AI/provider timeouts and quotas; and observability for p95 latency, errors, query cost and queue age. Avoid asserting performance readiness without load tests.

## 35. Testing

Required: TypeScript/build/lint; unit tests for state transitions, role policy, 48-hour/7-to-15-day lock boundaries, 1% calculations, plans/prices, idempotency and provenance; repository/schema integration tests; RLS negative and positive tests; browser tests for all role routes and empty/error states; payment sandbox/webhook signature/replay tests; migration tests on disposable Supabase; accessibility and responsive checks; AI groundedness/fabrication adversarial suite.

Test source code is not a substitute for live-provider or browser evidence. Record environment, commit, exact steps, result and captured errors. Never put real secrets in reports.

## 36. Migration Strategy

First inventory and reconcile the current migrations, `productionSql.ts`, repository row mapping and all table access. Produce one ordered, versioned migration set with constraints, indexes and RLS; test from empty and supported existing schema. Define backup/rollback/forward-fix and data import validation. Never run production DDL from a frontend action or seed sample records into production.

## 37. Deployment Strategy

Use separate development, staging and production Supabase projects and provider credentials. CI gates typecheck/build/lint/tests/migration checks; deploy frontend and server functions from reviewed changes. Keep secrets in protected environment configuration; verify health, migrations, RLS and callbacks after deployment. Roll out pilot functionality behind feature flags and monitor before national expansion.

## 38. Production Readiness Gates

No domain is production-ready until its criteria pass in the target environment:

1. Schema/migration reproducible, constraints and indexes verified.
2. RLS grants intended access and blocks cross-role/cross-tenant access.
3. Server-side transition and audit tests pass, including concurrency and failure cases.
4. UI is connected to authoritative services with truthful empty/error/data provenance.
5. Provider integrations pass sandbox end-to-end and security verification.
6. Monitoring, alerting, backup/restore, incident ownership and rollback are documented.
7. Product owner accepts written business rules and measured pilot acceptance criteria.

## 39. Risk Register

| Risk | Evidence/impact | Mitigation |
|---|---|---|
| Browser/local state mistaken for durable backend | Local adapters use memory/global objects; Supabase setup absent | Gate production launch on configured environment and persistence tests. |
| Schema drift breaks CRUD | `invoices` repository/migration but absent from `productionSql.ts`; fields differ across declarations; application-generated IDs such as `LIVE-*`, `PAY-*`, `SUB-*` and `INV-*` are not UUIDs while current DDL declares UUID primary keys | Canonical migrations plus generated/type-checked DB contract and integration tests; choose one ID strategy before connecting these writes to production. |
| Client authorization is bypassable | Role checks are frontend-side and allow admin roles broadly | Enforce server/RLS policy; privileged grants and actions audited. |
| Fake trust/verification claims | Sample inventory and synthetic UI fields exist | Provenance/status model; remove placeholders from real-card paths. |
| Lock races or fake lock state | No production lock engine; architecture variants conflict | Adopt canonical timing, transactional unique lock and server expiry tests. |
| Financial loss or entitlement abuse | Sandbox abstractions only; callback is delegated but unverified | Signed server webhook, reconciliation, idempotency and no client status authority. |
| AI fabricates business facts | Shared deterministic drawer includes fallback claims | Evidence-grounding, no-result policy, evaluations and human escalation. |
| Architecture/report promises mislead release decisions | Historical reports contain readiness percentages and conflicting claims | Source-first evidence ledger; report verification scope and date. |
| Private data exposure | KYC/docs/conversations are sensitive; bucket policies not verified | RLS/storage policies, minimization, retention, access logs and privacy review. |

## 40. Dependency Graph

```text
PHASE 0 Rules freeze
  -> PHASE 1 UX/product requirements
  -> PHASE 2 API/domain contracts
  -> PHASE 3 canonical schema + migrations
  -> PHASE 4 Auth + RLS + authorization
  -> PHASE 5 persisted users/roles/property
  -> PHASE 6 lead + Lead Lock
  -> PHASE 7 deal + Deal Lock + commission
  -> PHASE 8 verification + trust + fraud
  -> PHASE 9 payments + subscriptions + invoices
  -> PHASE 10 notifications + messaging + CRM
  -> PHASE 11 AI orchestration + AI Admin
  -> PHASE 12 54-AI Workforce
  -> PHASE 13 external communications/integrations
  -> PHASE 14 analytics + API + partner architecture
  -> PHASE 15 security + performance + abuse prevention
  -> PHASE 16 production certification
```

The supplied phase order is retained. Within a phase, tasks may be sequenced by explicit technical dependencies; no paid lock or AI feature may bypass its required server-side domain controls.

## 41. Exact Implementation Order

Follow the required order, with a gate at each phase:

| Phase | Scope and exit gate |
|---|---|
| 0 | Business Rules + Architecture Freeze. **Documented in this Phase 0 update:** [canonical rules](./NEXUS_CANONICAL_BUSINESS_RULES_v1.0.md), [decision register](./NEXUS_DECISION_REGISTER_v1.0.md), [role/action/resource matrix](./NEXUS_ROLE_PERMISSION_MATRIX_v1.0.md), and [lifecycle contracts](./NEXUS_LIFECYCLE_CONTRACTS_v1.0.md). Open decisions remain explicitly unresolved. |
| 1 | Complete Product / Frontend Experience. Specify and complete role and user journeys, demo/provenance UX, empty/error states; retain existing app. |
| 2 | Frontend ↔ Backend Contracts. Approve typed request/response/error/state-transition contracts and authorization requirements. |
| 3 | Canonical Supabase Schema + Migrations. Reconcile current declarations; create/test migrations, indexes, constraints and RLS scaffolding. |
| 4 | Auth + RLS + Authorization. Verify real auth/session, private role grants, storage access and negative RLS tests. |
| 5 | Persistent Users + Roles + Property System. Use real records, provenance, safe media handling, archive/publish states and verified-only behavior. |
| 6 | Lead + Lead Lock Engine. Implement consent, assignment, atomic 48-hour lock, visible active state, server expiry/reopen/exclusion/audit. |
| 7 | Deal + Deal Lock + Commission Engine. Implement auditable participants, 7-day initial/15-day maximum lock, 1% platform share and ledger/settlement policy. |
| 8 | Verification + Trust + Fraud. Implement evidence queues, reviewer separation, appeals/escalation and human decisions. |
| 9 | Payments + Subscriptions + Invoices. Integrate verified callbacks, idempotency/reconciliation, current plan/pricing and entitlement transitions. |
| 10 | Notifications + Messaging + CRM. Persist owner-scoped records, consented delivery, retry/read states and CRM history. |
| 11 | AI Orchestration + AI Admin. Ship one evidence-grounded supervised orchestration path and audited human escalation. |
| 12 | 54-AI Workforce. Preserve roster; enable specialist tools incrementally with identity, scopes, evaluations and audit. |
| 13 | WhatsApp + Facebook + External Integrations. Add providers only after credentials, consent, callbacks and acceptance tests. |
| 14 | Analytics + API + Partner Architecture. Publish versioned APIs and provenance-aware analytics under scope controls. |
| 15 | Security + Performance + Abuse Prevention. Complete threat model, security checks, rate limits, load tests and operational drills. |
| 16 | Production Certification. Verify every readiness gate in §38 and authorize Lahore pilot; expand only after pilot evidence. |

## 42. Phase Deliverables

Each phase produces reviewed code/configuration only when implementation is separately authorized, plus tests, schema/API artifacts as applicable, operator notes, and an evidence-based acceptance report. Phase 0 produces frozen canonical policies/decision log. Phase 2 produces contract definitions. Phase 3 produces migrations and schema documentation. Phases 4–15 produce tested domain increments. Phase 16 produces certification evidence, unresolved-risk register and go/no-go decision.

This roadmap documents future implementation phases. Phase 0 also produced the canonical policy, decision, permission, and lifecycle documents and reconciled conflicting architecture/UI declarations; it did not implement production lock, payment, verification, or backend enforcement.

## 43. Acceptance Criteria

- Users can only access resources/actions permitted by server-enforced role, organization and ownership policy.
- Property search never presents samples as verified records; missing verified inventory produces “No verified property available.”
- AI never invents a business fact; missing authoritative evidence produces “Information not available.”
- Lead Lock is exactly 48 hours, race-safe, visible while property remains viewable, server-expiring and correctly reopened/reassigned.
- Deal Lock begins at 7 days and cannot exceed 15 total days, with participants, milestones and extensions audited.
- Commission calculation uses exactly 1% platform share and approved participant splits; inputs, rounding and settlement reconcile.
- Payments/subscriptions use verified, idempotent server events; plan prices match approved constants and entitlement follows persisted payment state.
- All sensitive operations have audit evidence; non-payment enforcement follows canonical ordered escalation; permanent ban always requires authorized human approval.
- Full test, RLS, migration, provider and runtime evidence is recorded before release. No percentage “readiness” is substituted for these gates.

## 44. Known Conflicts

| Conflict | Current repository evidence | Resolution for this plan |
|---|---|---|
| Lead lock timing | Architecture lists 24/48/72/custom hours; no production lock service found | Canonical 48 hours only. |
| Deal lock timing | Architecture lists 3/7/15/30/custom days; no production lock service found | Initial 7 days, extensions to 15 days maximum total. |
| Commission rate | Architecture/report variants may differ; no working calculation found | Canonical platform share 1%; never 5%. |
| Ban authority | Architecture language may allow AI Admin action; no real enforcement found | AI flags/recommends/escalates; permanent ban needs human/Super Admin approval. |
| Sensitive AI Admin actions | Architecture/UI previously implied AI Admin approval, freeze, suspension, payment, and verification powers | AI review/flag/recommend/escalate only; sensitive action grants remain DECISION REQUIRED. Permanent bans require authorized human/Super Admin approval. |
| Lead/trust scoring | Architecture/UI displayed unapproved lead-score and trust-score weights as active rules | Marked examples only; factors, weights, thresholds, range, and consequences remain DECISION REQUIRED. |
| Lock/escrow/commission claims | UI implied cryptographic lead exclusivity, escrow, automatic commission splits, legal protection, and live enforcement | Replaced with policy/blueprint and demo-only language; production services and unresolved rules remain explicit. |
| AI workforce status | Roster copy implied 54 continuously operating production agents and live telemetry | Preserve 54 IDs as a design registry; status/performance values are not production telemetry. |
| Subscription model | Runtime has Starter/Professional/Enterprise numeric monthly prices; architecture lists role-specific named tiers and cycles | Keep runtime prices; role-specific features/cycles/quotas require explicit reconciliation. |
| Premium listings | Runtime service has three priced tiers; architecture has additional unpriced tiers | Preserve three runtime amounts; do not infer additional prices. |
| Runtime identity roles | Eleven-role model; some architecture labels are wider | Keep eleven roles; new roles require explicit change. |
| Admin paths | `/dashboard/ai-admin` and `/dashboard/super-admin` are mapped; computed `/admin`, `/ai-admin`, `/super-admin` role variable is unused | Treat dashboard routes as current; fix route intentions only in an authorized frontend phase. |
| Database schema | Repository/migration/`productionSql.ts` field sets differ; `invoices` absent from `productionSql.ts`, geography absent there, UUID columns conflict with generated prefixed IDs, and area seeds reference city IDs that differ from the city seed IDs | One canonical migration system in Phase 3; do not deploy current snippets as-is. |
| Readiness reports | Earlier phase reports state activation/readiness percentages; Phase 9/11/12/13 reports describe missing configuration and failed/unexecuted live tests | Current source plus scoped runtime evidence wins; no production-ready claim absent reproducible current verification. |
| Samples vs live records | Sample data and placeholder UI fields coexist with real-capable search | Explicit provenance and verified-state gating; no fabricated production inventory. |

## 45. Decisions Required

Resolve and record before the dependent implementation begins:

1. **Commission base:** transaction amount definition, tax treatment, currency, rounding, payer, participant split policy and dispute adjustments.
2. **Lead Lock eligibility:** qualifying activity, extension allowance/criteria, any payment prerequisite/fee, release reasons, precise reopen exclusion and notification timings.
3. **Deal Lock extension:** extension unit/count, eligible approver, evidence, fee/payment status, and handling of disputes/holidays; total cannot exceed 15 days.
4. **Subscription entitlements:** which roles may buy each existing plan, exact features/quotas, renewal/grace duration, cancellation, downgrade, refund and entitlement behavior.
5. **Verification policy:** evidence requirements by user/property type, human reviewer authority, validity/expiry, appeal and retention.
6. **Tenant/organization model:** organization membership, branch scope, multi-role accounts and organization ownership for each resource.
7. **Auth policy:** account confirmation, phone/KYC requirements and restricted-role provisioning; privileged roles must not be self-selected at public signup.
8. **Data/privacy policy:** sensitive document storage, lawful basis/consent, retention/deletion/anonymization, AI prompt retention and export.
9. **Provider onboarding:** actual JazzCash/Easypaisa production/sandbox access, Bank Transfer review/reconciliation process, and ownership of server callback endpoints.
10. **External data sources:** authorized property/government verification providers, maps, messaging, WhatsApp/Facebook, email/SMS, signature and voice providers.
11. **Lahore pilot acceptance:** target user cohorts, minimum verified listing sources, measurable operational thresholds, support coverage and go/no-go owner.
12. **Deployment operations:** hosting, environments, backups/restore objectives, observability stack, incident ownership and service-level targets.
13. **Scoring and emergency authority:** approve lead/trust score factors and weights, thresholds, consequences, and any freeze/suspension/access-restriction authority and safeguards.

# Inspection and Evidence Appendix

## Repository areas inspected

- Root project manifests and environment template: `package.json`, `.env.example`.
- Runtime frontend: `src/App.tsx`, dashboard/auth/document pages, discovery, workforce, AI drawer, architecture sections and animation entry points.
- Services and domain access: auth, Supabase client/provider, database provider, property/inventory, payment, subscription, invoice, storage, notification/message, audit and local storage adapters.
- Data and utilities: sample properties/cities/areas, `nexusData.ts`, FAQ, routing engine and intent parsing.
- Data access/schema: `src/database/schemas/models.ts`, repositories, `productionSql.ts`, and SQL migration/seed files.
- Architecture modules: role constitution, verification, lead, deal, payment/subscription, AI Admin, voice, API, mobile and enterprise architecture declarations.
- Historical reports present in the repository: PHASE2, PHASE3, PHASE4, PHASE5, PHASE6, PHASE7, PHASE9, PHASE10, PHASE11, PHASE12 and PHASE13; plus relevant business-rule, production-readiness, pre-launch, AI-quality and sample/inventory reports.

## Current code facts used

- Runtime has eleven mapped dashboard roles, but all share `RoleDashboardPage`.
- Supabase Auth/repository/storage/payment paths are implemented as code paths, not verified live services.
- Runtime subscription amounts are Starter 1,000, Professional 5,000, Enterprise 25,000 PKR/month.
- Runtime premium listing amounts are 15,000, 30,000 and 50,000 PKR for the three named tiers in §4.
- Current SQL declarations are inconsistent: repository table names total `users`, `properties`, `leads`, `deals`, `messages`, `notifications`, `payments`, `subscriptions`, `invoices`; additional SQL/architecture declares `verifications`, `ai_conversations`, `deal_commissions`, `admin_audit_log`, `cities`, and `areas`. Several are not in all schema declarations or have mismatched columns/types. The SQL uses UUID primary keys while application code generates prefixed IDs for properties, payments, subscriptions and invoices; area seed IDs are also prefixed strings, and the area seed's city IDs do not match the city seed's IDs.
- Phase 9 reports live Auth, database, storage, search and payment tests as failed/unexecuted due to missing configuration. Phase 13 records registration/login failure and dashboard access blocked, alongside sample/property UI behavior. Historical Phase 6/7 completion/readiness statements do not establish current production operation.

## Phase 0 result and next implementation phase

Phase 0 documentation has been added in [NEXUS_CANONICAL_BUSINESS_RULES_v1.0.md](./NEXUS_CANONICAL_BUSINESS_RULES_v1.0.md), [NEXUS_DECISION_REGISTER_v1.0.md](./NEXUS_DECISION_REGISTER_v1.0.md), [NEXUS_ROLE_PERMISSION_MATRIX_v1.0.md](./NEXUS_ROLE_PERMISSION_MATRIX_v1.0.md), and [NEXUS_LIFECYCLE_CONTRACTS_v1.0.md](./NEXUS_LIFECYCLE_CONTRACTS_v1.0.md). Directly conflicting architecture declarations were reconciled and legacy variants labelled. Open business decisions remain open; Phase 0 does not authorize backend enforcement.

**Exact next phase: PHASE 1 — COMPLETE PRODUCT / FRONTEND EXPERIENCE**, as required by the Phase 0 brief. Phase 1 must treat the role matrix as a policy contract, preserve unresolved policy as unresolved, and must not present a UI gate as server-side security.

## Files likely to change later

The phase dictates the eventual file list. Likely future scope includes `src/architecture/Section22LeadLifecycleOperatingSystem.ts`, `src/architecture/Section23DealLifecycleOperatingSystem.ts`, `src/architecture/Section24PaymentSubscriptionOperatingSystem.ts`, `src/services/`, `src/database/`, `src/components/`, and versioned SQL migrations. Do not change them merely to make them agree with this plan; first approve the canonical policy and implementation phase.

## Files not to change unnecessarily

Do not replace `src/App.tsx` or the established React application; do not delete/rebuild existing components; do not rewrite unrelated animations/assets; do not replace the 54-person roster; do not modify sample data to masquerade as production data; do not expose/add secrets; do not mass-edit historical reports or duplicate this planning document.

## Production readiness gaps

No configured live Supabase project or production provider evidence was found. RLS, deployed migrations, cross-tenant authorization, durable non-property domain persistence, real verification, lock and commission engines, payment signatures/idempotency/reconciliation, paid entitlements, CRM/provider integrations, independent AI agents, operational monitoring and production certification remain unverified or absent in inspected code. The reports’ historical test outcomes are scoped snapshots, not current deployment credentials or guarantees.

## Phase 0 change confirmation

This Phase 0 update creates the four policy documents listed above, updates this roadmap, and reconciles only directly conflicting role, Lead Lock, Deal Lock, commission, subscription/pricing and mobile-role architecture declarations. A related architecture-section component was updated to display the corrected catalog. Runtime role types, domain services, migrations, Supabase configuration, payment processing and AI providers were not implemented or changed. No database was deployed and no production data or external integration was fabricated.
