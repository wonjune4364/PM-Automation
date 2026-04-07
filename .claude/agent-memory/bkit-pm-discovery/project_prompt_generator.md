---
name: Prompt Generator OST Analysis
description: Opportunity Solution Tree results for the 5-generator prompt suite; top opps and recommended first experiments
type: project
---

OST analysis completed 2026-04-04. Output saved to `docs/00-pm/prompt-generator.discovery.md`.

Desired outcome: increase full-chain workflow completion (PRD→TRD→IA→Use Cases→Design in one session) to 30% within 90 days.

Top opportunities by Opportunity Score (Importance x (1-Satisfaction)):
1. OPP-2 (score 0.86) — manual copy-paste between generators breaks flow; no context handoff exists
2. OPP-1 (score 0.72) — users do not understand the required ordering; only warning banners exist today
3. OPP-4 (score 0.68) — form state lost on page refresh; no localStorage persistence

First recommended experiments:
- EXP-1: "Send to IA" button in PRD result dialog carrying context via sessionStorage (low effort)
- EXP-2: Sequential workflow diagram on home page replacing unordered tool cards (frontend only)
- EXP-3: Auto-save PRD form to localStorage and restore on mount

**Why:** Chain completion is the key metric; the biggest drop-off is between generators due to manual context transfer.

**How to apply:** When proposing new features or changes to the prompt generators, prioritize solutions that reduce friction at the handoff point between generators before tackling form UX or AI model choices.
