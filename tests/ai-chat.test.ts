import assert from 'node:assert/strict';
import test from 'node:test';
import { generateNexusChatReply } from '../src/server/aiChat';
import { handleNexusChatEndpoint } from '../src/server/aiChatEndpoint';

const validRequest = {
  language: 'roman_ur',
  agentName: 'Property Matching AI',
  messages: [
    { role: 'model', text: 'Welcome to the preview.' },
    { role: 'user', text: 'Lahore mein 1 kanal ghar ka budget kya hoga?' },
    { role: 'model', text: 'Aap Lahore mein 1 kanal ghar dhoond rahe hain.' },
    { role: 'user', text: 'Agar 5 crore tak ho?' },
  ],
  sourceContext: 'Parsed intent only; no verified listing was found.',
};

test('chat gateway refuses requests until a server model key is configured', async () => {
  const result = await generateNexusChatReply(validRequest);
  assert.equal(result.status, 503);
  assert.equal(result.body.code, 'AI_NOT_CONFIGURED');
});

test('chat gateway rejects malformed and oversized conversation payloads', async () => {
  const missingTurn = await generateNexusChatReply({ ...validRequest, messages: [] }, { apiKey: 'server-only-key' });
  const oversized = await generateNexusChatReply({
    ...validRequest,
    messages: [{ role: 'user', text: 'x'.repeat(2501) }],
  }, { apiKey: 'server-only-key' });

  assert.equal(missingTurn.status, 400);
  assert.equal(missingTurn.body.code, 'INVALID_REQUEST');
  assert.equal(oversized.status, 400);
});

test('chat gateway sends bounded history and factual safety rules to Gemini server-side', async () => {
  let sentUrl = '';
  let sentHeaders: HeadersInit | undefined;
  let sentBody: Record<string, unknown> | undefined;
  const fetcher: typeof fetch = async (input, init) => {
    sentUrl = String(input);
    sentHeaders = init?.headers;
    sentBody = JSON.parse(String(init?.body)) as Record<string, unknown>;
    return new Response(JSON.stringify({
      candidates: [{ content: { parts: [{ text: 'Aap kis area ko prefer karte hain?' }] } }],
    }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  };

  const result = await generateNexusChatReply(validRequest, {
    apiKey: 'server-only-key',
    fetcher,
  });

  assert.equal(result.status, 200);
  assert.equal(result.body.reply, 'Aap kis area ko prefer karte hain?');
  assert.match(sentUrl, /gemini-2\.5-flash:generateContent$/);
  assert.equal(new Headers(sentHeaders).get('x-goog-api-key'), 'server-only-key');
  assert.equal(JSON.stringify(sentBody).includes('server-only-key'), false);
  assert.match(JSON.stringify(sentBody), /Never invent property listings/);
  assert.match(JSON.stringify(sentBody), /Untrusted demonstration context/);
});

test('chat gateway reports provider and empty-response failures without fabricating a reply', async () => {
  const failed = await generateNexusChatReply(validRequest, {
    apiKey: 'server-only-key',
    fetcher: async () => new Response('{}', { status: 429 }),
  });
  const empty = await generateNexusChatReply(validRequest, {
    apiKey: 'server-only-key',
    fetcher: async () => new Response(JSON.stringify({ candidates: [] }), { status: 200 }),
  });

  assert.equal(failed.status, 502);
  assert.equal(failed.body.code, 'AI_PROVIDER_ERROR');
  assert.equal(empty.status, 502);
  assert.equal(empty.body.code, 'AI_EMPTY_RESPONSE');
});

test('chat HTTP endpoint rejects cross-origin requests and non-POST methods', async () => {
  const invoke = async (method: string, origin: string) => {
    let status = 200;
    let body: unknown;
    await handleNexusChatEndpoint({
      method,
      headers: { host: 'nexus.example', origin },
      body: validRequest,
      socket: { remoteAddress: `${method}-${origin}` },
    }, {
      status(code) { status = code; return this; },
      json(value) { body = value; return this; },
    }, undefined);
    return { status, body: body as { code?: string } };
  };

  const wrongOrigin = await invoke('POST', 'https://attacker.example');
  const wrongMethod = await invoke('GET', 'https://nexus.example');

  assert.equal(wrongOrigin.status, 403);
  assert.equal(wrongOrigin.body.code, 'ORIGIN_NOT_ALLOWED');
  assert.equal(wrongMethod.status, 405);
  assert.equal(wrongMethod.body.code, 'METHOD_NOT_ALLOWED');
});