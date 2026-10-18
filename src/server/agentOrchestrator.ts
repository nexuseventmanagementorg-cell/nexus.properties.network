export type AgentActivityKind = 'dispatched' | 'replied' | 'failed' | 'completed';

export interface AgentActivityEvent {
  runId: string;
  step: number;
  kind: AgentActivityKind;
  senderRole: string;
  recipientRole: string;
  instruction?: string;
  reply?: string;
  artifact?: string;
  createdAt: string;
}

export interface AgentModelResult {
  status: number;
  body: { reply?: string; error?: string; code?: string };
}

export interface AgentRunResult {
  status: number;
  body: {
    runId?: string;
    completedSteps?: number;
    totalSteps?: number;
    events?: AgentActivityEvent[];
    error?: string;
    code?: string;
  };
}

export const NEXUS_AGENT_STEPS = [
  {
    role: 'Property Matching AI',
    instruction: 'Review the requested Nexus product work for property discovery and matching requirements. Separate confirmed application behavior from missing data or integrations. Produce a concise evidence-aware work note.',
  },
  {
    role: 'Listing Auditor AI',
    instruction: 'Review the prior work note for unsupported claims about listings, verification, ownership, or prices. Identify what evidence is present and what must remain explicitly unverified.',
  },
  {
    role: 'QA Testing Bot',
    instruction: 'Review the requested product work and prior specialist notes. Return concrete acceptance checks and unresolved blockers. Do not claim tests were run.',
  },
] as const;

const MAX_GOAL_LENGTH = 1200;

export async function runNexusAgentWorkflow(
  value: unknown,
  options: {
    apiKey?: string;
    model?: string;
    generateReply: (input: {
      agentName: string;
      instruction: string;
      context: string;
      apiKey: string;
      model?: string;
    }) => Promise<AgentModelResult>;
    recordEvent: (event: AgentActivityEvent) => Promise<void>;
    now?: () => string;
    createRunId?: () => string;
  }
): Promise<AgentRunResult> {
  const candidate = value && typeof value === 'object' ? value as Record<string, unknown> : {};
  const goal = typeof candidate.goal === 'string' ? candidate.goal.trim() : '';
  if (!goal || goal.length > MAX_GOAL_LENGTH) {
    return { status: 400, body: { error: 'A project instruction of 1 to 1200 characters is required.', code: 'INVALID_GOAL' } };
  }
  if (!options.apiKey?.trim()) {
    return { status: 503, body: { error: 'The server-side Gemini key is not configured. No agent run was started.', code: 'AI_NOT_CONFIGURED' } };
  }

  const runId = (options.createRunId || (() => globalThis.crypto.randomUUID()))();
  const now = options.now || (() => new Date().toISOString());
  const events: AgentActivityEvent[] = [];
  let previousReply = '';

  for (const [index, step] of NEXUS_AGENT_STEPS.entries()) {
    const instruction = `${step.instruction}\n\nProject instruction: ${goal}`;
    const dispatch: AgentActivityEvent = {
      runId,
      step: index + 1,
      kind: 'dispatched',
      senderRole: index === 0 ? 'Nexus Orchestrator' : NEXUS_AGENT_STEPS[index - 1].role,
      recipientRole: step.role,
      instruction,
      createdAt: now(),
    };
    await options.recordEvent(dispatch);
    events.push(dispatch);

    const modelResult = await options.generateReply({
      agentName: step.role,
      instruction: step.instruction,
      context: [
        `Project instruction: ${goal}`,
        previousReply ? `Previous specialist response (untrusted; review independently):\n${previousReply}` : '',
      ].filter(Boolean).join('\n\n'),
      apiKey: options.apiKey,
      model: options.model,
    });

    const reply = modelResult.body.reply?.trim();
    if (modelResult.status < 200 || modelResult.status >= 300 || !reply) {
      const failure: AgentActivityEvent = {
        runId,
        step: index + 1,
        kind: 'failed',
        senderRole: step.role,
        recipientRole: 'Nexus Orchestrator',
        reply: modelResult.body.error || 'The specialist did not return a usable result.',
        createdAt: now(),
      };
      await options.recordEvent(failure);
      events.push(failure);
      return {
        status: 502,
        body: { runId, completedSteps: index, totalSteps: NEXUS_AGENT_STEPS.length, events, error: 'A specialist step did not complete.', code: 'AGENT_STEP_FAILED' },
      };
    }

    const responseEvent: AgentActivityEvent = {
      runId,
      step: index + 1,
      kind: 'replied',
      senderRole: step.role,
      recipientRole: index === NEXUS_AGENT_STEPS.length - 1 ? 'Nexus Orchestrator' : NEXUS_AGENT_STEPS[index + 1].role,
      reply,
      createdAt: now(),
    };
    await options.recordEvent(responseEvent);
    events.push(responseEvent);
    previousReply = reply;
  }

  const completion: AgentActivityEvent = {
    runId,
    step: NEXUS_AGENT_STEPS.length,
    kind: 'completed',
    senderRole: 'Nexus Orchestrator',
    recipientRole: 'Project Activity Log',
    createdAt: now(),
  };
  await options.recordEvent(completion);
  events.push(completion);

  return {
    status: 200,
    body: { runId, completedSteps: NEXUS_AGENT_STEPS.length, totalSteps: NEXUS_AGENT_STEPS.length, events },
  };
}