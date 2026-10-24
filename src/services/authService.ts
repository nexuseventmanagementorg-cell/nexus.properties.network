import type { PlatformRole } from './platformStore';
import { routeForRole } from '../routing/appRoutes';
import type { UserRecord } from './models';
import { recordAudit } from './auditService';
import { supabaseClient, isSupabaseConfigured } from './supabaseClient';
import { hydrateTrustedProfile, resolveCurrentUser, roleFromTrustedProfile, signupMetadata } from './authRole';
import { assertUuid } from './uuid';

const SESSION_KEY = '__nexus_session__';
export const authStateChangedEvent = 'nexus-auth-state-changed';
let trustedCurrentUser: UserRecord | null = null;

const ensureProductionAuth = () => {
  if (!isSupabaseConfigured) {
    throw new Error('Production auth requires VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
  }
};

const toUserRecord = (user: any, profile: Record<string, unknown>, fallbackEmail?: string): UserRecord | null => {
  if (!user?.id) return null;
  const role = roleFromTrustedProfile(profile.role);
  const fullName = String(profile.full_name || user?.user_metadata?.full_name || 'Nexus User');
  const email = String(profile.email || user?.email || fallbackEmail || '');

  return {
    id: user.id,
    fullName,
    email,
    role,
    password: '',
    createdAt: String(profile.created_at || user.created_at || new Date().toISOString()),
    updatedAt: String(profile.updated_at || new Date().toISOString()),
    lastLogin: new Date().toISOString(),
    status: profile.status === 'active' || profile.status === 'suspended'
      ? profile.status
      : 'pending_verification',
  };
};

const loadUserProfile = async (user: any, fallbackEmail?: string): Promise<UserRecord | null> => {
  if (!user?.id) return null;
  assertUuid(user.id, 'auth.user.id');
  const { data, error } = await supabaseClient
    .from('users')
    .select('id, full_name, email, role, status, created_at, updated_at')
    .eq('id', user.id)
    .single();
  if (error) throw new Error(`Could not load the trusted user profile: ${error.message}`);
  if (!data) throw new Error('Could not load the trusted user profile: no profile row was returned.');
  return toUserRecord(user, data as Record<string, unknown>, fallbackEmail);
};

const persistSession = (user: UserRecord | null) => {
  trustedCurrentUser = user;
  if (typeof window === 'undefined') return;
  if (!user) {
    window.localStorage.removeItem(SESSION_KEY);
  } else {
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  }
  window.dispatchEvent(new Event(authStateChangedEvent));
};

export const getCurrentUser = (): UserRecord | null => {
  return resolveCurrentUser(isSupabaseConfigured, trustedCurrentUser, () => {
    if (typeof window === 'undefined') return null;
    const stored = window.localStorage.getItem(SESSION_KEY);
    if (!stored) return null;
    try {
      const parsed = JSON.parse(stored) as UserRecord;
      return parsed?.id && parsed?.email ? parsed : null;
    } catch {
      return null;
    }
  });
};

export const hydrateSession = async (): Promise<UserRecord | null> => {
  ensureProductionAuth();
  return hydrateTrustedProfile(async () => {
    const { data: { session }, error } = await supabaseClient.auth.getSession();
    if (error) throw new Error(`Could not restore the Supabase Auth session: ${error.message}`);
    if (!session?.user) return null;
    const user = await loadUserProfile(session.user, session.user.email || undefined);
    return user?.status === 'active' ? user : null;
  }, persistSession, () => persistSession(null));
};

const requireActiveProfile = (user: UserRecord | null): UserRecord => {
  if (!user) throw new Error('The trusted user profile could not be loaded.');
  if (user.status === 'pending_verification') {
    throw new Error('Confirm your email before using your account.');
  }
  if (user.status === 'suspended') throw new Error('This account is suspended.');
  return user;
};

export const getDashboardRoute = (role: PlatformRole) => routeForRole(role);

export const registerUser = async (input: { fullName: string; email: string; password: string }) => {
  ensureProductionAuth();
  persistSession(null);
  const redirectUrl = typeof window !== 'undefined' ? `${window.location.origin}/auth/login` : undefined;
  const { data, error } = await supabaseClient.auth.signUp({
    email: input.email,
    password: input.password,
    options: {
      emailRedirectTo: redirectUrl,
      data: signupMetadata(input.fullName),
    },
  });

  if (error) throw new Error(error.message || 'Registration failed.');

  if (!data.session || !data.user) {
    persistSession(null);
    return { user: null, confirmationRequired: true };
  }

  const profile = await loadUserProfile(data.user, input.email);
  if (profile?.status === 'pending_verification') {
    persistSession(null);
    return { user: null, confirmationRequired: true };
  }
  const user = requireActiveProfile(profile);

  persistSession(user);
  recordAudit({ event: 'login', actorId: user.id, entityType: 'user', entityId: user.id, metadata: { method: 'registration', verified: true } });
  return { user, confirmationRequired: false };
};

export const loginUser = async (email: string, password: string) => {
  ensureProductionAuth();
  persistSession(null);
  const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
  if (error) throw new Error(error.message || 'No matching Nexus session was found.');

  const user = requireActiveProfile(await loadUserProfile(data.user, email));

  persistSession(user);
  recordAudit({ event: 'login', actorId: user.id, entityType: 'user', entityId: user.id, metadata: { method: 'password' } });
  return user;
};

export const logoutUser = async () => {
  const user = getCurrentUser();
  if (user) {
    recordAudit({ event: 'logout', actorId: user.id, entityType: 'user', entityId: user.id });
  }

  if (isSupabaseConfigured) {
    try {
      await supabaseClient.auth.signOut();
    } catch {
      // Ignore sign-out failures and clear local UI state.
    }
  }

  persistSession(null);
};

export const requestPasswordReset = async (email: string) => {
  ensureProductionAuth();
  const redirectUrl = typeof window !== 'undefined' ? `${window.location.origin}/auth/login` : undefined;
  const { error } = await supabaseClient.auth.resetPasswordForEmail(email, { redirectTo: redirectUrl });
  if (error) throw new Error(error.message || 'Password reset request failed.');
  return { email, requestedAt: new Date().toISOString(), status: 'prepared' as const };
};

export const validateSession = async (token?: string) => {
  if (!token) return null;
  ensureProductionAuth();
  const { data, error } = await supabaseClient.auth.getUser(token);
  if (error || !data.user) return null;
  const user = await loadUserProfile(data.user, data.user.email || undefined);
  return user?.status === 'active' ? { id: user.id, email: user.email, role: user.role } : null;
};

export const canAccessRole = (user: UserRecord | null, role: PlatformRole) => Boolean(
  user?.status === 'active'
  && (user.role === role || user.role === 'AI Admin' || user.role === 'Super Admin'),
);
