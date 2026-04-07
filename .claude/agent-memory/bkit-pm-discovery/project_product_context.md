---
name: Product Context — BJI-IT (NextCursor)
description: Core product facts about the prompt generator suite that inform all PM discovery work
type: project
---

BJI-IT (NextCursor) is a Next.js 15 web application targeting Korean-speaking developers and PMs who want to generate AI-ready documentation prompts.

Key facts:
- 5 generators in a designed sequential order: PRD → TRD (optional parallel) → IA → Use Cases → Design
- All generated content is Korean-language; guidelines inside every prompt instruct the LLM to write in Korean
- The IA and Use Cases forms explicitly tell users "do PRD first and paste it here" — context handoff is manual today
- The Use Cases generator (UsecaseForm) currently accepts zero structured inputs and generates a static generic prompt — lowest fidelity
- AI Generation feature calls OpenAI GPT-4o directly; user supplies API key stored in localStorage; only one provider supported
- No analytics instrumented beyond Google Analytics page views as of 2026-04-04
- Shared PromptGeneratorLayout handles: form rendering, result dialog, clipboard copy, confetti animation, OpenAI direct generation, API key modal

**Why:** Understanding the sequential workflow dependency and the Korean-first output model is essential for scoping discovery correctly.

**How to apply:** Solutions that assume language flexibility or non-sequential usage should be treated as lower-priority until user research confirms those use cases exist.
