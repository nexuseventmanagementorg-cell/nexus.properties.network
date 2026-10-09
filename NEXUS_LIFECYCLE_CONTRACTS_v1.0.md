# NEXUS LIFECYCLE CONTRACTS v1.0

**Status:** Proposed policy/state-transition contract for Phase 0  
**Implementation status:** Documentation only. Server-side/RLS enforcement will be implemented in later phases. No transition below should be inferred to run in production today.

## Contract rules

- Every state mutation must be authorized, validated against the current state, and recorded with actor, timestamp, reason/evidence reference, prior state and resulting state.
- Production timestamps/expiry and consequential payment/lock transitions are server-authoritative.
- Preserve source evidence and history; do not silently rewrite or delete lifecycle events.
- `DECISION REQUIRED` means the product owner has not defined the actor/condition and no implementation may guess it.
- “Authorized user” below means a role and resource scope approved by the later role/RLS contract, not any authenticated client.

## Property

**States:** Draft → Submitted → Pending Verification → Under Review → Approved → Published → Active → Expired/Suspended → Archived.

| Transition | Allowed actor | Prerequisite | Result | Audit requirement | Future backend enforcement |
|---|---|---|---|---|---|
| Draft → Submitted | Owner/submitting authorized user | Required submission fields; exact required fields **DECISION REQUIRED** | Submitted | Actor, property, submission time, provenance | Validate ownership/input; persist server time and event |
| Submitted → Pending Verification | System workflow | Submission accepted for review | Pending Verification | Submission ID, actor/system, timestamp | Transactional state transition; prevent duplicate submission |
| Pending Verification → Under Review | Authorized reviewer/work queue | Case assigned; verification requirements **DECISION REQUIRED** | Under Review | Reviewer/queue, evidence references, timestamp | Check reviewer authorization/separation; immutable event |
| Under Review → Approved | Authorized human reviewer; decision authority **DECISION REQUIRED** | Required evidence complete under approved policy | Approved | Reviewer, decision, reasons, evidence references | Enforce reviewer scope, evidence policy and transition rules |
| Under Review → Rejected | Authorized human reviewer; decision authority **DECISION REQUIRED** | Evidence/policy grounds; exact criteria **DECISION REQUIRED** | Rejected | Reviewer, reason, evidence references | Enforce reason/evidence and appeal pathway |
| Approved → Published | Authorized publication service/user; actor policy **DECISION REQUIRED** | Approval exists and publication prerequisites are met | Published | Approval reference, publisher, timestamp | Recheck approved status; enforce idempotent publish |
| Published → Active | System or authorized publisher; exact trigger **DECISION REQUIRED** | Listing is eligible and visible | Active | Trigger/actor and timestamp | Enforce publication/status policy |
| Active → Expired | Scheduled server process | Expiry configured by policy; expiry duration **DECISION REQUIRED** | Expired | Server time, prior status, expiry rule | Server-side expiry, retry-safe scheduler |
| Published/Active → Suspended | Authorized human; emergency authority **DECISION REQUIRED** | Reason and policy basis; notice/appeal **DECISION REQUIRED** | Suspended | Actor, reason, evidence, scope, timestamp | Role/resource authorization and reversible suspension |
| Expired/Suspended → Archived | Authorized owner/admin; criteria **DECISION REQUIRED** | Retention/appeal/ownership criteria **DECISION REQUIRED** | Archived | Actor, reason, prior state, timestamp | Enforce archive permissions and retention; preserve history |
| Rejected/Suspended/Archived → earlier state | **DECISION REQUIRED** | Appeal/re-review/reinstatement rules **DECISION REQUIRED** | **DECISION REQUIRED** | Record appeal, reviewer and resolution | No restore/republication until policy is approved |

**CANONICAL data rule:** real listings carry provenance and verification state; samples carry `DEMO` or `SAMPLE`; no qualifying verified results display “No verified property available.”

## Lead

**States:** Captured → Qualified → Routed → Assigned → Active → Locked → Converted → Closed/Expired/Cancelled/Disputed → Reopened/Reassigned where applicable.

| Transition | Allowed actor | Prerequisite | Result | Audit requirement | Future backend enforcement |
|---|---|---|---|---|---|
| New intent → Captured | User or authorized channel | Consent/source handling **DECISION REQUIRED** | Captured | Source, actor, consent reference, server time | Validate input/consent; deduplicate per approved policy |
| Captured → Qualified | Authorized workflow; qualification criteria **DECISION REQUIRED** | Required lead information **DECISION REQUIRED** | Qualified or needs-information status **DECISION REQUIRED** | Evidence/criteria version, actor/system, timestamp | Apply versioned approved rules; no invented facts |
| Qualified → Routed | Authorized routing service | Role/location/eligibility/capacity rules approved (**DECISION REQUIRED**) | Routed | Candidate/route reason, rule version, timestamp | Server-side rule and access checks |
| Routed → Assigned | Authorized routing service/dispatcher | Eligible target and assignment permitted | Assigned | Assignee, assigner, reason, timestamp | Atomic assignment and notification event |
| Assigned → Active | Assigned authorized agent/participant | Contact/activity definition **DECISION REQUIRED** | Active | Actor, activity reference, timestamp | Verify assignment and permitted action |
| Active → Locked | Eligible assigned agent | Active agent lead opportunity; no other active lock; 48-hour duration | Locked | Lock actor, lead, server start/expiry, event | Atomic exclusive lock; server timestamps and expiry |
| Active/Locked → Converted | Authorized actor; conversion criteria **DECISION REQUIRED** | Deal creation prerequisites **DECISION REQUIRED** | Converted and linked deal | Actor, linked deal, prior lead/lock history | Transactionally link lead/deal; preserve lock/owner history |
| Any eligible state → Closed/Expired/Cancelled/Disputed | Actor and criteria **DECISION REQUIRED** | Reason/evidence and transition grounds **DECISION REQUIRED** | Selected terminal/hold state | Actor, reason, evidence, time | Enforce transition matrix; dispute freeze policy **DECISION REQUIRED** |
| Closed/Expired/Cancelled → Reopened | Authorized human/process **DECISION REQUIRED** | Reopen criteria/timing **DECISION REQUIRED** | Reopened | Decision actor/reason, prior owners, timestamp | Reopen only under approved policy |
| Reopened → Reassigned | Authorized routing/dispatcher | Deterministic eligibility and prior-locker exclusion policy | Reassigned | Old/new assignee, reason, exclusion check, timestamp | Server-side exclusion and audit |

**CANONICAL reopening constraint:** an excluded previous locking agent must not automatically regain the reopened lead. Exclusion duration and exact policy remain **DECISION REQUIRED**.

## Lead Lock

**States:** Available → Active 48h → Released/Expired → Reopened/Reassigned.

| Transition | Allowed actor | Prerequisite | Result | Audit requirement | Future backend enforcement |
|---|---|---|---|---|---|
| Available → Active | Eligible assigned agent | Active lead opportunity; no concurrent active lock | Active, expiring 48 hours from authoritative server start | Agent, lead, server start/expiry, eligibility result | Atomic unique active lock; server time and TTL/expiry job |
| Active → Released | Lock holder or authorized human; admin release scope **DECISION REQUIRED** | Release grounds **DECISION REQUIRED** | Released | Actor, reason, time, lock record | Verify actor/authority; do not delete lock history |
| Active → Expired | Server process | Server time reaches 48-hour expiry | Expired | Server expiry time and prior lock | Server-enforced transition; retry-safe |
| Released/Expired → Reopened | Authorized lead workflow | Lead reopen policy **DECISION REQUIRED** | Reopened, lock unavailable | Trigger, prior holder, time | Recompute eligibility and retain previous holder history |
| Reopened → Reassigned | Authorized routing process/human | Apply deterministic exclusion; excluded former locker cannot automatically regain lead | Reassigned to eligible target | Old/new owner, rule version, exclusion result | Enforce approved exclusion before commit |

**CANONICAL:** property remains public and displays `LEAD LOCK ACTIVE`; existing viewers/favorites may view.  
**DECISION REQUIRED:** fee/payment prerequisite, extension, eligible-agent evidence beyond stated rule, notice timing and reopen timing.

## Deal

**States:** Opportunity → Participants → Visit/Negotiation → Offer → Agreement/Documents → Payment/Milestones → Completion → Settlement → Closed/Archived.

| Transition | Allowed actor | Prerequisite | Result | Audit requirement | Future backend enforcement |
|---|---|---|---|---|---|
| Opportunity → Participants | Authorized deal creator; eligible role **DECISION REQUIRED** | Valid lead/property/deal basis **DECISION REQUIRED** | Participants recorded | Creator, source, participant IDs/roles, timestamp | Validate source and access; preserve participant history |
| Participants → Visit/Negotiation | Authorized participant | Participation/consent requirements **DECISION REQUIRED** | Visit/Negotiation | Actor, participant, schedule/action and timestamp | Verify participant membership and permitted action |
| Visit/Negotiation → Offer | Authorized buyer/seller/representative; precise role policy **DECISION REQUIRED** | Offer terms and evidence **DECISION REQUIRED** | Offer recorded | Offer actor, terms/version, time | Validate authority; preserve offer/counteroffer history |
| Offer → Agreement/Documents | Authorized participants; acceptance/approval policy **DECISION REQUIRED** | Accepted terms and required documents **DECISION REQUIRED** | Agreement/Documents | Approvals, evidence references, versions, time | Enforce approval and document access policy |
| Agreement/Documents → Payment/Milestones | Authorized workflow/participants | Required agreement and payment plan **DECISION REQUIRED** | Payment/Milestones | Milestone plan, actor, references | Validate state and link verified payment events |
| Payment/Milestones → Completion | Authorized reviewer/participants; criteria **DECISION REQUIRED** | Required milestones and evidence **DECISION REQUIRED** | Completion review | Evidence, reviewer, decision, timestamp | Verify persisted evidence and permissions |
| Completion → Settlement | Authorized human/financial process; authority **DECISION REQUIRED** | Commission/payment policies approved and reconciled | Settlement | Calculation version, approvals, payment refs, timestamp | Transactional ledger and payment reconciliation |
| Settlement → Closed/Archived | Authorized workflow | Settlement outcome and closure criteria **DECISION REQUIRED** | Closed/Archived | Final state, actor/system, references, timestamp | Immutable history and retention rules |
| Any active state → Disputed/Cancelled/Expired | Actor and rules **DECISION REQUIRED** | Reason and evidence; exact trigger **DECISION REQUIRED** | Hold/terminal state | Actor, reason, evidence, timestamp | Enforce hold/no destructive edits; authorized resolution |

**CANONICAL:** preserve participants and milestones in audit history. Details of participant eligibility, offer authority and settlement conditions remain **DECISION REQUIRED**.

## Deal Lock

**States:** Available → Active 7 days → Extension → Maximum 15 days → Released/Expired.

| Transition | Allowed actor | Prerequisite | Result | Audit requirement | Future backend enforcement |
|---|---|---|---|---|---|
| Available → Active | Eligible participant role **DECISION REQUIRED** | Active transaction opportunity; role eligibility approved | Active for 7 days from server timestamp | Actor, deal, participants, start/expiry, reason | Atomic lock; server clock and eligibility check |
| Active → Extension | Authorized participant/approver **DECISION REQUIRED** | Extension policy, reason/evidence approved | Extend without exceeding 15 total days | Requester, approver, reason, old/new expiry, evidence | Server calculates cumulative duration and rejects >15 days |
| Active/Extended → Released | Lock holder or authorized human; authority **DECISION REQUIRED** | Release reason/policy **DECISION REQUIRED** | Released | Actor, reason, timestamp, participants | Authorization and immutable event |
| Active/Extended → Expired | Server process | Reaches approved server expiry; max 15-day cap | Expired | Server time, cumulative duration, lock history | Server-enforced expiration; retry-safe |

**CANONICAL:** initial 7 days, extension allowed, maximum total 15 days, preserve participants/milestones, audit extension decisions. Fee and payment prerequisite are **DECISION REQUIRED**.

## Payment

**States:** Created → Pending → Processing → Paid, Failed or Cancelled → Refunded where applicable.

| Transition | Allowed actor | Prerequisite | Result | Audit requirement | Future backend enforcement |
|---|---|---|---|---|---|
| Created → Pending | Authorized backend payment service | Approved amount/purpose and invoice policy; amount source rules **DECISION REQUIRED** | Pending | Owner, amount/currency, purpose, provider, idempotency key, timestamp | Server-calculated amount; persist idempotently |
| Pending → Processing | Provider initiation service | Provider request accepted/identified | Processing | Provider reference, request/correlation, timestamp | Server-only transition; retry-safe provider adapter |
| Processing → Paid | Verified provider webhook/server reviewer | Authentic callback and matched amount/reference; verification method **DECISION REQUIRED** | Paid | Raw event reference, verification outcome, actor/system, timestamp | Verify signature, replay/idempotency, amount and record association server-side |
| Processing → Failed/Cancelled | Verified provider outcome or authorized operator | Valid failure/cancel evidence | Failed/Cancelled | Provider event/reason, actor/system, timestamp | Validate callback; maintain immutable event history |
| Paid → Refunded | Authorized financial reviewer/process; authority **DECISION REQUIRED** | Refund policy, reason, amount and provider outcome **DECISION REQUIRED** | Refunded/partially refunded state **DECISION REQUIRED** | Reviewer, reason, original payment, refund reference/time | Server-side provider reconciliation and ledger linkage |

**CANONICAL:** client-controlled status is never payment proof. Provider labels in the repository do not establish live payment capability.

## Subscription

**States:** Pending → Active → Grace/Suspended → Cancelled/Expired.

| Transition | Allowed actor | Prerequisite | Result | Audit requirement | Future backend enforcement |
|---|---|---|---|---|---|
| Created → Pending | Authorized billing service | Approved plan and role eligibility; eligibility **DECISION REQUIRED** | Pending | Owner, plan, price version, billing cycle, timestamp | Server-side plan catalog and immutable price snapshot |
| Pending → Active | Authorized billing service | Verified successful payment | Active entitlement | Payment reference, plan/version, activation time | Transactional payment/entitlement update |
| Active → Grace | Scheduled billing service | Renewal failure and approved grace policy; duration **DECISION REQUIRED** | Grace | Renewal event, payment evidence, start/end | Server schedule and approved limited entitlement |
| Grace → Suspended | Scheduled service/authorized human | Grace policy expires or approved suspension reason | Suspended | Actor/system, reason, time | Enforce entitlement removal; preserve financial history |
| Active/Grace → Cancelled | Account owner or authorized billing actor | Cancellation policy **DECISION REQUIRED** | Cancelled; effective date **DECISION REQUIRED** | Actor, request/effective times, reason if required | Verify ownership and stop future renewal as approved |
| Active/Grace/Suspended → Expired | Scheduled billing service | Approved term ends; renewal policy **DECISION REQUIRED** | Expired | Server time, term/plan reference | Server-side expiry and entitlement recalculation |
| Paid/Active → Refunded | Authorized financial reviewer/process | Refund and entitlement policy **DECISION REQUIRED** | Refund/subscription result **DECISION REQUIRED** | Reviewer, reason, payment and entitlement references | Reconcile provider and entitlement state transactionally |

**CANONICAL prices:** Starter PKR 1,000/month; Professional PKR 5,000/month; Enterprise PKR 25,000/month.  
**DECISION REQUIRED:** eligibility, features/quotas, grace/refund behavior and exact entitlement timing.

## Verification

**States:** Draft → Submitted → Pending Review → Under Review → Approved/Rejected → Appeal/Re-review where applicable.

| Transition | Allowed actor | Prerequisite | Result | Audit requirement | Future backend enforcement |
|---|---|---|---|---|---|
| Draft → Submitted | Subject/authorized submitter | Required evidence for subject type; requirements **DECISION REQUIRED** | Submitted | Submitter, evidence refs, subject, timestamp | Validate subject ownership and accepted file/evidence type |
| Submitted → Pending Review | Verification service | Submission is complete under approved checklist | Pending Review | Queue, checklist version, timestamp | Persist assignment/queue and prevent lost submissions |
| Pending Review → Under Review | Authorized reviewer | Reviewer scope and separation policy approved | Under Review | Reviewer, assignment, access event, timestamp | Check role/scope and reviewer conflict |
| Under Review → Approved | Authorized human reviewer | Required evidence checked; decision criteria **DECISION REQUIRED** | Approved | Reviewer, reason, evidence refs, policy version, time | Enforce decision authority and complete evidence |
| Under Review → Rejected | Authorized human reviewer | Grounds and notice/appeal policy **DECISION REQUIRED** | Rejected | Reviewer, reason, evidence refs, time | Enforce decision authority; retain appeal rights |
| Rejected/Approved → Appeal/Re-review | Subject or authorized reviewer; policy **DECISION REQUIRED** | Appeal window, reason and evidence **DECISION REQUIRED** | Appeal/Re-review | Requester, evidence, reviewer, timestamp | Enforce appeal access and independent review where approved |
| Appeal/Re-review → Approved/Rejected | Authorized human reviewer | Review complete under approved policy | Final/current decision | Reviewer, decision, reason, superseded decision reference | Preserve prior decision; append new decision |

**CANONICAL:** AI may assist but must not invent verification, legal status or evidence. Review requirements and authority remain **DECISION REQUIRED**.

