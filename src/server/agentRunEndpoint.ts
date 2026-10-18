import { getRecentAgentActivity, recordAgentActivity, type AgentActivityStorageConfig } from './agentActivityStore.ts';
import { runNexusAgentWorkflow } from './agentOrchestrator.ts';
import { generateNexusChatReply } from './aiChat.ts';

interface AgentRequestLike {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
  body?: unknown;
}

interface AgentResponseLike {
  status: (code: number) => AgentResponseLike;
  json: (body: unknown) => AgentResponseLike;
  setHeader?: (name: string, value: string) => void;
}

function firstHeader(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] || '' : value || '';
}

async function isValidRunToken(value: string, expected: string): Promise<boolean> {
  const encoder = new TextEncoder();
  const [actualDigest, expectedDigest] = await Promise.all([
    crypto.subtle.digest('SHA-256', encoder.encode(value)),
    crypto.subtle.digest('SHA-256', encoder.encode(expected)),
  ]);
  const actualBytes = new Uint8Array(actualDigest);
  const expectedBytes = new Uint8Array(expectedDigest);
  let difference = 0;
  for (let index = 0; index < actualBytes.length; index += 1) difference |= actualBytes[index] ^ expectedBytes[index];
  return value.length === expected.length && difference === 0;
}

export async function handleAgentRunEndpoint(
  request: AgentRequestLike,
  response: AgentResponseLike,
  options: { apiKey?: string; model?: string; runToken?: string; isProduction?: boolean; storage?: AgentActivityStorageConfig } = {}
): Promise<void> {
  response.setHeader?.('Cache-Control', 'no-store');
  response.setHeader?.('X-Content-Type-Options', 'nosniff');

  const expectedToken = options.runToken?.trim();
  const authorization = firstHeader(request.headers.authorization);
  const suppliedToken = authorization.startsWith('Bearer ') ? authorization.slice(7) : '';
  if (expectedToken ? !(await isValidRunToken(suppliedToken, expectedToken)) : options.isProduction) {
    response.status(expectedToken ? 401 : 503).json({
      error: expectedToken ? 'A valid operator token is required.' : 'Agent execution is not configured for production.',
      code: expectedToken ? 'UNAUTHORIZED' : 'RUNNER_NOT_CONFIGURED',
    });
    return;
  }

  if (request.method === 'GET') {
    try {
      response.status(200).json({ events: await getRecentAgentActivity(options.storage || {}, 100) });
    } catch (error) {
      response.status(503).json({
        error: error instanceof Error ? error.message : 'Agent activity is unavailable.',
        code: 'ACTIVITY_STORAGE_UNAVAILABLE',
      });
    }
    return;
  }

  if (request.method !== 'POST') {
    response.status(405).json({ error: 'Use GET for activity or POST to start a run.', code: 'METHOD_NOT_ALLOWED' });
    return;
  }

  try {
    await getRecentAgentActivity(options.storage || {}, 1);
  } catch (error) {
    response.status(503).json({
      error: error instanceof Error ? error.message : 'Durable agent activity storage is unavailable.',
      code: 'ACTIVITY_STORAGE_UNAVAILABLE',
    });
    return;
  }

  try {
    const result = await runNexusAgentWorkflow(request.body, {
      apiKey: options.apiKey,
      model: options.model,
      recordEvent: (event) => recordAgentActivity(event, options.storage || {}),
      generateReply: async ({ agentName, instruction, context, apiKey, model }) => {
        const modelResponse = await generateNexusChatReply({
          messages: [{ role: 'user', text: instruction }],
          language: 'en',
          agentName,
          sourceContext: context,
        }, { apiKey, model, agentInstructions: instruction });
        return { status: modelResponse.status, body: modelResponse.body };
      },
    });
    response.status(result.status).json(result.body);
  } catch {
    response.status(503).json({ error: 'The agent run stopped because a model or durable-storage operation failed.', code: 'AGENT_RUN_UNAVAILABLE' });
  }
}