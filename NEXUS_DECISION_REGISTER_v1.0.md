# NEXUS DECISION REGISTER v1.0

**Status:** Open product-owner decisions; no answers inferred  
**Labels:** Every unresolved item is explicitly **DECISION REQUIRED**. A decision should record owner, approval date, rationale and affected contract/schema before implementation.

| ID | Decision | Current state / required decision |
|---|---|---|
| D-01 | Commission base, tax, rounding, payer and participant split | **DECISION REQUIRED:** define transaction amount/base; tax inclusion; rounding/currency; liable payer; participant eligibility/allocation and approvals. Canonical NEXUS platform share remains 1%. |
| D-02 | Commission dispute adjustment and refund/chargeback | **DECISION REQUIRED:** define whether/how commission is reversed, withheld, recalculated or recovered after dispute, refund, reversal or chargeback. |
| D-03 | Lead Lock fee and payment prerequisite | **DECISION REQUIRED:** decide whether a fee exists, exact amount/currency and whether verified payment is required before lock. |
| D-04 | Lead Lock extension | **DECISION REQUIRED:** decide whether extension is allowed, duration/count, evidence/activity, approver, fee and notifications. The canonical lock itself is 48 hours. |
| D-05 | Lead reopen timing/exclusion | **DECISION REQUIRED:** define reopen triggers and timing, reassignment process, prior-agent exclusion window/conditions, and authority. Prior excluded locker must not automatically regain the lead. |
| D-06 | Deal Lock fee | **DECISION REQUIRED:** decide whether a fee exists, amount/currency and payment prerequisite. |
| D-07 | Deal Lock extension unit/count | **DECISION REQUIRED:** define extension increments, count, approver, evidence, reason and notices. Initial period is 7 days; total cannot exceed 15 days. |
| D-08 | Subscription entitlements | **DECISION REQUIRED:** assign role eligibility, feature access, quotas and limits to Starter/Professional/Enterprise. Keep current prices: 1,000 / 5,000 / 25,000 PKR monthly. |
| D-09 | Subscription grace/refund behavior | **DECISION REQUIRED:** define renewal, grace duration, suspend/restore behavior, cancellation, refunds, chargebacks and entitlement dates. |
| D-10 | Verification requirements | **DECISION REQUIRED:** per-role/property evidence, reviewer authority, submitter/reviewer separation, external sources, expiry/reverification, appeal and consequences. |
| D-11 | Organization/multi-role model | **DECISION REQUIRED:** organization/member/branch ownership and scope; whether multi-role is supported; role-switching and authorization semantics. Current runtime remains one of eleven roles. |
| D-12 | Privacy/data retention | **DECISION REQUIRED:** consent/lawful basis, retention/deletion/anonymization, KYC/media/conversation retention, export, access and audit retention. |
| D-13 | External provider ownership | **DECISION REQUIRED:** technical/business owner, credentials, callback endpoint, production onboarding, support/escalation and security review for each provider (payments, identity, email/SMS, WhatsApp/Facebook, maps, voice, signatures, government/property data). |
| D-14 | Lahore pilot acceptance criteria | **DECISION REQUIRED:** target users, verified inventory sources/minimums, support coverage, quality thresholds, duration, success metrics and named go/no-go authority. |
| D-15 | Deployment/operations | **DECISION REQUIRED:** hosting, environments, secret management, backups/restore objectives, observability, incident ownership, SLOs and rollback/forward-fix procedure. |
| D-16 | Role/action/resource policy | **DECISION REQUIRED:** approve exact actions and resource scopes, role grants, administrative overrides, approval/dual-control requirements and organization membership rules. |
| D-17 | Property lifecycle and publication | **DECISION REQUIRED:** transition actors/evidence, listing expiry, suspension/appeal/restore, publication eligibility and visibility of unverified user submissions. |
| D-18 | Lead qualification/routing/scoring | **DECISION REQUIRED:** qualification evidence, routing priorities/ties, response deadlines, capacity, assignment change authority, score factors/weights/range/thresholds and audit fields. Existing score weights are unapproved examples. |
| D-19 | Deal lifecycle eligibility | **DECISION REQUIRED:** deal creation criteria, participant roles, evidence at each transition, cancellation/expiry, dispute hold and settlement authority. |
| D-20 | Lock admin/release authority | **DECISION REQUIRED:** whether any admin can release/override a live Lead Lock or Deal Lock, under what reason, approval, participant notice and audit constraints. |
| D-21 | Premium listing entitlements | **DECISION REQUIRED:** exact features, placement/duration/metrics, eligibility, renewal, refunds and verification requirements for Featured, Premium and Developer Spotlight. Prices remain 15,000 / 30,000 / 50,000 PKR. |
| D-22 | Payment reconciliation | **DECISION REQUIRED:** idempotency key/reference, callback signature/rotation, duplicate/replay handling, source of truth, bank transfer evidence and finance reconciliation procedure. |
| D-23 | Trust scoring | **DECISION REQUIRED:** score factors, weights, event impacts, range, thresholds, consequences and review/appeal. Existing architecture values are unapproved examples. |

## Decision governance

- No open row may be resolved by choosing a plausible default.
- Implementation depending on an unresolved item must either stop or be limited to non-binding documentation with the decision marked.
- Canonical timing/rates/prices specified in [NEXUS_CANONICAL_BUSINESS_RULES_v1.0.md](./NEXUS_CANONICAL_BUSINESS_RULES_v1.0.md) are not reopened by this register.
- The master roadmap’s Phase 0 decisions are expanded here; this register does not deploy a database or implement business operations.
