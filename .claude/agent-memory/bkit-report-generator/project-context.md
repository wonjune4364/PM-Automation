---
name: Prompt Generator Feature Context
description: Project state and feature architecture for Prompt Generator Suite (completed cycle #1)
type: project
---

# Prompt Generator Suite — Project Context

**Project**: BJI-IT (NextCursor) PM Automation Tool  
**Feature**: Prompt Generator Suite (5 generators + bkit integration)  
**Status**: PDCA Cycle #1 Complete (92% match rate)  
**Completion Date**: 2026-04-04

## Feature Overview

5-step sequential document generator (PRD → TRD → IA → UseCase → Design) for Korean vibe coders, junior PMs, and indie founders preparing AI coding projects.

**Core Problem Solved**: Users were manually copy/pasting generator outputs (0% workflow completion → target 30% in 90 days).

## Key Implementations

### 1. Context Handoff (OPP-2 solved)
- sessionStorage-based "다음 단계로 보내기" button
- Each generator saves output → next generator loads via ContextBanner
- PRD→IA→UseCase→Design chain fully functional
- TRD marked as optional parallel track

### 2. Draft Auto-Save (OPP-4 solved)
- `useDraftStorage` hook in src/hooks/useDraftStorage.ts
- All 5 forms auto-persist onChange → localStorage
- Toast notification on restoration: "이전 작업을 불러왔습니다"
- "처음부터 시작" button clears saved draft

### 3. Homepage Workflow Visualization (OPP-1 solved)
- ToolsSection flow variant with arrow connectors
- Sequential: Step 1 PRD → Step 2 TRD → Step 3 IA → Step 4 UseCase → Step 5 Design
- TRD rendered with "선택" + "병렬 가능" badges + dashed border

### 4. UsecaseForm Upgrade
- Added 4 structured input fields (systemName, actors, features, nonFunctionalRequirements)
- Dynamic prompt generation from inputs (was static)
- Validation: disable generate button when inputs empty

### 5. bkit Integration
- `/api/bkit/save` endpoint saves prompts to docs/ folder structure
- Supports `/pdca plan {feature}` auto-reference workflow
- Saves PRDs to docs/00-pm/, designs to docs/02-design/features/

## Technical Patterns

### State Management
- sessionStorage: Context handoff (privacy-preserving, browser-close isolation)
- localStorage: Draft persistence (cross-session)
- React hooks: Minimal Zustand for these patterns (simpler than global state)

### Component Architecture
```
PromptGeneratorLayout
  ├── ContextBanner (if prior context)
  ├── [Generator]Form (with useDraftStorage hook)
  └── PromptDialog
      └── "다음 단계로 보내기" button
```

### New Files
- src/lib/bkitContext.ts — sessionStorage utilities
- src/components/prompt/ContextBanner.tsx — prior context display
- src/hooks/useDraftStorage.ts — reusable localStorage hook
- src/app/api/bkit/save/route.ts — document persistence
- src/features/usecases/types.ts — UsecaseFormData interface

## Quality Metrics
- **Match Rate**: 92% (12/13 PRD requirements met)
- **Architecture Compliance**: 90%
- **Convention Compliance**: 88%
- **TypeScript Errors**: 0
- **Build**: Next.js 15 Turbopack, production-ready

## Deferred Items
- sessionStorage overflow handling (> 5,000 chars) — design complete, implementation v1.1

## Next Cycle Priorities
1. GA4 event instrumentation for KR1 measurement
2. E2E tests for handoff workflow
3. sessionStorage overflow graceful handling
4. Workspace/multi-project concept (forward-looking)

## Key Metrics from PRD
- **KR1**: Full-chain completion rate (PRD→TRD→IA→UseCase→Design) — target 30% in 90 days
- **KR2**: PRD→IA continuation rate — target 25%
- **KR3**: WAPG (weekly active prompt generators) — target +40%
- **KR4**: Draft restoration + submit — target +40% vs. new sessions

## Beachhead Segment
Korean solo vibe coders (24–32, indie devs, side projects). Why they win:
- Highest pain (5/5): Document writing anxiety
- Most reachable (5/5): Cursor community, Twitter/X Korean devs, Disquiet.io
- Strongest referral (5/5): Vibe coders share AI workflows on social media

## Company Rebrand
Updated "BJI-IT" → "PT Bank Jtrust Indonesia" across:
1. Layout header
2. Footer company name
3. Hero section
4. AI system prompt
5. Marketing copy (3 locations)

Total: 7 rebrand touchpoints completed.

## Related Documents
- PRD: docs/00-pm/prompt-generator.prd.md (features, GTM strategy, personas, OKRs)
- Analysis: docs/03-analysis/prompt-generator.analysis.md (92% match rate validation)
- Report: docs/04-report/prompt-generator.report.md (completion report, lessons learned)
