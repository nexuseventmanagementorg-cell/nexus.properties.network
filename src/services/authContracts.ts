export interface PasswordHasher { hash(password: string): Promise<string>; compare(password: string, digest: string): Promise<boolean>; }
export interface JwtProvider { sign(payload: Record<string, unknown>, expiresInSeconds?: number): Promise<string>; verify<T extends Record<string, unknown>>(token: string): Promise<T>; }
export interface RefreshTokenProvider { issue(userId: string): Promise<string>; rotate(token: string): Promise<string>; revoke(token: string): Promise<void>; }
export interface GoogleOAuthProvider { getAuthorizationUrl(state: string): string; exchangeCode(code: string): Promise<{ providerUserId: string; email: string; name?: string }>; }

const notConfigured = (name: string) => { throw new Error(`${name} provider is not configured. Connect a backend implementation before production launch.`); };
export const passwordHasher: PasswordHasher = { hash: async () => notConfigured('Password hashing'), compare: async () => notConfigured('Password hashing') as never };
export const jwtProvider: JwtProvider = { sign: async () => notConfigured('JWT'), verify: async () => notConfigured('JWT') as never };
export const refreshTokenProvider: RefreshTokenProvider = { issue: async () => notConfigured('Refresh token'), rotate: async () => notConfigured('Refresh token'), revoke: async () => { notConfigured('Refresh token'); } };
export const googleOAuthProvider: GoogleOAuthProvider = { getAuthorizationUrl: () => notConfigured('Google OAuth'), exchangeCode: async () => notConfigured('Google OAuth') as never };
