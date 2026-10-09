# PHASE 9 DEPENDENCY CHECKLIST

This checklist identifies exact requirements missing from the workspace that prevent real verification of AUTH, DATABASE, STORAGE, SEARCH, and PAYMENTS.

No readiness percentage is provided. No requirement is marked complete unless it exists in the workspace and can be used for a real verification run.

## Current Workspace Finding

Only [.env.example](.env.example) exists. No runtime `.env` file with real credentials or provider endpoints was found.

## 1. Real Credentials Required

### Supabase

Required for AUTH, DATABASE, STORAGE, and SEARCH:

- Supabase project URL.
- Supabase anon/public key.
- Server-side Supabase service-role key for migrations, administration, and protected server operations.
- Supabase Auth email configuration if email confirmation or password-reset delivery is tested.
- Supabase Auth redirect URL matching the deployed application URL.

The frontend currently reads `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in [src/services/supabaseClient.ts](src/services/supabaseClient.ts).

The example file also names `VITE_SUPABASE_SERVICE_ROLE_KEY`, but a service-role key must not be exposed to the browser through a `VITE_` variable. It must be supplied only to a server-side migration or API process.

### Google OAuth

Not required for the implemented email/password AUTH path. Required only if Google OAuth is to be verified:

- Google OAuth client ID.
- Google OAuth client secret.
- Google OAuth redirect URI registered in Google and Supabase.

The names currently present in [.env.example](.env.example) are `VITE_GOOGLE_CLIENT_ID`, `VITE_GOOGLE_CLIENT_SECRET`, and `VITE_GOOGLE_REDIRECT_URI`.

### Payment providers

Required for JazzCash Sandbox and Easypaisa Sandbox:

- JazzCash sandbox merchant/account credentials issued by JazzCash.
- Easypaisa sandbox merchant/account credentials issued by Easypaisa.
- Provider-specific signing, authentication, or encryption material supplied to the server-side payment adapter.
- Provider sandbox callback/webhook registration.
- A server-side callback verification service that validates provider signatures and returns the normalized callback result expected by [src/services/paymentService.ts](src/services/paymentService.ts).

The current frontend adapter does not define merchant ID, password, integrity salt, API key, or provider-specific signature variables. Endpoint URLs alone are insufficient to authenticate real provider requests.

## 2. Environment Variables Missing

The following runtime values are absent because no `.env` file exists:

### Required for Supabase-backed AUTH, DATABASE, STORAGE, SEARCH

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### Required server-side, not as browser-exposed `VITE_` variables

- Supabase service-role key for schema/migration and privileged server operations.
- Supabase Auth email provider credentials if confirmation or reset delivery is enabled.
- Payment provider merchant credentials and signing secrets.

### Required for payment sandbox request routing

The example names these variables, but real values are missing:

- `VITE_PAYMENT_PROVIDER`
- `VITE_PAYMENT_CALLBACK_URL`
- `VITE_PAYMENT_CALLBACK_API_URL`
- `VITE_JAZZCASH_SANDBOX_URL`
- `VITE_EASYPAISA_SANDBOX_URL`

`VITE_PAYMENT_CALLBACK_API_URL` must point to an implemented server endpoint. No `src/**/api/**` implementation exists in this workspace.

### Optional AUTH variables that remain placeholders

These are not required for email/password Supabase Auth, but are incomplete for the related features:

- `VITE_GOOGLE_CLIENT_ID`
- `VITE_GOOGLE_CLIENT_SECRET`
- `VITE_GOOGLE_REDIRECT_URI`
- `VITE_EMAIL_PROVIDER`
- `VITE_EMAIL_FROM`

## 3. Supabase Tables Expected

The current repository layer expects these tables because table names are derived from repository storage keys:

- `users`
- `properties`
- `leads`
- `deals`
- `messages`
- `notifications`
- `payments`
- `subscriptions`
- `invoices`

The production SQL additionally defines these platform tables:

- `verifications`
- `ai_conversations`
- `deal_commissions`
- `admin_audit_log`

Relevant schema sources:

- [src/services/productionSql.ts](src/services/productionSql.ts)
- [src/services/databaseMigrations/users.sql](src/services/databaseMigrations/users.sql)
- [src/services/databaseMigrations/properties.sql](src/services/databaseMigrations/properties.sql)
- [src/services/databaseMigrations/leads.sql](src/services/databaseMigrations/leads.sql)
- [src/services/databaseMigrations/deals.sql](src/services/databaseMigrations/deals.sql)
- [src/services/databaseMigrations/messages.sql](src/services/databaseMigrations/messages.sql)
- [src/services/databaseMigrations/notifications.sql](src/services/databaseMigrations/notifications.sql)
- [src/services/databaseMigrations/payments.sql](src/services/databaseMigrations/payments.sql)
- [src/services/databaseMigrations/subscriptions.sql](src/services/databaseMigrations/subscriptions.sql)
- [src/services/databaseMigrations/invoices.sql](src/services/databaseMigrations/invoices.sql)

### Schema requirements currently missing or inconsistent

These must be resolved before verification can be meaningful:

- `properties` must contain the fields used by real search: `city`, `area`, `phase`, `property_type`, size/area-size, bedrooms, price, purpose, status, and an image or cover-image field.
- [src/services/databaseMigrations/properties.sql](src/services/databaseMigrations/properties.sql) currently defines no `area_size`, `bedrooms`, or `purpose` columns.
- The search mapper also reads image and gallery values, but the migration only defines no image fields; [src/services/productionSql.ts](src/services/productionSql.ts) uses `cover_image_url` and `gallery_urls` while the migration file does not.
- `payments` must contain the fields written by [src/services/paymentService.ts](src/services/paymentService.ts): `currency`, `provider`, `event_type`, `reference`, `subscription_id`, and `audit_id`, in addition to ID, owner, amount, status, and timestamps. The current `payments.sql` does not define `event_type`, `reference`, or `subscription_id`.
- `invoices` must be migrated before invoice generation is tested. Its migration exists, but it must be executed and permissioned.
- Supabase Row Level Security policies and grants must allow the authenticated operations being tested. No policy migration was found in the workspace.
- UUID values used for `id`, `owner_id`, and related foreign keys must match the schema. Existing seed files contain owner IDs that are not consistently valid UUIDs.

## 4. Storage Buckets Expected

The exact buckets declared by [src/services/productionSql.ts](src/services/productionSql.ts) and used by [src/services/storageProvider.ts](src/services/storageProvider.ts) are:

- `property-images`
- `verification-documents`
- `avatars`

Each bucket still requires:

- Creation in the Supabase project.
- Upload policy.
- Read or signed-download policy.
- Delete policy.
- Authenticated-user ownership rules.
- Test files for upload, retrieve/download, and delete verification.

No storage bucket migration or storage policy file exists in the workspace. The bucket list in TypeScript does not provision the buckets.

## 5. Payment Credentials and Services Expected

### JazzCash Sandbox

Required before testing:

- JazzCash sandbox merchant/account identity.
- JazzCash sandbox authentication credentials.
- JazzCash sandbox signing/integrity credential.
- JazzCash sandbox API endpoint.
- Registered callback URL.
- Server-side callback signature verification implementation.

Current code only names `VITE_JAZZCASH_SANDBOX_URL`; it does not define or consume JazzCash merchant or signing credentials.

### Easypaisa Sandbox

Required before testing:

- Easypaisa sandbox merchant/account identity.
- Easypaisa sandbox authentication credentials.
- Easypaisa sandbox signing/integrity credential.
- Easypaisa sandbox API endpoint.
- Registered callback URL.
- Server-side callback signature verification implementation.

Current code only names `VITE_EASYPAISA_SANDBOX_URL`; it does not define or consume Easypaisa merchant or signing credentials.

### Shared payment callback service

Required before callback, invoice, and subscription activation can be tested:

- Implemented server endpoint at the value of `VITE_PAYMENT_CALLBACK_API_URL`.
- Provider-specific signature verification on that server.
- Normalized response containing `providerReference` and `status`.
- Persistent payment lookup by provider reference.
- Callback idempotency protection.
- Invoice update handling.
- Subscription activation handling.

No server/API route implementation exists in the current workspace.

## 6. Configuration Files That Must Be Completed

### Must be created or completed

- `.env`: real Supabase URL and anon key, plus configured payment routing values.
- Server-only environment configuration: service-role key, payment merchant credentials, payment signing secrets, and email provider secrets.
- Supabase SQL execution: run the required table migrations from [src/services/databaseMigrations](src/services/databaseMigrations) or an equivalent corrected migration.
- Supabase RLS policies and grants for authenticated reads/writes and owner-scoped mutations.
- Supabase Storage bucket provisioning and policies for the three required buckets.
- Server-side payment callback API implementation referenced by `VITE_PAYMENT_CALLBACK_API_URL`.

### Must be corrected before verification

- Align `properties` migration columns with the search fields and the mapper used in [src/data/inventoryManager.ts](src/data/inventoryManager.ts).
- Align `payments` migration columns with the fields written by [src/services/paymentService.ts](src/services/paymentService.ts).
- Resolve the unsafe `VITE_SUPABASE_SERVICE_ROLE_KEY` naming/use by moving that credential to a server-only environment.
- Replace placeholder endpoint values in [.env.example](.env.example) with actual sandbox endpoint configuration in the runtime environment.
- Provide real persisted property records containing values for city, area, phase, property type, size, bedrooms, budget/price, purpose, status, and media fields.

## Verification Gate

AUTH, DATABASE, STORAGE, SEARCH, and PAYMENTS cannot be tested against real services until the exact credentials, runtime environment, schema/policies, buckets, persisted records, and server-side callback service listed above are present.
