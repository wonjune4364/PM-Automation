# Discovery Analysis: Prompt Generator Suite

> Framework: Teresa Torres, *Continuous Discovery Habits* — Opportunity Solution Tree (OST)
> Date: 2026-04-04
> Product: BJI-IT (NextCursor) — Next.js 15 web application
> Scope: 5 AI documentation prompt generators (PRD, TRD, IA, Use Cases, Design)

---

## Desired Outcome

**Increase the share of users who complete the full PRD → TRD → IA → Use Cases → Design workflow in a single session from the current baseline to 30% within 90 days.**

Rationale: The generators are designed to be used sequentially (each downstream tool explicitly instructs users to paste the output of the prior step). A user who completes the full chain has the highest intent to return and the highest word-of-mouth value. Session completion of the chain is a leading indicator of retention and referral, and it is directly measurable via page-navigation events without a backend requirement.

Secondary metric proxy (if session analytics are not yet instrumented): **copy-button click-through rate per generator**, measured per unique visitor.

---

## Opportunity Solution Tree

```
DESIRED OUTCOME
└── Increase full-chain workflow completion rate to 30% in 90 days
    │
    ├── OPP-1  I struggle to understand what order to run the generators in
    │   ├── SOL-1a  Sequential Workflow Stepper (visual progress indicator)
    │   ├── SOL-1b  "Start Here" guided onboarding tour
    │   └── SOL-1c  Home page workflow diagram with direct entry links
    │
    ├── OPP-2  I have to manually copy-paste output between generators,
    │          which breaks my flow and loses context
    │   ├── SOL-2a  Session context store — carry prior outputs into next form
    │   ├── SOL-2b  "Send to next tool" one-click handoff button in result dialog
    │   └── SOL-2c  Shareable session URL that pre-fills downstream forms
    │
    ├── OPP-3  I cannot tell whether my inputs are detailed enough to
    │          produce a useful prompt
    │   ├── SOL-3a  Inline completeness score / field-level hints
    │   ├── SOL-3b  "Improve my inputs" AI pre-fill suggestion on blur
    │   └── SOL-3c  Example toggle that shows a filled-in sample alongside blank fields
    │
    ├── OPP-4  I lose my work if I close the tab or refresh the page
    │   ├── SOL-4a  Auto-save form state to localStorage on every keystroke
    │   ├── SOL-4b  Named sessions saved to browser storage with a session list view
    │   └── SOL-4c  Export / import session as JSON
    │
    ├── OPP-5  The generated prompt is a black box — I do not know
    │          what sections will be in the final document
    │   ├── SOL-5a  Table-of-contents preview before copying the prompt
    │   ├── SOL-5b  Section toggle — let users add/remove TOC sections before generation
    │   └── SOL-5c  "What will this produce?" expandable explanation panel
    │
    ├── OPP-6  I want to use Claude / my preferred AI, not just ChatGPT,
    │          but the AI generation button only calls OpenAI
    │   ├── SOL-6a  Model selector (OpenAI, Anthropic Claude, Google Gemini)
    │   ├── SOL-6b  Prompt-only mode with a "Copy & open in Claude.ai" deep-link
    │   └── SOL-6c  Provider-agnostic API key storage with per-provider routing
    │
    └── OPP-7  I struggle to adapt the generated Korean document for an
               English-speaking stakeholder or vice versa
        ├── SOL-7a  Language selector (Korean / English) that rewrites guidelines
        ├── SOL-7b  Post-generation one-click translation via OpenAI
        └── SOL-7c  Bilingual output mode (Korean + English sections)
```

---

## Prioritized Opportunities

Scoring method: **Opportunity Score = Importance × (1 − Satisfaction)**, both axes rated 0–1.

- **Importance** is estimated from how directly the pain blocks the desired outcome (chain completion). A pain that prevents any progress scores highest.
- **Satisfaction** is estimated from current product state: whether any partial solution already exists in the UI.

| # | Opportunity | Importance | Current Satisfaction | Opp. Score | Notes |
|---|-------------|:----------:|:-------------------:|:----------:|-------|
| OPP-2 | Must manually copy-paste output between generators | 0.90 | 0.05 | **0.86** | No handoff mechanism exists; user must open a new tab, copy raw text, paste manually |
| OPP-1 | Unclear ordering / no guided workflow | 0.85 | 0.15 | **0.72** | Downstream forms show a warning banner linking to prior steps, but no step-by-step flow |
| OPP-4 | Work lost on page refresh / tab close | 0.75 | 0.10 | **0.68** | No persistence layer for form state |
| OPP-3 | Cannot gauge whether inputs are good enough | 0.70 | 0.20 | **0.56** | "Fill Example" button hints at what good input looks like, but no live guidance |
| OPP-5 | Prompt output is opaque before generation | 0.60 | 0.25 | **0.45** | Prompt is shown only post-generation in a dialog |
| OPP-6 | AI generation locked to OpenAI GPT-4o only | 0.55 | 0.30 | **0.39** | API key modal and OpenAI client are hardcoded |
| OPP-7 | Korean-only output limits international use | 0.45 | 0.40 | **0.27** | All guidelines explicitly instruct Korean output |

**Top 3 opportunities by score: OPP-2, OPP-1, OPP-4.**

---

## Top Solutions (for top 3 opportunities)

### OPP-2 — Manual copy-paste breaks flow between generators

| Solution | Perspective | Key Assumption | Risk |
|----------|-------------|----------------|------|
| SOL-2a: Session context store — persist prior outputs in Zustand/localStorage, auto-inject into next generator's context section | Engineer | Users follow the canonical PRD → IA → Use Cases → Design order consistently enough that auto-injection is accurate > 80% of the time | Wrong assumption: users may run generators out of order or for different projects simultaneously |
| SOL-2b: "Send to next tool" button in the result dialog (e.g., after PRD: "Proceed to IA") that navigates and pre-fills the context textarea | Designer | A single primary CTA is sufficient; users do not need to branch non-linearly | Risk: the "next page" button already exists in some generators but does not carry context — low-effort delta |
| SOL-2c: Shareable session URL (base64 or short-code) that encodes all form values and the generated prompt | PM | Sharing workflows between teammates is a real use case (team PM + developer collaboration) | Implementation effort is medium-high; requires URL state serialization |

**Recommended: SOL-2b first (lowest effort, highest signal), then SOL-2a if adoption confirms the sequential workflow assumption.**

---

### OPP-1 — Unclear ordering / no guided workflow

| Solution | Perspective | Key Assumption | Risk |
|----------|-------------|----------------|------|
| SOL-1a: Persistent top-of-page stepper (Step 1: PRD → Step 2: IA → ...) shown on all generator pages, with completion checkmarks stored in localStorage | Designer | Users are willing to follow a prescribed linear workflow and will not find the stepper patronizing | Risk: power users may resent enforced linearity |
| SOL-1b: First-visit onboarding modal ("How to use these tools in 5 steps") triggered once, skippable | PM | First-time visitors are confused and would benefit from orientation before touching the forms | Risk: modals are dismissed without reading; conversion impact is unclear |
| SOL-1c: Home page workflow diagram (visual flowchart: PRD → IA → Use Cases → Design, with TRD as an optional parallel track) with direct CTAs per step | Engineer | Home page is the primary landing; most users start there | Current home page lists tools as unordered cards with no sequencing signal |

**Recommended: SOL-1c first (home page diagram, no new pages required), then SOL-1a.**

---

### OPP-4 — Work lost on page refresh

| Solution | Perspective | Key Assumption | Risk |
|----------|-------------|----------------|------|
| SOL-4a: Auto-save all form field values to localStorage keyed by generator (e.g., `bji_prd_draft`) on every `onChange` event, restore on mount | Engineer | Users want exactly their last session restored, not a blank slate | Risk: stale/irrelevant data pre-fills could confuse returning users; needs a "Clear / Start fresh" escape hatch |
| SOL-4b: Named sessions in a browser-local session list (sidebar or dropdown), allowing users to maintain multiple drafts per generator | Designer | Users work on multiple products simultaneously and need to switch between drafts | Over-engineered for an MVP audience; adds UI complexity |
| SOL-4c: "Export session as JSON / Import session" for explicit save-and-restore | PM | Users are comfortable with JSON and file management (developer persona) | Low discoverability for non-technical users |

**Recommended: SOL-4a only (simple, invisible, high value). SOL-4c as a secondary feature for the developer persona.**

---

## Recommended Experiments

| # | Tests Assumption | Solution Tested | Method | Success Criteria | Effort |
|---|-----------------|-----------------|--------|-----------------|--------|
| EXP-1 | Users who see a "Proceed to IA" button carrying PRD context click through at a higher rate than baseline | SOL-2b | Add a "Send to IA" button in the PRD result dialog that navigates to `/ia` with the generated PRD stored in sessionStorage; IA form displays a "PRD context loaded" banner | Click-through from PRD result to `/ia` increases by >25% vs. baseline (direct navigation) within 2 weeks | Low — 1–2 days dev; no backend |
| EXP-2 | A visual workflow diagram on the home page increases first-step entry rate | SOL-1c | Replace the unordered tool cards on the home page with a sequenced workflow section: "Step 1 → Step 2 → ..." each card numbered and ordered | % of home page sessions that click any generator CTA increases by >15% within 2 weeks | Low — frontend copy/layout only |
| EXP-3 | Auto-restored form state reduces abandonment before submission | SOL-4a | Implement localStorage auto-save for the PRD form (largest / most complex form); track submit events for users who return to an auto-filled form vs. those who see a blank form | Submit rate for returning users (auto-filled form) is >40% higher than for new-session blank forms | Low — 1 day dev |
| EXP-4 | Completeness hints improve prompt quality perception | SOL-3b | On the PRD form, add a word-count progress indicator and brief hint text under "Product Overview" (e.g., "Aim for 2–3 sentences describing the problem, users, and platform") | Post-generation user-reported satisfaction (1-click star rating in result dialog) increases vs. control | Medium — requires rating UI + A/B split |

---

## Key Assumptions to Monitor

1. **Sequential workflow assumption** — Users intend to run all 5 generators in order for the same project. If analytics show most users run only 1–2 generators, the chain-completion outcome metric itself may be the wrong target.
2. **Korean-first user assumption** — The entire product is Korean-output oriented. If international traffic grows, OPP-7 (language selector) will rise in priority.
3. **Prompt-only vs. AI-generation split** — The "AI Generation" button (calling OpenAI directly) exists but requires the user to supply a key. If the majority of users use only copy-paste and never touch the AI generation feature, solutions that optimize the AI path (SOL-6a) have lower ROI.
4. **Use Cases form has no inputs** — The current UsecaseForm component accepts zero structured inputs and simply generates a static generic prompt. This is the lowest-fidelity generator and a candidate for a separate discovery cycle.

---

## Discovery Loop Notes

- **Next interview questions**: Ask 5 users "walk me through the last time you used these tools end-to-end." Look for where they paused, switched apps, or gave up.
- **Missing data**: No analytics are instrumented beyond Google Analytics page views. Before running EXP-1–3, add `button_click` events on "Generate/Copy Prompt" and "Copy" in the result dialog per generator.
- **Loop-back trigger**: If EXP-1 shows < 10% click-through even with context handoff, revisit whether OPP-2 is the real pain — the root cause may be OPP-1 (users do not understand the sequence exists at all).

---

*Based on Opportunity Solution Tree from [pm-skills](https://github.com/phuryn/pm-skills) by Pawel Huryn (MIT License). Framework: Teresa Torres, Continuous Discovery Habits.*
