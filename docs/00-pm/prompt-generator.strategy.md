## Strategy Analysis: Prompt Generator Suite (PRD / TRD / IA / Use Cases / Design)

> BJI-IT (NextCursor) — Next.js 15 web application
> Document date: 2026-04-04
> Author: PM Strategy Agent

---

### Value Proposition (JTBD 6-Part)

| Part | Content |
|------|---------|
| **Who** | Korean-speaking developers, startup PMs, and "vibe coders" (non-technical idea owners) who are building digital products with AI assistance. They lack formal PM or technical writing training, work solo or in micro-teams, and are time-pressured to ship. |
| **Why** | They need to produce professional-grade planning documents (PRD, TRD, IA, Use Cases, Design Guide) so that AI coding tools (Claude, ChatGPT, Cursor) can generate accurate, contextually aligned code and designs without constant correction. The core JTBD: "When I am starting a new product or feature, help me turn my idea into structured AI prompts that produce production-quality documentation in Korean — so I can start building immediately instead of spending hours structuring input for AI tools." |
| **What Before** | Users write freeform, unstructured prompts to ChatGPT or Claude, receive generic or shallow documents, and spend 1–3 hours revising. Alternatively they copy templates from Notion or Google Docs that are not AI-optimised and require manual Korean translation. Technical users know what they want but not how to express it for an LLM. Non-technical vibe coders don't know the PM vocabulary at all. The result: poor AI output, rework, and delayed development starts. |
| **How** | A guided, form-based input layer (overview, features, target users, platform, tech stack) generates structured, XML-tagged prompts proven to perform well with Claude and GPT-4o. Five specialised generators cover the full pre-development lifecycle in sequence (PRD → TRD → IA → Use Cases → Design). Output is instantly copyable or directly sent to OpenAI API for one-click document generation as a downloadable Markdown file. All documents are written in Korean, removing the language barrier for the target market. |
| **What After** | Users receive a production-quality Korean planning document in under 5 minutes that serves as a reliable context source for AI coding tools. Development can begin the same day. Vibe coders gain confidence to direct technical conversations. PMs have defensible documentation without hiring a consultant. Developers can hand off requirements to junior teammates or contractors with confidence. |
| **Alternatives** | (1) Raw prompting to ChatGPT/Claude — free but inconsistent; requires PM domain knowledge and English proficiency. (2) Notion AI / ClickUp AI — embedded in PM tools but not Korean-first, not AI-prompt-optimised, and subscription-gated. (3) Hiring a freelance PM or tech writer — higher quality ceiling but 10-100x the cost and 2–5 day lead time. (4) GitHub Copilot / Cursor for code-first users — misses the pre-code planning layer entirely. NextCursor wins on: Korean-first output, zero-cost entry, sequential 5-stage coverage, and XML-tagged prompts that outperform generic templates with modern LLMs. |

**Value Prop Statement**: NextCursor is the only Korean-first, AI-optimised prompt generation suite that walks solo developers and vibe coders through the entire pre-development planning lifecycle — from PRD to Design Guide — in under 10 minutes, so they can feed structured context to AI tools and ship faster without PM expertise.

---

### Lean Canvas

| Section | Content |
|---------|---------|
| **Problem** | 1. Writing effective AI prompts for planning documents requires PM domain knowledge most developers lack. 2. Generic AI prompts produce shallow, English-biased documents that need heavy revision before they are usable in Korean-market products. 3. Existing PM tools (Notion, Linear, ClickUp) are not designed to produce AI-ready, structured prompt output — they manage work, not generate planning artefacts. |
| **Solution** | 1. Five sequential, form-guided prompt generators that map directly to the pre-development workflow (PRD → TRD → IA → Use Cases → Design). 2. XML-tag-structured output format that maximises LLM instruction-following accuracy. 3. One-click OpenAI API integration that converts the generated prompt directly into a downloadable Korean Markdown document — no copy-paste required. |
| **UVP** | The fastest way to get AI-ready, Korean planning documents — from idea to structured PRD, TRD, IA, Use Cases, and Design Guide in one sitting. No PM background needed. |
| **Unfair Advantage** | (1) Sequential document chaining: each generator is designed to build on the previous output (PRD feeds IA, IA feeds Use Cases), creating a natural lock-in within the workflow session. (2) Korean-first output: trained Korean-language prompt engineering is difficult to replicate without domain expertise and iteration investment. (3) Zero-cost, no-login entry: frictionless acquisition that established SaaS competitors (Notion AI, ClickUp) cannot match structurally. (4) Brand association with BJI-IT's developer community (FastCampus affiliation visible in assets), lending credibility with the Korean developer audience. |
| **Customer Segments** | Primary: Korean solo developers (indie hackers, side-project builders) aged 25–40 who use AI tools daily and are starting new projects. Secondary: Startup PMs in early-stage Korean startups (seed to Series A) without dedicated technical writers. Early adopters: "Vibe coders" — non-technical founders or designers who use ChatGPT/Claude to build products but struggle with structured documentation. Market size: ~800K active developers in South Korea + growing vibe coder segment estimated at 200K+ (AI-assisted product builders). |
| **Channels** | (1) Organic SEO: long-tail Korean search terms ("PRD 작성 AI", "개발 문서 프롬프트 생성"). (2) Developer communities: Disquiet, Okky, Reddit Korea, X (formerly Twitter) Korean dev accounts. (3) YouTube / blog tutorials targeting vibe coders and indie hackers. (4) Google AdSense (already integrated) for discovery monetisation. (5) FastCampus / educational platform partnerships for student segments. |
| **Revenue Streams** | Current: Google AdSense display advertising (CPM model, low yield). Near-term: (1) Freemium — free tier with usage limits (e.g., 5 prompts/day), paid plan at ₩9,900/month for unlimited + history. (2) OpenAI API pass-through premium tier: hosted generation without user supplying own key, ₩19,900/month. (3) Team/startup tier: shared workspace + export to Notion/Confluence, ₩49,000/month per team. Long-term: template marketplace where community contributes domain-specific prompt templates (SaaS, e-commerce, fintech). |
| **Cost Structure** | Fixed: hosting (Vercel, ~$20/month), domain, Next.js infrastructure. Variable: OpenAI API token costs for users who use the hosted generation tier (pass-through cost, to be built into pricing margin). Google Sheets API (subscription storage, near-zero cost). Key cost driver at scale: AI API costs and customer support. CAC is near-zero currently (organic/SEO). |
| **Key Metrics** | North Star: Weekly Active Prompt Generators (unique users who generate at least one prompt per week). Activation: % of visitors who complete at least one full form and generate a prompt (target: >25%). Retention: 30-day return rate (target: >30% for registered users). Revenue: MRR from premium subscriptions. Engagement: sequential usage rate (% of PRD users who also use TRD or IA in same session). Quality signal: OpenAI API generation usage rate (users who trust the output enough to trigger direct generation). |

---

### Key Assumptions to Validate

| # | Assumption | Risk Level | Validation Method |
|---|-----------|------------|-------------------|
| 1 | Korean developers and vibe coders actively search for AI prompt generators in Korean for planning documents | High | Google Search Console keyword data; run 2-week SEO experiment with Korean long-tail landing pages |
| 2 | XML-tagged prompt structure produces meaningfully better LLM output than freeform prompts, and users perceive this difference | High | A/B test: show users two outputs (structured vs. freeform prompt) and measure perceived quality rating; track re-generation rate |
| 3 | Users will complete the full 5-generator workflow sequentially in one session | Medium | Add session analytics to track cross-generator navigation; measure drop-off between PRD → TRD → IA |
| 4 | Vibe coders (non-technical founders) can understand and complete the form inputs without guidance | Medium | Usability test with 5 non-technical participants; measure form completion rate and error frequency |
| 5 | Users are willing to pay ₩9,900–₩19,900/month for unlimited generation or hosted API access | High | Run a waitlist with pricing page before building paywall; measure email conversion rate |
| 6 | Korean-language output is a decisive differentiator over using English-language tools and translating | Medium | User interview: ask directly whether Korean output influenced their choice; survey NPS by language preference |
| 7 | OpenAI API integration (user-supplied key) creates enough trust for users to generate directly rather than just copying prompts | Medium | Track ratio of "AI Generation" button clicks vs. "Copy" button clicks in analytics |
| 8 | Sequential document chaining (PRD feeds IA, etc.) increases session depth and retention | Medium | Instrument cross-generator navigation events; compare 30-day retention between single-doc users and multi-doc users |

---

### Strategic Synthesis

The prompt-generator suite occupies a clear and defensible niche: **the pre-code AI planning layer for Korean-market builders**. The core strategic insight is that the value is not the document itself — it is the structured, LLM-optimised prompt that reliably produces a good document. This is a positioning angle no Korean-language competitor currently owns explicitly.

The immediate priority is validating assumptions #1 and #5 (demand signal and willingness to pay) before investing in the premium infrastructure. The sequential workflow architecture is the product's strongest retention mechanic and should be made more explicit in the UX — e.g., a "continue to next step" flow that surfaces TRD immediately after PRD generation. The vibe coder segment is the highest-growth opportunity but requires the most UX investment to reduce form completion friction (example prefill, contextual help, tooltips).

---

*Based on JTBD 6-Part Value Proposition by Pawel Huryn & Aatir Abdul Rauf, and Lean Canvas by Ash Maurya.*
*Framework source: [pm-skills](https://github.com/phuryn/pm-skills) by Pawel Huryn (MIT License).*
