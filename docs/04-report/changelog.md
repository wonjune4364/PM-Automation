# Changelog

All notable changes to the BJI-IT (NextCursor) PM Automation Tool are documented here.

## [2026-04-04] - Prompt Generator Suite v1.0 Complete

### Added
- **Context Handoff Feature**: sessionStorage-based "다음 단계로 보내기" button enabling PRD→IA→UseCase→Design sequential workflow
- **ContextBanner Component**: Blue info banner displaying prior context with dismiss button (src/components/prompt/ContextBanner.tsx)
- **Draft Auto-Save**: localStorage persistence for all 5 generator forms with automatic restoration on page revisit
- **useDraftStorage Hook**: Reusable React hook for form state persistence (src/hooks/useDraftStorage.ts)
- **UsecaseForm Structured Inputs**: 4 input fields (systemName, actors, features, nonFunctionalRequirements) with dynamic prompt generation
- **Sequential Workflow Visualization**: Homepage "flow" variant with arrow connectors showing 5-step sequence + TRD as optional parallel track
- **bkit Integration**: /api/bkit/save endpoint for saving generated prompts to docs/00-pm/ and docs/02-design/ folders
- **bkitContext Utilities**: sessionStorage wrapper functions (saveContext, loadContext, clearContext) in src/lib/bkitContext.ts

### Changed
- HomePage ToolsSection: Replaced 2-column unordered grid with sequential flow diagram
- UsecaseForm: Replaced static prompt template with dynamic generation from structured inputs
- All 5 generator pages (PRD, TRD, IA, UseCases, Design): Added ContextBanner support and prior context injection
- Company branding throughout: BJI-IT → PT Bank Jtrust Indonesia (updated in layout, header, footer, hero section, system prompts)
- Claude API integration: Migrated from OpenAI to Anthropic SDK (claude-sonnet-4-6)

### Fixed
- Handoff workflow abandonment (OPP-2, score 0.86): Users no longer need manual copy/paste between generators
- Unclear workflow sequence (OPP-1, score 0.72): Sequential visualization with arrows now guides users through 5-step process
- Session work loss (OPP-4, score 0.68): localStorage auto-save preserves form state across page refreshes and browser restarts
- UsecaseForm quality parity: Upgraded from static template to structured input-driven generation

### Quality Metrics
- Design Match Rate: 92% (12/13 PRD requirements met)
- Architecture Compliance: 90%
- Convention Compliance: 88%
- TypeScript Errors: 0
- All 5 generators: 100% functional (manual test)
- Handoff flow: 100% verified (PRD→IA→UseCase→Design chain)

### Deferred to v1.1
- sessionStorage overflow handling (> 5,000 chars): Graceful truncation with user warning — design complete, implementation deferred

### Files Created
- src/features/usecases/types.ts
- src/lib/bkitContext.ts
- src/components/prompt/ContextBanner.tsx
- src/hooks/useDraftStorage.ts
- src/app/api/bkit/save/route.ts

### Files Modified
- src/features/usecases/components/UsecaseForm.tsx (rewritten)
- src/features/usecases/lib/generatePrompt.ts (dynamic generation)
- src/features/usecases/page.tsx (context support)
- src/features/ia/page.tsx (context support)
- src/features/ia/components/IAForm.tsx (draft auto-save)
- src/features/design/page.tsx (context support)
- src/features/design/components/DesignForm.tsx (draft auto-save)
- src/features/prd/components/PRDForm.tsx (draft auto-save)
- src/features/trd/components/TRDForm.tsx (draft auto-save)
- src/components/prompt/PromptGeneratorLayout.tsx (handoff support)
- src/features/home/components/ToolsSection.tsx (flow variant)
- src/app/page.tsx (flow variant enabled)

### References
- Plan: [docs/00-pm/prompt-generator.prd.md](../00-pm/prompt-generator.prd.md)
- Analysis: [docs/03-analysis/prompt-generator.analysis.md](../03-analysis/prompt-generator.analysis.md)
- Report: [docs/04-report/prompt-generator.report.md](prompt-generator.report.md)

### Next Steps
1. GA4 event instrumentation (handoff_click, draft_restore, workflow_complete_5step)
2. Production deployment with bkit folder structure verification
3. KR1 monitoring: Full-chain completion rate target 30% in 90 days
4. v1.1 planning: sessionStorage overflow handling + E2E tests

---

## Version History

| Version | Date | Match Rate | Status |
|---------|------|:----------:|--------|
| v1.0.0 | 2026-04-04 | 92% | ✅ Complete, Ready for Production |
