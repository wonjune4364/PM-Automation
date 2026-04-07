---
name: BJI-IT Product Context
description: Core product facts for BJI-IT (NextCursor) — Next.js 15 app with Korean AI planning prompt generators
type: project
---

BJI-IT (branded NextCursor) is a Next.js 15 web app at /Users/chowonjune/Documents/BJI/프로젝트/PM Automation/PM-Automation. It provides a suite of 5 AI documentation prompt generators targeting Korean-speaking developers, startup PMs, and vibe coders.

**Five generators (all Korean-first output):**
- `/prd` — Product Requirements Document prompt generator
- `/trd` — Technical Requirements Document prompt generator
- `/ia` — Information Architecture prompt generator
- `/usecases` — Use Case document prompt generator
- `/design` — UI/UX Design Guide prompt generator

**Key technical facts:**
- Shared `PromptGeneratorLayout` component handles form, dialog, clipboard copy, and optional OpenAI API direct generation (user-supplied key stored in localStorage)
- Prompts use XML-style tags (`<product-overview>`, `<must-features>`, etc.) optimised for Claude and GPT-4o instruction-following
- All generated documents are in Korean
- Google Analytics + AdSense integrated (production only)
- Google Sheets API for email subscription collection

**Why:** Tools designed to let users with no PM background generate professional planning documents to feed into AI coding tools (Cursor, Claude, ChatGPT), reducing the pre-development documentation bottleneck.

**How to apply:** When doing PM work or feature analysis for this project, treat the Korean developer/vibe coder audience as primary, and the sequential PRD→TRD→IA→UseCases→Design workflow as the core product loop.
