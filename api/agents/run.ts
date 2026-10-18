import { handleAgentRunEndpoint } from '../../src/server/agentRunEndpoint';

interface VercelRequestLike {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
  body?: unknown;
}

interface VercelResponseLike {
  status: (code: number) => VercelResponseLike;
  json: (body: unknown) => VercelResponseLike;
  setHeader: (name: string, value: string) => void;
}

export const config = { maxDuration: 60 };

export default async function handler(request: VercelRequestLike, response: VercelResponseLike) {
  await handleAgentRunEndpoint(request, response, {
    apiKey: process.env.NEXUS_GEMINI_API_KEY,
    model: process.env.NEXUS_GEMINI_MODEL,
    runToken: process.env.NEXUS_AGENT_RUN_TOKEN,
    isProduction: process.env.VERCEL_ENV === 'production',
    storage: {
      url: process.env.NEXUS_SUPABASE_URL || process.env.VITE_SUPABASE_URL,
      serviceRoleKey: process.env.NEXUS_SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY,
      isProduction: process.env.VERCEL_ENV === 'production',
    },
  });
}