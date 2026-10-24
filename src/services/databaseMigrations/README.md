# Database migrations

`0001_supabase_foundation.sql` is the proposed canonical, versioned starting migration for a new project. It is prepared for review only and has not been applied.

The ordered sections in the migration are: (1) Auth-linked profiles and fixed-default signup/verification triggers, (2) cities, (3) areas with a city FK, (4) private properties with UUID owner/catalog relationships, (5) indexes, and (6) grants and RLS policies. `properties.id` is the sole property UUID; the application-facing `propertyId` is mapped from that same value and is not a separate database column.

The pre-existing unnumbered SQL files are legacy drafts/seeds, not a migration sequence. Do not apply them alongside the versioned migration. In particular, they contain duplicate city seeds, invalid area/property owner IDs, and schemas that conflict with the application and with `productionSql.ts`.

No migration runner or applied-migration history was found in the repository. Do not run this SQL manually or against a live project until it is approved and a staging-only application/verification procedure is agreed. Seed data is intentionally excluded.

The first migration deliberately grants no `anon` access to any table and revokes existing `PUBLIC`, `anon`, and `authenticated` schema/table privileges before restoring only schema `USAGE` and the narrow table grants required by the application. City and area reads are restricted to authenticated users pending explicit approval for public catalog access. Property reads and writes are owner-scoped; no public property-read policy exists.

New profiles remain `pending_verification` until Supabase Auth sets `auth.users.email_confirmed_at`. A narrowly scoped Auth trigger mirrors that confirmation into the profile; property policies require an active profile, and application dashboard hydration also rejects missing, pending, or suspended profiles. Before staging validation, enable **Confirm email** under Supabase Auth's Email provider settings and verify that confirmation updates `email_confirmed_at` and the profile status in a disposable project. This relies on the standard Supabase Auth column and has not been tested against a project. A browser-side cached role is never authoritative in configured Supabase mode.

The `ON DELETE RESTRICT` relationships intentionally block deleting an Auth user while its profile exists and block deleting a profile while owned properties remain. This preserves records but means account deletion is unavailable without a separately approved retention/anonymization policy. No deletion policy is inferred or implemented here.

## Staging-only validation after separate approval

1. Create a disposable Supabase project distinct from production and confirm it contains no application tables or data.
2. Review the migration and owner decisions before applying it. Establish an explicit migration history/tooling process first; none currently exists in the repository.
3. Apply the numbered migration only to that disposable project. Do not apply the legacy SQL files or any seed file.
4. Check the catalog for the four tables, UUID types, FKs, indexes, enabled RLS, policies, and table/column grants.
5. Exercise signup with ordinary and forged privileged-role metadata; verify the created profile role remains `Buyer`, its status is pending until email confirmation, and profile reads return only the signed-in user's profile.
6. With anonymous credentials, verify all four tables deny reads/writes. With two authenticated users, verify each can see only their own profile/property records and cannot alter profile role/status or property verification status.
7. Test property inserts, updates, archival, and deletion with an email-confirmed active authenticated user, then repeat with an unverified/pending user, a suspended user, and a mismatched owner UUID; expect property operations to be denied for the latter cases.
8. Confirm the same operations fail from the anonymous client. Do not use SQL Editor success as evidence of RLS behavior; use PostgREST requests under the actual anon/authenticated roles.
9. Record results and any schema changes; do not promote the migration to production without separate approval.

This static package does not implement the server-side role-assignment workflow or its durable audit trail. Elevated-role assignment must remain unavailable until that trusted process is designed and reviewed.
