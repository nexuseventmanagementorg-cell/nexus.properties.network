import { generateNexusChatReply } from './aiChat.ts';

interface ChatRequestLike {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
  body?: unknown;
  socket?: { remoteAddress?: string };
}

interface ChatResponseLike {
  status: (code: number) => ChatResponseLike;
  json: (body: unknown) => ChatResponseLike;
  setHeader?: (name: string, value: string) => void;
}

const requestsByAddress = new Map<string, number[]>();

function firstHeader(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] || '' : value || '';
}

export async function handleNexusChatEndpoint(
  request: ChatRequestLike,
  response: ChatResponseLike,
  apiKey?: string,
  model?: string
): Promise<void> {
  response.setHeader?.('Cache-Control', 'no-store');
  response.setHeader?.('X-Content-Type-Options', 'nosniff');

  if (request.method !== 'POST') {
    response.status(405).json({ error: 'Use POST to send a chat message.', code: 'METHOD_NOT_ALLOWED' });
    return;
  }

  const origin = firstHeader(request.headers.origin);
  const host = firstHeader(request.headers['x-forwarded-host']) || firstHeader(request.headers.host);
  if (origin && host) {
    try {
      if (new URL(origin).host !== host) {
        response.status(403).json({ error: 'Cross-origin chat requests are not accepted.', code: 'ORIGIN_NOT_ALLOWED' });
        return;
      }
    } catch {
      response.status(403).json({ error: 'The request origin is invalid.', code: 'ORIGIN_NOT_ALLOWED' });
      return;
    }
  }

  const forwardedFor = firstHeader(request.headers['x-forwarded-for']);
  const address = forwardedFor.split(',')[0].trim() || request.socket?.remoteAddress || 'unknown';
  const now = Date.now();
  const recentRequests = (requestsByAddress.get(address) || []).filter((timestamp) => now - timestamp < 60000);
  if (recentRequests.length >= 12) {
    response.status(429).json({ error: 'Please wait a minute before sending more messages.', code: 'RATE_LIMITED' });
    return;
  }
  recentRequests.push(now);
  requestsByAddress.set(address, recentRequests);
  if (requestsByAddress.size > 2000) {
    for (const [key, timestamps] of requestsByAddress) {
      if (!timestamps.some((timestamp) => now - timestamp < 60000)) requestsByAddress.delete(key);
    }
  }

  const result = await generateNexusChatReply(request.body, { apiKey, model });
  response.status(result.status).json(result.body);
}