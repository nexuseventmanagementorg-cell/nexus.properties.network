import type { PlatformRole } from './platformStore';

export const DEFAULT_SIGNUP_ROLE: PlatformRole = 'Buyer';

const roles: PlatformRole[] = [
  'Buyer', 'Seller', 'Agent', 'Agency', 'Developer', 'Investor',
  'Industrial', 'Corporate', 'Government', 'AI Admin', 'Super Admin',
];

export const signupMetadata = (fullName: string) => ({
  full_name: fullName || 'Nexus User',
});

export const roleFromTrustedProfile = (role: unknown): PlatformRole =>
  typeof role === 'string' && roles.includes(role as PlatformRole)
    ? role as PlatformRole
    : DEFAULT_SIGNUP_ROLE;

export const resolveCurrentUser = <T>(
  supabaseConfigured: boolean,
  trustedUser: T | null,
  readLocalUser: () => T | null,
): T | null => supabaseConfigured ? trustedUser : readLocalUser();

export const hydrateTrustedProfile = async <T>(
  loadProfile: () => Promise<T | null>,
  persistProfile: (profile: T) => void,
  clearProfile: () => void,
): Promise<T | null> => {
  try {
    const profile = await loadProfile();
    if (!profile) {
      clearProfile();
      return null;
    }
    persistProfile(profile);
    return profile;
  } catch (error) {
    clearProfile();
    throw error;
  }
};
