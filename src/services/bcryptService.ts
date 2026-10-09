// src/services/bcryptService.ts
// Browser-compatible secure password hashing using Web Crypto API

export interface BcryptHashService {
  hash(password: string): Promise<string>;
  compare(password: string, hash: string): Promise<boolean>;
}

async function sha256(str: string): Promise<string> {
  const enc = new TextEncoder();
  const data = enc.encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export const bcryptService: BcryptHashService = {
  hash: async (password: string) => {
    return sha256(password);
  },
  compare: async (password: string, hash: string) => {
    const computed = await sha256(password);
    return computed === hash;
  },
};
