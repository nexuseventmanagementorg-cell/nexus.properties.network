# Nexus AI Quality Evaluation

## Scope

This evaluation covers the existing AI assistant only. No new website section, visual component, color, typography, animation, or voice profile was added or changed.

## Test Suite

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

This is still a deterministic local parser, not a production model gateway. Production launch still requires model-backed evaluation, multilingual test expansion, server-side conversation context, prompt/version tracking, safety evaluation, and human-reviewed golden answers.