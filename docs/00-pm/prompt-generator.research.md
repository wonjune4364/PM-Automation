# Market Research: Prompt Generator Suite (PRD / TRD / IA / Use Cases / Design)

> Product: BJI-IT (NextCursor) — Next.js 15 web application
> Date: 2026-04-04
> Scope: Five sequential AI documentation prompt generators targeting Korean-speaking developers, PMs, and non-technical "vibe coders"

---

## User Personas

### Persona 1: Jiseong — The Solo Vibe Coder

| Attribute | Details |
|-----------|---------|
| Demographics | Age 24–32, self-taught builder; CS degree optional; active on X/Twitter and YouTube; uses Cursor, Claude, ChatGPT daily; side-project or early-stage startup context |
| Primary JTBD | Ship a working MVP from idea to deployed product without a dedicated PM or tech co-founder, using AI for every non-coding step |
| Pain Points | 1. **Documentation paralysis**: Knows what to build but freezes when asked to write a PRD; blank-page anxiety kills momentum. 2. **Prompt quality gap**: Generic ChatGPT prompts return generic documents; output quality is inconsistent and often in English when Korean output is required. 3. **Workflow fragmentation**: Switches between Notion, ChatGPT, Cursor, and various templates with no linking logic between artefacts — PRD and TRD are unrelated documents. |
| Desired Gains | 1. A single starting point that converts a rough product idea into a shareable, professional PRD in under 10 minutes. 2. Korean-language output that can be sent directly to freelance Korean developers without translation overhead. 3. A clear "what to do next" breadcrumb — the sequential flow (PRD → TRD → IA → Use Cases → Design) removes decision fatigue. |
| Unexpected Insight | Vibe coders do not primarily value accuracy of the generated document — they value the confidence boost of having *something written down*. The act of filling out a structured form changes their mental state from "I have an idea" to "I have a product spec," which unblocks them from starting. The tool is as much a psychological trigger as a documentation utility. |
| Product Fit | Strong fit. The guided form with mandatory fields (overview, must-features, target users, platforms) enforces minimum viable thinking. The sequential next-page CTA (e.g., "Go to TRD") closes the workflow loop. Friction point: the OpenAI API key requirement for direct generation creates a setup barrier for users who have never used API keys. |

---

### Persona 2: Minjun — The Junior PM at a Korean Startup

| Attribute | Details |
|-----------|---------|
| Demographics | Age 27–35, 1–3 years of PM experience; works at a Series A/B Korean SaaS startup; manages 1–2 engineers; English reading proficiency moderate, writing weak; uses Jira, Confluence, Slack |
| Primary JTBD | Produce professional-quality technical documentation fast enough to keep up with engineering sprint cycles, without being blocked by writing skill gaps or lack of senior PM mentorship |
| Pain Points | 1. **Korean documentation standard**: Most PRD templates online are English; adapting them to Korean corporate expectations (formal register, specific section order) takes 2–4 hours per document. 2. **Coverage anxiety**: Junior PMs worry about missing sections (security requirements, rollback plan, performance SLAs) — a blank template provides no guardrails. 3. **Stakeholder alignment tax**: Documents written ad-hoc require multiple revision rounds; structured output from a reliable template reduces revision cycles. |
| Desired Gains | 1. TRD output that covers the 10 canonical sections (architecture, API design, security, CI/CD, risk analysis) without needing to remember what to include. 2. Outputs formatted for immediate paste into Confluence or Notion with minimal editing. 3. Credibility signal — a structured, comprehensive document increases perceived competence with engineering leads. |
| Unexpected Insight | Junior PMs use AI documentation tools as a learning mechanism, not just a productivity tool. They read the generated TRD to understand what a senior PM would have written, then reverse-engineer their own thinking. The tool is a mentor substitute. This means output quality has an outsized trust-building effect with this segment. |
| Product Fit | Strong fit for TRD and Use Cases generators specifically, which are the documents junior PMs find hardest to write from scratch. The detailed Korean-language TRD prompt (10 structured sections, response guidelines, quality standards) aligns precisely with this persona's needs. Friction point: the tool generates a prompt to paste into ChatGPT, adding one manual step; direct generation via OpenAI integration partially addresses this. |

---

### Persona 3: Hyunah — The Design-Aware Frontend Developer

| Attribute | Details |
|-----------|---------|
| Demographics | Age 28–38, 3–7 years frontend experience; React/Next.js stack; works at an agency or small product team; owns both implementation and design decisions in the absence of a dedicated designer; Figma user but not a trained designer |
| Primary JTBD | Translate a product idea into a coherent, implementable design system and page-level component specification without engaging a UI/UX designer, while ensuring the output is compatible with Tailwind CSS and component library conventions |
| Pain Points | 1. **Design system from scratch cost**: Creating a color palette, typography scale, and component hierarchy for each new project consumes 4–8 hours even for experienced developers. 2. **Design-to-code translation gap**: Generic design docs use abstract language ("modern", "minimal"); the developer needs specific Tailwind palette hex values and breakpoint-aware layout rules. 3. **Inconsistency across documents**: IA document and Design document are written independently and contradict each other on page names, component names, and navigation patterns. |
| Desired Gains | 1. A Tailwind-ready color palette (primary-500, secondary, accent, neutral with hex codes) generated from a single base color or reference service. 2. Page-level design specifications that name actual components (not just "card" but a card with image, title, CTA) and specify responsive behavior at 320 / 768 / 1024 / 1440 breakpoints. 3. An IA output and Design output that share vocabulary — the same page names, URL structure, and component names across both documents. |
| Unexpected Insight | Frontend developers using this tool are not primarily optimizing for design quality — they are optimizing for defensibility. A written design guide makes it easier to push back on ad-hoc feature requests from non-technical stakeholders ("this is outside the agreed design system"). The document is a boundary-setting artifact as much as a creative one. |
| Product Fit | Strong fit for the Design Prompt Generator, which explicitly produces Tailwind color palettes with hex codes, responsive breakpoints, and page-level component guides. The auto-theme option (analyze reference service and suggest design) is a key differentiator for this persona. Friction point: the IA and Design generators do not share a data model — the user must manually copy context from one generator to the next, risking inconsistency. |

---

## Competitive Landscape

### Competitor Profiles

#### Competitor 1: Notion AI

| Attribute | Details |
|-----------|---------|
| Company Profile | Notion Labs, founded 2016, ~$10B valuation (2021), ~$330M raised. Market focus: team productivity and knowledge management. Positioning: "the connected workspace." |
| Core Strengths | Native integration with existing Notion docs and databases; flexible templates including PRD templates; AI writing assistance baked into the editor; strong brand trust in Korean startup ecosystem; multi-language support |
| Weaknesses & Gaps | AI assistance is generic — it does not know the developer-specific document structure (TRD sections, IA component hierarchy, Use Case actors). No sequential workflow between document types. Output is not optimized for Korean-language technical documentation conventions. Requires Notion subscription for AI features. |
| Business Model & Pricing | Freemium; AI add-on $10/user/month (Plus plan $10, Business $18, Enterprise custom). |
| Threat Assessment | Medium. Notion is where Korean startups store docs, so users may prefer to generate within Notion. However, Notion AI does not solve the "what to put in the PRD" problem — it only helps you write faster once you know what to write. |

| Dimension | Assessment |
|-----------|-----------|
| **Our Opportunity** | Offer opinionated, developer-centric document structure that Notion AI cannot provide. Position as the "generator" that feeds into Notion as the "storage." |

---

#### Competitor 2: GitHub Copilot (+ Copilot Chat / Workspace)

| Attribute | Details |
|-----------|---------|
| Company Profile | Microsoft/GitHub, launched 2021. Market focus: in-IDE code and documentation generation. Positioning: "AI pair programmer." GitHub Workspace (2024) extends to project planning. |
| Core Strengths | Deep IDE integration; code-aware context; Copilot Workspace generates issue-to-code plans; very large user base (1.8M+ paid subscribers as of 2024); continuous Microsoft investment |
| Weaknesses & Gaps | Workspace is code/issue-centric, not document-centric; no Korean-language documentation focus; no structured form input for non-technical users (vibe coders cannot use it); no separation of PRD/TRD/IA/Design as distinct workflows; not free |
| Business Model & Pricing | Individual $10/month, Business $19/user/month, Enterprise $39/user/month |
| Threat Assessment | Low-medium for the current user segments. Copilot targets experienced developers, not vibe coders or junior PMs. The Workspace feature is a potential long-term threat if it expands to structured documentation. |

| Dimension | Assessment |
|-----------|-----------|
| **Our Opportunity** | Non-technical and junior users are completely underserved by Copilot. Free access with zero setup is a direct contrast to Copilot's subscription requirement. |

---

#### Competitor 3: Linear (+ Linear Asks / AI features)

| Attribute | Details |
|-----------|---------|
| Company Profile | Linear, founded 2019, ~$35M raised, ~$400M valuation. Market focus: software project management for product teams. Positioning: "the system for modern software development." |
| Core Strengths | Best-in-class issue and project management UX; AI-assisted spec writing via Linear Asks; strong traction among Korean developer-centric startups; integrates with GitHub, Figma, Slack |
| Weaknesses & Gaps | AI spec generation is ancillary to project management — it does not produce standalone PRD/TRD documents; no IA or design guide generation; output is English-first; no free tier for AI features; requires team context (not useful for solo builders) |
| Business Model & Pricing | Free (limited), Basic $8/user/month, Business $16/user/month |
| Threat Assessment | Low. Linear is a project management tool that incidentally generates specs, not a documentation tool. Different primary job-to-be-done. |

| Dimension | Assessment |
|-----------|-----------|
| **Our Opportunity** | Target the pre-Linear phase — when a solo builder or small team needs to produce documents before they have a Linear workspace set up. |

---

#### Competitor 4: Cursor (AI Code Editor) + Rules/Docs features

| Attribute | Details |
|-----------|---------|
| Company Profile | Anysphere, founded 2022, raised ~$400M (Series B 2024, $9B valuation). Market focus: AI-first code editor. Positioning: "build software faster." |
| Core Strengths | Dominant position in the Korean vibe-coder community (the product is literally named "NextCursor" after Cursor); .cursorrules and @docs features let users attach documentation to AI context; massive community-driven prompt sharing; fast-growing free tier |
| Weaknesses & Gaps | Cursor does not generate structured documentation artefacts; .cursorrules files are user-maintained and unformatted; no guided form for non-technical users; no Korean-specific documentation templates; the prompt quality for PRD/TRD depends entirely on the user's own prompt engineering skill |
| Business Model & Pricing | Hobby free (2000 completions/month), Pro $20/month, Business $40/user/month |
| Threat Assessment | High — indirect. The target audience of NextCursor is the Cursor user community. If Cursor adds native documentation generation (e.g., a "Generate PRD from project context" feature), it would cannibalize the use case directly. |

| Dimension | Assessment |
|-----------|-----------|
| **Our Opportunity** | Position as the "pre-Cursor workflow" — generate your docs here, then paste them into Cursor as context. The sequential flow (PRD → TRD → IA → Use Cases → Design) maps directly to what Cursor users need to have ready before starting a project. |

---

#### Competitor 5: Eraser.io (formerly Docusaurus AI / DiagramGPT)

| Attribute | Details |
|-----------|---------|
| Company Profile | Eraser, founded 2021, seed-funded (~$4M). Market focus: technical documentation and diagramming for engineering teams. Positioning: "the technical doc tool built for engineers." |
| Core Strengths | AI-powered diagram generation (system architecture, ERD, sequence diagrams) from natural language; technical doc templates (PRD, RFC, architecture docs); clean editor UX; free tier available; integrates with GitHub |
| Weaknesses & Gaps | English-only output; no sequential document workflow; no Korean localization; diagramming focus means PRD/IA templates are secondary; limited form-based input (blank canvas approach); small user base outside North America |
| Business Model & Pricing | Free (limited), Pro $8/month, Team $15/user/month |
| Threat Assessment | Medium. Eraser is the closest structural analog — a web-based tool generating technical documentation artefacts. However, its English-only, diagram-centric approach leaves the Korean developer market underserved. |

| Dimension | Assessment |
|-----------|-----------|
| **Our Opportunity** | Korean language output, mobile-accessible web UI, and the guided form approach (vs. blank canvas) serve a different user mental model. Eraser targets experienced engineers comfortable with blank-canvas tools; NextCursor targets users who need guardrails. |

---

### Competitive Positioning Summary

| Competitor | Strengths | Weaknesses | Our Opportunity |
|-----------|-----------|------------|-----------------|
| Notion AI | Brand trust, Notion integration, multi-language | Generic AI, no dev-specific structure, paid | Be the opinionated PRD/TRD generator that feeds into Notion |
| GitHub Copilot | IDE integration, massive user base, code-aware | Not document-focused, no free tier, English-first | Own the non-technical and junior user segments entirely |
| Linear | Best-in-class PM UX, startup adoption | PM tool first, no standalone docs, English-first | Cover the pre-project phase before Linear is adopted |
| Cursor | Vibe coder community dominance, free tier | No structured doc generation, no Korean templates | Position as "Cursor context preparation" — the upstream workflow |
| Eraser.io | Technical doc templates, diagramming, free tier | English-only, blank canvas, small APAC presence | Korean language + guided forms serve a distinct user mental model |

**Differentiation Strategy**

Three dimensions create a defensible position:

1. **Korean-first, developer-specific output**: Every prompt is engineered to produce Korean-language documents with Korean-specific conventions (e.g., 개인정보보호법 compliance in TRD, Korean UI text in design guides). No competitor offers this.

2. **Sequential workflow with document lineage**: The PRD → TRD → IA → Use Cases → Design chain is a unique structural feature. Each step references prior outputs, creating document coherence that single-shot generators cannot match. This is the product's strongest long-term moat.

3. **Zero-friction free access**: No account required, no subscription, no IDE installation. A vibe coder can go from idea to five structured AI prompts in under 20 minutes. The AdSense model means the cost is fully externalized — users pay nothing.

The recommended positioning statement: *"The only free, Korean-language documentation prompt suite that takes your idea from PRD to design guide in one sequential workflow — built for Cursor users who need to think before they code."*

---

## Market Sizing

### Definitions

- **TAM**: Global market for AI-assisted developer documentation and specification tooling (all languages, all user types)
- **SAM**: Korean-language market for AI documentation tools targeting developers, PMs, and non-technical builders
- **SOM**: Achievable user and revenue share for NextCursor within 1–3 years given free-tool / AdSense model

---

### Top-Down Method

**Global AI Developer Tools Market**

The global AI developer tools market (including code assistants, documentation generators, and project specification tools) was estimated at approximately $4.8B in 2024, growing at a CAGR of ~27% (MarketsandMarkets, IDC 2024 estimates). Narrowing to documentation and specification tools specifically (excluding pure code completion), this segment represents approximately 12–15% of the total market, or roughly $580M–720M globally in 2024.

Korean developer tools market: South Korea has approximately 600,000–700,000 active software developers (KISDI 2023, NIPA 2024 estimates). Korea's share of global software developer population is approximately 1.2–1.5%. Applying a proportional slice to the global AI documentation tools market yields a Korean SAM of approximately $7M–$11M annually.

Adjusting for the free-tool segment (tools monetized via ads or freemium rather than direct subscription): approximately 35–45% of documentation tool usage in Korea occurs on free or ad-supported tools (vs. enterprise subscription), based on app adoption patterns in the Korean startup ecosystem. This yields an ad-monetizable SAM of approximately $2.5M–$5M in indirect value (advertising inventory equivalent).

**3-Year Projection (Top-Down)**

Applying the 27% CAGR: by 2028, the Korean AI documentation tools SAM reaches approximately $14M–$22M. The free/ad-supported slice scales proportionally to $4.5M–$8M.

---

### Bottom-Up Method

**Unit Economics**

- Target active monthly users (MAU) at 18 months post-launch: 8,000–15,000 (based on comparable Korean free developer tools — e.g., similarly-scoped tools on Okky.kr, Velog community, Product Hunt KR launches)
- Average page sessions per MAU per month: 3.5 (multi-tool users visit PRD then TRD then IA in one session, plus return visits)
- AdSense CPM for Korean developer audience: $1.50–$3.00 (Korean tech audience CPM is lower than US/EU but higher than general Korean web traffic; developer audiences command a premium)
- Ad impressions per session: 2–3
- Monthly ad revenue at 10,000 MAU: 10,000 MAU × 3.5 sessions × 2.5 impressions × $2.25 CPM / 1,000 = ~$197/month at base case

At 50,000 MAU (24-month target if product-market fit is achieved via Cursor community distribution): ~$984/month (~$11,800/year)

**SOM — Realistic 1–3 Year Capture**

| Scenario | MAU | Annual Ad Revenue | Notes |
|----------|-----|-------------------|-------|
| Conservative (Year 1) | 5,000 | ~$2,500 | Organic search + Cursor community word-of-mouth |
| Base (Year 2) | 25,000 | ~$12,500 | YouTube/blog distribution, FastCampus community |
| Optimistic (Year 3) | 80,000 | ~$40,000 | Viral distribution via X/Twitter vibe coder community, potential premium tier |

Note: These figures reflect AdSense-only monetization. A freemium upgrade path (e.g., saved projects, team workspaces, direct GPT-4o generation without user API key) could expand revenue by 5–10x at the base scenario.

---

### Summary Table

| Metric | Current (2024) | 3-Year Projection (2027) | Method |
|--------|---------------|--------------------------|--------|
| TAM | ~$580M–720M | ~$1.1B–1.4B | Top-down: global AI dev documentation tools segment |
| SAM | ~$7M–11M | ~$14M–22M | Top-down: Korean developer market slice (27% CAGR) |
| SOM (ad revenue) | ~$2,500/yr | ~$40,000/yr | Bottom-up: MAU × CPM × sessions × impressions |
| SOM (if freemium) | — | ~$200,000–400,000/yr | Bottom-up: 3–5% of MAU at $5–8/month premium tier |

---

### Growth Drivers

1. **Vibe coding adoption acceleration**: The "vibe coding" phenomenon (non-technical builders using AI to build software) is growing rapidly in Korea, driven by Cursor adoption, YouTube tutorials, and FastCampus courses. This expands the total addressable user base beyond professional developers.

2. **Korean AI regulation and documentation requirements**: Korea's Personal Information Protection Act (PIPA) amendments and emerging AI governance guidelines increase demand for structured, auditable technical documentation — particularly TRD and Use Case documents that capture security and privacy decisions.

3. **Cursor community as a distribution channel**: NextCursor is named after and positioned for the Cursor editor community. As Cursor's Korean user base grows (estimated 150,000+ Korean users in 2024), the natural demand for "what to paste into Cursor before coding" grows in lockstep.

4. **Sequential workflow stickiness**: Users who complete the full PRD → Design workflow develop a habitual return pattern. Each new project restarts the cycle. Unlike one-shot tools, the multi-step workflow creates repeated engagement per user per project.

5. **Market contraction risk**: If Cursor, Claude, or ChatGPT adds a native "generate PRD for this project" feature with Korean output, direct substitution is possible. This risk is partially mitigated by the guided form UX and the sequential workflow structure, which no LLM chat interface currently replicates.

---

### Key Assumptions

1. Korean developer population of 600,000–700,000 active developers. (Confidence: **Medium** — KISDI and NIPA figures vary; "active" definition is inconsistent across sources.)
2. 27% CAGR for global AI developer tools market sustained through 2027. (Confidence: **Medium** — adoption is accelerating but market saturation in code completion tools may reduce blended growth rates.)
3. AdSense CPM of $1.50–$3.00 for Korean developer audience. (Confidence: **Medium** — CPM varies significantly by content category, ad placement, and seasonality; developer-targeted CPMs can reach $4–6 with optimized placements.)
4. 10% of Korean vibe-coder/junior-PM addressable universe (estimated at 50,000–150,000 users) is reachable within 3 years via organic and community distribution. (Confidence: **Low-Medium** — dependent on SEO execution, community partnerships, and absence of dominant competitor launching a Korean-language equivalent.)
5. Free/ad-supported model remains viable without a premium tier for the first 2 years. (Confidence: **High** — AdSense monetization is proven for niche developer tools at this traffic scale; the risk is insufficient revenue to justify continued development, not product failure.)
6. OpenAI API key friction reduces direct generation adoption to <20% of users. (Confidence: **High** — based on observed behavior with other BYOK tools; most free-tool users will use copy-paste to ChatGPT rather than entering API keys.)

---

## Attribution

Framework based on user-personas, competitor-analysis, and market-sizing from
[pm-skills](https://github.com/phuryn/pm-skills) by Pawel Huryn (MIT License).
