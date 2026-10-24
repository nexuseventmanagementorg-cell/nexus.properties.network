import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import {
  hydrateTrustedProfile,
  resolveCurrentUser,
  signupMetadata,
  DEFAULT_SIGNUP_ROLE,
  roleFromTrustedProfile,
} from '../src/services/authRole';
import { assertUuid, createUuid, isUuid } from '../src/services/uuid';

const migration = readFileSync(
  new URL('../src/services/databaseMigrations/0001_supabase_foundation.sql', import.meta.url),
  'utf8',
);
const authService = readFileSync(
  new URL('../src/services/authService.ts', import.meta.url),
  'utf8',
);
const baseRepository = readFileSync(
  new URL('../src/database/repositories/BaseRepository.ts', import.meta.url),
  'utf8',
);
const propertyRepository = readFileSync(
  new URL('../src/database/repositories/PropertyRepository.ts', import.meta.url),
  'utf8',
);
const userRepository = readFileSync(
  new URL('../src/database/repositories/UserRepository.ts', import.meta.url),
  'utf8',
);
const messageRepository = readFileSync(
  new URL('../src/database/repositories/MessageRepository.ts', import.meta.url),
  'utf8',
);
const notificationRepository = readFileSync(
  new URL('../src/database/repositories/NotificationRepository.ts', import.meta.url),
  'utf8',
);
const paymentRepository = readFileSync(
  new URL('../src/database/repositories/PaymentRepository.ts', import.meta.url),
  'utf8',
);

test('UUID helper generates UUID identifiers and rejects prefixed identifiers', () => {
  const id = createUuid();
  assert.match(id, /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
  assert.equal(isUuid(id), true);
  assert.equal(isUuid('LIVE-123'), false);
  assert.equal(isUuid('LEAD-123'), false);
  assert.equal(isUuid('PAY-123'), false);
  assert.throws(() => assertUuid('LIVE-123', 'id'), /id must be a UUID/);
  assert.doesNotThrow(() => assertUuid(id, 'id'));
});

test('signup metadata cannot assign a role and trusted profile role is authoritative', () => {
  assert.deepEqual(signupMetadata('Nexus User'), { full_name: 'Nexus User' });
  assert.equal(DEFAULT_SIGNUP_ROLE, 'Buyer');
  assert.equal(roleFromTrustedProfile(undefined), 'Buyer');
  assert.equal(roleFromTrustedProfile('AI Admin'), 'AI Admin');
  assert.match(authService, /\.from\('users'\)[\s\S]*\.select\('id, full_name, email, role, status/);
  assert.doesNotMatch(authService, /user_metadata\??\.role/);
  assert.match(authService, /auth\.getUser\(token\)/);
  assert.match(authService, /roleFromTrustedProfile\(profile\.role\)/);
});

test('Supabase mode does not trust a cached privileged role before profile hydration', () => {
  const cachedAdmin = { id: 'cached-admin', role: 'AI Admin' };
  assert.equal(resolveCurrentUser(true, null, () => cachedAdmin), null);
  assert.equal(resolveCurrentUser(true, cachedAdmin, () => null), cachedAdmin);
  assert.equal(resolveCurrentUser(false, null, () => cachedAdmin), cachedAdmin);
});

test('profile hydration clears stale state when the profile is missing or fails to load', async () => {
  let persisted: string | null = 'stale-admin';
  const clear = () => { persisted = null; };
  const persist = (profile: { id: string }) => { persisted = profile.id; };

  assert.equal(await hydrateTrustedProfile(async () => null, persist, clear), null);
  assert.equal(persisted, null);

  await assert.rejects(
    hydrateTrustedProfile(async () => { throw new Error('profile unavailable'); }, persist, clear),
    /profile unavailable/,
  );
  assert.equal(persisted, null);
});

test('foundation migration links profiles to Auth and fixes signup role to the ordinary default', () => {
  assert.match(migration, /id UUID PRIMARY KEY REFERENCES auth\.users \(id\)/i);
  assert.match(migration, /status TEXT NOT NULL DEFAULT 'pending_verification'[\s\S]*CHECK \(status IN \('pending_verification', 'active', 'suspended'\)\)/);
  assert.match(migration, /SET search_path = ''/i);
  assert.match(migration, /REVOKE ALL ON FUNCTION public\.handle_new_auth_user\(\) FROM PUBLIC, anon, authenticated/i);
  assert.match(migration, /NEW\.raw_user_meta_data ->> 'full_name'/);
  assert.doesNotMatch(migration, /raw_user_meta_data\s*->>\s*'role'/i);
  assert.match(migration, /INSERT INTO public\.users \(id, full_name, email, role, status\)[\s\S]*?NEW\.id,[\s\S]*?NEW\.email,[\s\S]*?'Buyer',[\s\S]*?NEW\.email_confirmed_at/);
  assert.match(migration, /AFTER UPDATE OF email_confirmed_at ON auth\.users/);
  assert.match(migration, /REVOKE ALL ON FUNCTION public\.sync_auth_user_verification\(\) FROM PUBLIC, anon, authenticated/i);
});

test('suspended profiles stay suspended when email confirmation changes', () => {
  assert.match(migration, /UPDATE public\.users AS profile\s+SET status = CASE\s+WHEN profile\.status = 'suspended' THEN 'suspended'\s+WHEN NEW\.email_confirmed_at IS NOT NULL THEN 'active'/);
});

test('suspended profiles stay suspended on subsequent Auth updates', () => {
  assert.match(migration, /WHEN profile\.status = 'suspended' THEN 'suspended'[\s\S]*?WHEN NEW\.email_confirmed_at IS NOT NULL THEN 'active'[\s\S]*?ELSE 'pending_verification'/);
  assert.match(migration, /WHERE profile\.id = NEW\.id/);
});

test('pending profiles activate only after Auth email confirmation', () => {
  assert.match(migration, /WHEN profile\.status = 'suspended' THEN 'suspended'\s+WHEN NEW\.email_confirmed_at IS NOT NULL THEN 'active'\s+ELSE 'pending_verification'/);
});

test('foundation schema contains the required property model fields and UUID relationships', () => {
  for (const column of [
    'id UUID PRIMARY KEY',
    'owner_id UUID NOT NULL REFERENCES public.users',
    'property_type TEXT NOT NULL',
    'city TEXT NOT NULL',
    'area TEXT NOT NULL',
    'phase TEXT NOT NULL',
    'price TEXT NOT NULL',
    'price_raw NUMERIC NOT NULL',
    'area_size TEXT NOT NULL',
    'property_status TEXT NOT NULL',
    'purpose TEXT NOT NULL',
    'description TEXT NOT NULL',
    'image TEXT NOT NULL',
    'gallery_images TEXT[]',
    'features TEXT[]',
    'agent TEXT NOT NULL',
    'verification_status TEXT NOT NULL',
  ]) assert.ok(migration.includes(column), `missing SQL contract: ${column}`);

  assert.match(migration, /city_id UUID NOT NULL REFERENCES public\.cities \(id\)/);
  assert.match(migration, /FOREIGN KEY \(city_id, area_id\) REFERENCES public\.areas \(city_id, id\)/);
  assert.doesNotMatch(migration, /\bproperty_id\b/);
  assert.match(propertyRepository, /propertyId: property\.id/);
  assert.match(propertyRepository, /input\.propertyId !== input\.id/);
  assert.match(propertyRepository, /const \{ propertyId: _propertyId, \.\.\.databaseValues \}/);
});

test('anonymous access is not granted and properties have no public-read policy', () => {
  assert.match(migration, /REVOKE ALL ON TABLE[\s\S]*FROM PUBLIC, anon, authenticated/);
  assert.match(migration, /REVOKE ALL ON SCHEMA public FROM PUBLIC, anon, authenticated/);
  assert.match(migration, /GRANT USAGE ON SCHEMA public TO anon, authenticated/);
  assert.doesNotMatch(migration, /GRANT (?!USAGE ON SCHEMA)[^;]* TO anon/i);
  assert.doesNotMatch(migration, /CREATE POLICY [^;]*TO anon/i);
  assert.match(migration, /CREATE POLICY properties_read_own[\s\S]*TO authenticated[\s\S]*owner_id = \(SELECT auth\.uid\(\)\)/);
  assert.doesNotMatch(migration, /CREATE POLICY properties_public/i);
});

test('role and verification fields are not client-updatable on profiles or properties', () => {
  assert.match(migration, /GRANT UPDATE \(full_name, updated_at\) ON TABLE public\.users TO authenticated/i);
  assert.doesNotMatch(migration, /GRANT UPDATE \([^)]*\brole\b[^)]*\) ON TABLE public\.users/i);
  assert.doesNotMatch(migration, /GRANT UPDATE \([^)]*\bverification_status\b[^)]*\) ON TABLE public\.properties/i);
  assert.match(migration, /properties_insert_own[\s\S]*verification_status = 'PENDING REVIEW'/);
});

test('repository UUID boundaries reject invalid IDs before Supabase filters or mutations', () => {
  assert.match(baseRepository, /findById\(id: string\): Promise<T \| undefined> \{[\s\S]*?assertUuid\(id, 'id'\);[\s\S]*?\.eq\('id', id\)/);
  assert.match(baseRepository, /findByOwner\(ownerId: string\): Promise<T\[]> \{[\s\S]*?assertUuid\(ownerId, 'ownerId'\);[\s\S]*?\.eq\('owner_id', ownerId\)/);
  assert.match(baseRepository, /if \(isSupabaseConfigured\) \{\s*assertUuid\(id, 'id'\);[\s\S]*?\.insert\(/);
  assert.match(baseRepository, /async update\(id: string, patch: Partial<T>\): Promise<T \| undefined> \{\s*if \(isSupabaseConfigured\) \{\s*assertUuid\(id, 'id'\);[\s\S]*?validateUuidReferences\(patch/);
  assert.match(baseRepository, /async delete\(id: string\): Promise<void> \{\s*if \(isSupabaseConfigured\) \{\s*assertUuid\(id, 'id'\);[\s\S]*?\.delete\(\)\.eq\('id', id\)/);
  assert.match(userRepository, /findById\(id: string\): Promise<User \| undefined> \{\s*if \(isSupabaseConfigured\) \{\s*assertUuid\(id, 'id'\);[\s\S]*?\.eq\('id', id\)/);
  assert.match(messageRepository, /findByConversation\(conversationId: string\): Promise<Message\[]> \{\s*if \(isSupabaseConfigured\) \{\s*assertUuid\(conversationId, 'conversationId'\);[\s\S]*?\.eq\('conversation_id', conversationId\)/);
  assert.match(notificationRepository, /findUnread\(recipientId: string\): Promise<Notification\[]> \{\s*if \(isSupabaseConfigured\) \{\s*assertUuid\(recipientId, 'recipientId'\);[\s\S]*?\.eq\('recipient_id', recipientId\)/);
  assert.match(paymentRepository, /findByOwner\(ownerId: string\): Promise<Payment\[]> \{\s*if \(isSupabaseConfigured\) \{\s*assertUuid\(ownerId, 'ownerId'\);[\s\S]*?\.eq\('owner_id', ownerId\)/);
});
