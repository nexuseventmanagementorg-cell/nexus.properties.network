import { handleNexusChatEndpoint } from '../../src/server/aiChatEndpoint';

interface VercelRequestLike {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
  body?: unknown;
  socket?: { remoteAddress?: string };
}

interface VercelResponseLike {
  status: (code: number) => VercelResponseLike;
  json: (body: unknown) => VercelResponseLike;
  setHeader: (name: string, value: string) => void;
}

export const config = { maxDuration: 25 };

export default async function handler(request: VercelRequestLike, response: VercelResponseLike) {
  await handleNexusChatEndpoint(
    request,
    response,
    process.env.NEXUS_GEMINI_API_KEY,
    process.env.NEXUS_GEMINI_MODEL
  );
}