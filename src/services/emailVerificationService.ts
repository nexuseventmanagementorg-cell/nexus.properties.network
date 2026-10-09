export type VerificationTokenPurpose = 'email' | 'password-reset';

export interface VerificationTokenRecord {
  id: string;
  purpose: VerificationTokenPurpose;
  userId: string;
  token: string;
  expiresAt: string;
  used: boolean;
}

export const emailVerificationService = {
  createToken: (userId: string, purpose: VerificationTokenPurpose) => ({
    id: `TOKEN-${Date.now()}`,
    purpose,
    userId,
    token: `${purpose}:${userId}:${Date.now()}`,
    expiresAt: new Date(Date.now() + 3600000).toISOString(),
    used: false,
  }),
  verifyToken: (token: string) => {
    if (!token.includes(':')) throw new Error('Invalid verification token');
    return { valid: true, token };
  },
};
