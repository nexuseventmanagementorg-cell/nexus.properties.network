# NEXUS CANONICAL BUSINESS RULES v1.0

**Status:** Phase 0 policy baseline  
**Authority:** Product-owner rules in the Phase 0 brief. This document freezes specified decisions only; it does not make frontend copy, architecture modules, or services production enforcement.  
**Enforcement:** Server-side/RLS enforcement will be implemented in later phases.

## Status labels

- **CANONICAL** — explicitly specified and authoritative.
- **DECISION REQUIRED** — intentionally unresolved; do not infer or implement a value.
- **FUTURE** — target capability, not current runtime behavior.
- **LEGACY/NON-CANONICAL** — retained only to explain an older or superseded architecture value.

## 1. Roles

- **CANONICAL:** Runtime roles are exactly Buyer, Seller, Agent, Agency, Developer, Investor, Industrial, Corporate, Government, AI Admin, and Super Admin.
- **CANONICAL:** Do not add Moderator or another runtime role without an explicit product-owner change.
- **CANONICAL:** Current runtime `User.role` is a single role.
- **FUTURE / DECISION REQUIRED:** Multi-role support may be considered later; role combination, context switching, permission intersection and audit behavior are undecided.
- **CANONICAL:** AI Admin is not a human Super Admin substitute. AI cannot independently impose a permanent user ban.
- **DECISION REQUIRED:** Exact readable/creatable/editable/approval/financial scopes for each role are described as policy boundaries in [NEXUS_ROLE_PERMISSION_MATRIX_v1.0.md](./NEXUS_ROLE_PERMISSION_MATRIX_v1.0.md). This is not production security.

## 2. Property states and visibility

- **FUTURE:** Proposed lifecycle is Draft → Submitted → Pending Verification → Under Review → Approved → Published → Active → Expired or Suspended → Archived.
- **DECISION REQUIRED:** Transition details, reinstatement, expiry duration, who may approve/suspend/archive, appeals, required evidence and ownership transfer.
- **CANONICAL:** Property remains publicly visible during an active Lead Lock; an active lock is shown as `LEAD LOCK ACTIVE`.
- **CANONICAL:** Never create fake production property records to populate inventory.
- **CANONICAL:** Demo records are visibly classified `DEMO` or `SAMPLE`.
- **CANONICAL:** Real listings retain provenance and verification state; user-submitted is not equivalent to verified.
- **CANONICAL:** If verified search has no qualifying result, show **“No verified property available.”**

## 3. Verification

- **FUTURE:** Verification workflow may cover identity, role, property, documents, media, fraud and compliance.
- **CANONICAL:** AI may analyze or flag evidence but must not invent verification or legal status.
- **DECISION REQUIRED:** Required documents/checks by role/property, reviewer authority, separation of submitter/reviewer, validity, renewal, appeal, trust-score effect, legal/provider source, retention and final decision authority.
- **DECISION REQUIRED:** Verification thresholds and any effect of a failed check on listings, account access, paid entitlements or existing locks.

## 4. Lead lifecycle

- **FUTURE:** Proposed stages: Captured → Qualified → Routed → Assigned → Active → Locked → Converted → Closed, Expired, Cancelled or Disputed; Reopened/Reassigned where policy permits.
- **CANONICAL:** Reopening/reassignment must be deterministic. A previous locking agent must not automatically regain an excluded reopened lead.
- **DECISION REQUIRED:** Qualification criteria, route ranking, assignment response window, lock eligibility evidence, reopen triggers/timing, reassignment authority and exclusion duration.
- **DECISION REQUIRED:** Lead-score factors, weight values, range, thresholds, and score-driven outcomes. Weights shown in architecture/UI are unapproved examples, not active policy.
- **FUTURE:** Backend timestamps, durable state and audit events will govern lead transitions; local client state is not authoritative.

## 5. Lead Lock

- **CANONICAL:** Duration is exactly **48 hours**.
- **CANONICAL:** Lock protects an active agent lead opportunity. Only an eligible agent may hold the protected opportunity; another eligible agent cannot simultaneously lock that same opportunity.
- **CANONICAL:** Property stays publicly visible and displays `LEAD LOCK ACTIVE`; existing viewers/favorites may continue viewing.
- **CANONICAL:** Production lock acquisition, authoritative timestamp, uniqueness and expiration are server-side responsibilities.
- **CANONICAL:** Reopen/reassignment follows deterministic rules; an excluded former locking agent is not automatically reassigned.
- **DECISION REQUIRED:** Eligible-agent qualification beyond the specified active lead context; evidence/activity requirement; release conditions; notice timing; reopen timing; extension availability; lead-lock fee; and whether payment is a prerequisite.
- **LEGACY/NON-CANONICAL:** 24-hour, 72-hour and custom Lead Lock variants previously listed in architecture are not active policy.

## 6. Deal lifecycle

- **FUTURE:** Proposed stages: Opportunity → Participants → Visit/Negotiation → Offer → Agreement/Documents → Payment/Milestones → Completion → Settlement → Closed/Archived.
- **CANONICAL:** Preserve participants and milestones in auditable history.
- **DECISION REQUIRED:** Transition eligibility, required evidence, authorized actors, dispute hold/release, cancellation, expiry and settlement conditions.

## 7. Deal Lock

- **CANONICAL:** Initial lock duration is **7 days**.
- **CANONICAL:** Extensions are allowed; maximum total duration is **15 days**, counting the initial period.
- **CANONICAL:** Production expiry is server-enforced. Extension decisions, participants and milestones are auditable/preserved.
- **DECISION REQUIRED:** Eligible participant roles, extension unit/count, approver, reason/evidence, extension timing, fee, payment prerequisite, expiry notice, and release/reopen rules.
- **LEGACY/NON-CANONICAL:** Older 3-, 7-, 15-, 30-day/custom menus are not alternative active durations. The 7-day initial and 15-day total cap above are the only current rule.

## 8. Platform commission

- **CANONICAL:** NEXUS platform share is **1%**.
- **CANONICAL:** Do not use 5%.
- **DECISION REQUIRED:** Commission base, tax treatment, rounding, payer, participant split, dispute adjustment, and refund/chargeback behavior.
- **FUTURE:** Commission calculation, ledger, settlement and audit functionality may be built only after the unresolved formula/policy items are approved.
- **LEGACY/NON-CANONICAL:** Any conflicting historic percentage is not active policy.

## 9. Payments

- **CANONICAL:** Runtime payment-provider labels currently include JazzCash, Easypaisa and Bank Transfer; the labels/adapters do not prove a live integration or settlement.
- **FUTURE:** Production payment lifecycle is Created → Pending → Processing → Paid, Failed or Cancelled → Refunded where applicable; server-verified provider evidence is required for any paid state.
- **DECISION REQUIRED:** Provider ownership/credentials, payment callback ownership, signature rules, reconciliation, bank-transfer reviewer/evidence, refund/chargeback policy, taxes, invoice lifecycle and non-subscription payment prices.
- **CANONICAL:** Never trust client-controlled payment status, amount or commission as authoritative.

## 10. Subscriptions

- **CANONICAL:** Starter — **PKR 1,000/month**.
- **CANONICAL:** Professional — **PKR 5,000/month**.
- **CANONICAL:** Enterprise — **PKR 25,000/month**.
- **CANONICAL:** Preserve the runtime prices; do not silently change them.
- **DECISION REQUIRED:** Role eligibility, features, quotas, entitlements, renewal, grace period, suspension behavior, cancellation, refund and entitlement revocation.
- **LEGACY/NON-CANONICAL:** Role-specific tier names and non-monthly billing variants in old architecture are not active runtime plan definitions.

## 11. Premium listings

- **CANONICAL:** Featured Listing — **PKR 15,000**.
- **CANONICAL:** Premium Listing — **PKR 30,000**.
- **CANONICAL:** Developer Spotlight — **PKR 50,000**.
- **DECISION REQUIRED:** Included placement, duration, metrics, eligibility, renewal/refund and verification relationship.
- **LEGACY/NON-CANONICAL:** Basic Listing, Verified Listing and Enterprise Listing are not additional priced tiers.

## 12. Non-payment and enforcement

- **CANONICAL:** Escalation order is Reminder → Warning → Verified badge removed → New locks disabled → Human review → Ban if approved.
- **CANONICAL:** AI may detect, flag, recommend, escalate and provide evidence.
- **CANONICAL:** AI must not independently impose an irreversible permanent ban.
- **CANONICAL:** Permanent ban requires authorized human/Super Admin approval.
- **DECISION REQUIRED:** Notice windows, cure period, evidence threshold, appeal/review process, scope of lock restriction, ban duration taxonomy and required approver/dual control.
- **FUTURE:** Enforcement is not implemented by this policy document. No irreversible automated ban is authorized in Phase 0.

## 13. AI governance and factual integrity

- **CANONICAL:** AI must never fabricate property, price, statistics, ownership, verification, legal status, agent credentials, payment status, deal status or government data.
- **CANONICAL:** If authoritative information is unavailable, say **“Information not available.”**
- **CANONICAL:** Verified-property search with no qualifying result says **“No verified property available.”**
- **CANONICAL:** Clearly identify data as `VERIFIED`, `USER SUBMITTED`, `SYSTEM DERIVED`, `AI SUGGESTION`, `DEMO` or `SAMPLE`.
- **CANONICAL:** AI recommendations do not become verified facts or final legal/financial decisions.
- **DECISION REQUIRED:** Trust-score factors, weights, event impacts, score range, thresholds, and consequences. Values shown in architecture/UI are unapproved examples, not active policy.
- **FUTURE:** Governed AI orchestration, tool permissions, evidence references, escalation and audit are later-phase work.

## 14. AI workforce

- **CANONICAL:** Preserve existing 54 roster entries and IDs; do not delete or rename them.
- **CANONICAL:** Describe the roster as an **AI WORKFORCE REGISTRY** until individual runtime agents are implemented.
- **CANONICAL:** Do not claim 54 production model-backed agents.
- **FUTURE:** Registry capabilities, model/provider, tools, permissions, data scope, memory, orchestration, human approval and audit will be defined before specialist activation.

## 15. Administration and security

- **CANONICAL:** Human/Super Admin authority is required for permanent bans.
- **CANONICAL:** Preserve historical and audit data; do not silently rewrite state/history.
- **FUTURE:** Server-side authorization and Supabase RLS will be implemented in later phases. Frontend role checks are UX only and are not production security.
- **DECISION REQUIRED:** Which administrative actions require single/dual approval, emergency scope/time limit, reason codes and appeal route.

## 16. Canonical source reconciliation

The master roadmap and Phase 0 decisions are the normative planning references. Current source remains evidence of current implementation, not policy authority where it conflicts with these explicitly approved rules. Historical variants must be labelled **LEGACY / NON-CANONICAL**, not silently deleted or presented as active.
