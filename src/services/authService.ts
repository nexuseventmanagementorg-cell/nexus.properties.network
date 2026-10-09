import type { PlatformRole } from './platformStore';
import { routeForRole } from '../routing/appRoutes';
import type { UserRecord } from './models';
import { recordAudit } from './auditService';
import { supabaseClient, isSupabaseConfigured } from './supabaseClient';

const SESSION_KEY = '__nexus_session__';
const ROLE_KEY = '__nexus_user_role__';

const roles: PlatformRole[] = ['Buyer', 'Seller', 'Agent', 'Agency', 'Developer', 'Investor', 'Industrial', 'Corporate', 'Government', 'AI Admin', 'Super Admin'];

const normalizeRole = (role: string): PlatformRole => roles.includes(role as PlatformRole) ? role as PlatformRole : 'Buyer';

const ensureProductionAuth = () => {
  if (!isSupabaseConfigured) {
    throw new Error('Production auth requires VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
  }
};

const toUserRecord = (user: any, fallbackEmail?: string): UserRecord | null => {
  if (!user?.id) return null;
  const role = normalizeRole(String(user?.role || user?.user_metadata?.role || 'Buyer'));
  const fullName = String(user?.full_name || user?.user_metadata?.full_name || user?.user_metadata?.fullName || 'Nexus User');
  const email = String(user?.email || fallbackEmail || '');

  return {
    id: user.id,
    fullName,
    email,
    role,
    password: '',
    createdAt: user.created_at || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
    status: 'active',
  };
};

const persistSession = (user: UserRecord | null) => {
  if (typeof window === 'undefined') return;
  if (!user) {
    window.localStorage.removeItem(SESSION_KEY);
    window.localStorage.removeItem(ROLE_KEY);
    return;
  }
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  window.localStorage.setItem(ROLE_KEY, user.role);
};

export const getCurrentUser = (): UserRecord | null => {
  if (typeof window === 'undefined') return null;
  const stored = window.localStorage.getItem(SESSION_KEY);
  if (!stored) return null;

  try {
    const parsed = JSON.parse(stored) as UserRecord;
    if (!parsed?.id || !parsed?.email) return null;
    return parsed;
  } catch {
    return null;
  }
};

export const hydrateSession = async (): Promise<UserRecord | null> => {
  ensureProductionAuth();
  const { data: { session }, error } = await supabaseClient.auth.getSession();
  if (error || !session?.user) {
    persistSession(null);
    return null;
  }

  const user = toUserRecord(session.user, session.user.email || undefined);
  if (!user) {
    persistSession(null);
    return null;
  }

  persistSession(user);
  return user;
};

export const getDashboardRoute = (role: PlatformRole) => routeForRole(role);

export const registerUser = async (input: { fullName: string; email: string; password: string; role: string }) => {
  ensureProductionAuth();
  const normalizedRole = normalizeRole(input.role);
  const redirectUrl = typeof window !== 'undefined' ? `${window.location.origin}/auth/login` : undefined;
  const { data, error } = await supabaseClient.auth.signUp({
    email: input.email,
    password: input.password,
    options: {
      emailRedirectTo: redirectUrl,
      data: {
        full_name: input.fullName || 'Nexus User',
        fullName: input.fullName || 'Nexus User',
        role: normalizedRole,
      },
    },
  });

  if (error) throw new Error(error.message || 'Registration failed.');

  const user = toUserRecord(data.user, input.email);
  if (!user) throw new Error('User registration did not return a valid profile.');

  persistSession(user);
  recordAudit({ event: 'login', actorId: user.id, entityType: 'user', entityId: user.id, metadata: { method: 'registration', verified: Boolean(data.session) } });
  return user;
};

export const loginUser = async (email: string, password: string) => {
  ensureProductionAuth();
  const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
  if (error) throw new Error(error.message || 'No matching Nexus session was found.');

  const user = toUserRecord(data.user, email);
  if (!user) throw new Error('Login did not return a valid session.');

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

export const validateSession = (token?: string) => {
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1] || '')) as { sub?: string; email?: string; role?: PlatformRole };
    return payload.sub ? { id: payload.sub, email: payload.email || '', role: payload.role || 'Buyer' } : null;
  } catch {
    return null;
  }
};

export const canAccessRole = (user: UserRecord | null, role: PlatformRole) => Boolean(user && (user.role === role || user.role === 'AI Admin' || user.role === 'Super Admin'));
