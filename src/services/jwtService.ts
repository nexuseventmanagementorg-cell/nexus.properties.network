export interface JwtService {
  sign(payload: Record<string, unknown>, expiresInSeconds?: number): string;
  verify(token: string): Record<string, unknown>;
}

const getSecret = () => {
  const secret = import.meta.env.VITE_JWT_SECRET || '';
  if (!secret) throw new Error('Production JWT requires VITE_JWT_SECRET.');
  return secret;
};

export const jwtService: JwtService = {
  sign: (payload, expiresInSeconds = 86400) => {
    const secret = getSecret();
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const body = btoa(JSON.stringify({ ...payload, exp: Math.floor(Date.now() / 1000) + expiresInSeconds }));
    const signature = btoa(`${header}.${body}.${secret}`);
    return `${header}.${body}.${signature}`;
  },
  verify: (token) => {
    const secret = getSecret();
    const parts = token.split('.');
    if (parts.length < 3) throw new Error('Invalid JWT');
    const payload = JSON.parse(atob(parts[1]));
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) throw new Error('JWT expired');
    return { ...payload, secret };
  },
};
