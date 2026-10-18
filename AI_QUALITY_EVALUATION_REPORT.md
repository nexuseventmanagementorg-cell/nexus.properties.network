# Nexus AI Quality Evaluation

## Scope

This evaluation covers the existing AI assistant only. No new website section, visual component, color, typography, animation, or voice profile was added or changed.

The assistant now has a server-side Gemini gateway at `/api/ai/chat`. It is available in local Vite development and as a Vercel serverless function. The provider is **not configured** until `NEXUS_GEMINI_API_KEY` is set as a server-only environment variable; no key is committed or exposed to the browser. Without a key, the endpoint returns `AI_NOT_CONFIGURED` and the UI remains in clearly labelled local-preview mode.

This is one model-backed assistant path selected from the existing role registry, not 54 separately deployed autonomous agents. Property answers still use the local structured search/FAQ path where available. No authoritative live property, verification, payment, Lead Lock, Deal Lock, CRM, or government integration is connected.

## Test Suite

- Server gateway suite: 5 tests, using mocked provider responses; no paid model request is made.
- Existing parser evaluation: 200 deterministic queries.

- Total queries: 200
- Cities covered: 20 representative seeded cities
- Query families: 10
- Languages: English and Roman Urdu
- Test fields: city, area, phase, property type, budget, bedrooms, purpose, and response wording

Query families include:

- `Show me 1 Kanal plot in DHA Lahore`
- `Mujhe 10 marla house chahiye`
- `Budget 3 crore`
- `Commercial shop in Gulberg`
- Apartment requests
- Farm house and phase requests
- Office and budget requests
- Investment requests
- Bedroom-specific Roman Urdu requests
- Residential plot requests

## Implemented Quality Controls

- Structured intent parser for city, area, phase, type, budget, bedrooms, purpose, and size.
- Roman Urdu synonym support for `ghar`, `dukan`, `zameen`, `sarmaya`, and related property language.
- Session context merges missing fields from the previous request.
- Natural confirmations no longer echo prefixes such as `Aap Show me`, `Aap Buy House`, or `Aap Commercial`.
- Inventory queries use the parsed intent rather than raw keyword branches.
- FAQ responses are category-specific instead of using one generic response template.
- Evaluation rejects responses that repeat the raw query or use the known unnatural confirmation prefixes.
- Server gateway validates language, role, message count, per-message size, and total conversation size; it applies a request timeout and returns explicit provider errors.
- Server prompts prohibit fabricated listings, prices, verification, market data, payments, or claimed actions. Supplied property intent is explicitly marked unverified context.
- The drawer shows whether the model is connected, unconfigured, or unavailable; duplicate sends are disabled while a reply is pending.
- Mocked tests verify the API key is sent only in the server request header and never appears in its prompt/body.

## Runtime Evaluation

The executable evaluation function is `evaluateAIQuality()` in `src/utils/aiEvaluationSuite.ts`.

It returns:

- Intent Accuracy
- Property Accuracy
- City Accuracy
- Budget Accuracy
- Response Quality

Run it with a TypeScript runner in an environment that exposes the local `tsx` executable. The source tree currently passes VS Code diagnostics and the production Vite build completes successfully.

## Remaining Risk

The production model provider remains unconfigured, so live model responses have not been exercised. Before public model traffic, configure the server-only key, add model-backed evaluation for English/Urdu/Roman Urdu, version prompts, set provider budget/abuse controls, and test reviewed golden answers. Property results remain sample or locally sourced and must not be described as authoritative live inventory. Registry roles remain design entries rather than independent workers.