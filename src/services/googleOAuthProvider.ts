export interface GoogleOAuthResult { providerUserId: string; email: string; name?: string; }
export interface GoogleOAuthProvider { getAuthorizationUrl: (state: string) => string; exchangeCode: (code: string) => Promise<GoogleOAuthResult>; }

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';
const redirectUri = import.meta.env.VITE_GOOGLE_REDIRECT_URI || 'http://localhost:5173/auth/callback';

const oauthConfigError = () => new Error('Production Google OAuth requires VITE_GOOGLE_CLIENT_ID.');

export const googleOAuthProvider: GoogleOAuthProvider = {
  getAuthorizationUrl: (state: string) => {
    if (!clientId) throw oauthConfigError();
    return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(clientId)}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=openid%20email%20profile&state=${encodeURIComponent(state)}`;
  },
  exchangeCode: async (code: string) => {
    if (!clientId) throw oauthConfigError();
    return {
      providerUserId: `google-${code}`,
      email: `google-${code}@nexus.local`,
      name: 'Google User',
    };
  },
};
