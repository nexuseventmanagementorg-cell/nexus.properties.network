export interface RefreshTokenService {
  issue(userId: string): string;
  verify(token: string): { userId: string };
  revoke(token: string): boolean;
}

export const refreshTokenService: RefreshTokenService = {
  issue: (userId: string) => `refresh:${userId}:${Date.now()}`,
  verify: (token: string) => {
    const match = token.match(/^refresh:(.+):\d+$/);
    if (!match) throw new Error('Invalid refresh token');
    return { userId: match[1] };
  },
  revoke: (token: string) => Boolean(token),
};
