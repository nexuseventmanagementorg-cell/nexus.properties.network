import assert from 'node:assert/strict';
import test from 'node:test';
import { NEXUS_AGENT_STEPS, runNexusAgentWorkflow, type AgentActivityEvent } from '../src/server/agentOrchestrator.ts';
import { handleAgentRunEndpoint } from '../src/server/agentRunEndpoint.ts';

test('does not start an agent run without a server-side model key', async () => {
  const recorded: AgentActivityEvent[] = [];
  const result = await runNexusAgentWorkflow({ goal: 'Review property search' }, {
    generateReply: async () => { throw new Error('must not call model'); },
    recordEvent: async (event) => { recorded.push(event); },
  });

  assert.equal(result.status, 503);
  assert.equal(result.body.code, 'AI_NOT_CONFIGURED');
  assert.equal(recorded.length, 0);
});

test('records each real specialist handoff and reply in order', async () => {
  const recorded: AgentActivityEvent[] = [];
  const modelCalls: string[] = [];
  let tick = 0;
  const result = await runNexusAgentWorkflow({ goal: 'Review property search evidence' }, {
    apiKey: 'test-key',
    createRunId: () => 'run-test',
    now: () => `2026-10-19T00:00:0${tick++}.000Z`,
    generateReply: async ({ agentName, context }) => {
      modelCalls.push(agentName);
      if (modelCalls.length > 1) assert.match(context, /Previous specialist response/);
      return { status: 200, body: { reply: `Actual model output from ${agentName}` } };
    },
    recordEvent: async (event) => { recorded.push(event); },
  });

  assert.equal(result.status, 200);
  assert.equal(result.body.runId, 'run-test');
  assert.equal(result.body.completedSteps, NEXUS_AGENT_STEPS.length);
  assert.deepEqual(modelCalls, NEXUS_AGENT_STEPS.map((step) => step.role));
  assert.equal(recorded.length, NEXUS_AGENT_STEPS.length * 2 + 1);
  assert.equal(recorded[0].kind, 'dispatched');
  assert.equal(recorded[0].recipientRole, NEXUS_AGENT_STEPS[0].role);
  assert.equal(recorded[1].kind, 'replied');
  assert.equal(recorded[1].senderRole, NEXUS_AGENT_STEPS[0].role);
  assert.equal(recorded.at(-1)?.kind, 'completed');
  assert.ok(recorded.every((event) => event.createdAt));
});

test('stops the workflow and records a failed specialist response', async () => {
  const recorded: AgentActivityEvent[] = [];
  const result = await runNexusAgentWorkflow({ goal: 'Review property data' }, {
    apiKey: 'test-key',
    generateReply: async () => ({ status: 502, body: { error: 'Provider unavailable' } }),
    recordEvent: async (event) => { recorded.push(event); },
  });

  assert.equal(result.status, 502);
  assert.equal(result.body.completedSteps, 0);
  assert.equal(recorded.at(-1)?.kind, 'failed');
  assert.equal(recorded.some((event) => event.kind === 'completed'), false);
});

test('agent activity and run endpoints reject requests without the operator token', async () => {
  const invoke = async (method: string, authorization?: string) => {
    let status = 200;
    let body: unknown;
    await handleAgentRunEndpoint({ method, headers: { authorization }, body: { goal: 'Review the property flow' } }, {
      status(code) { status = code; return this; },
      json(value) { body = value; return this; },
    }, { runToken: 'expected-operator-token', isProduction: true });
    return { status, body: body as { code?: string } };
  };

  const read = await invoke('GET');
  const run = await invoke('POST', 'Bearer incorrect-token');
  assert.equal(read.status, 401);
  assert.equal(read.body.code, 'UNAUTHORIZED');
  assert.equal(run.status, 401);
  assert.equal(run.body.code, 'UNAUTHORIZED');
});