# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BJI-IT (NextCursor) - A Next.js 15 web application providing AI development documentation tools. The main tools are prompt generators for creating PRD, IA, TRD, Use Cases, and Design documents, plus developer utilities like color palette generation and table-to-JSON conversion.

## Development Commands

```bash
npm run dev       # Start dev server with Turbopack
npm run build     # Production build (generates sitemap via postbuild)
npm run lint      # Run ESLint
npm run start     # Start production server
```

## Architecture

### Directory Structure

- `src/app/` - Next.js App Router pages
- `src/app/(tools)/` - Tool pages grouped by category (cursor tools, dev tools)
- `src/app/api/` - API routes (e.g., Google Sheets subscription endpoint)
- `src/features/[featureName]/` - Feature modules with collocated components, types, and logic
- `src/components/ui/` - shadcn-ui components
- `src/components/prompt/` - Shared prompt generator layout
- `src/lib/` - Utility functions
- `src/third-parties/` - Third-party integrations (AdSense)

### File Structure

```
src/
├── app/
│   ├── (tools)/
│   │   ├── (cursor)/
│   │   │   ├── design/page.tsx
│   │   │   ├── ia/page.tsx
│   │   │   ├── prd/page.tsx
│   │   │   ├── trd/page.tsx
│   │   │   └── usecases/page.tsx
│   │   └── dev/
│   │       ├── generate-color-palette/page.tsx
│   │       ├── spoid-image-color/page.tsx
│   │       └── table-to-json/page.tsx
│   ├── api/
│   │   └── subscribe/route.ts
│   ├── open-source-license/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── privacy-policy/page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── providers.tsx
├── components/
│   ├── open-source-license/
│   │   ├── LicenseDocument.tsx
│   │   ├── LicenseTable.tsx
│   │   └── PackageJsonForm.tsx
│   ├── prompt/
│   │   └── PromptGeneratorLayout.tsx
│   ├── ui/
│   │   ├── avatar.tsx
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── calendar.tsx
│   │   ├── card.tsx
│   │   ├── checkbox.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── file-upload.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── popover.tsx
│   │   ├── radio-group.tsx
│   │   ├── select.tsx
│   │   ├── separator.tsx
│   │   ├── sheet.tsx
│   │   ├── table.tsx
│   │   ├── tabs.tsx
│   │   ├── textarea.tsx
│   │   ├── toast.tsx
│   │   ├── toaster.tsx
│   │   └── use-toast.ts
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── Markdown.tsx
│   └── PageHeader.tsx
├── features/
│   ├── design/
│   │   ├── components/DesignForm.tsx
│   │   ├── lib/generatePrompt.ts
│   │   ├── page.tsx
│   │   └── types.ts
│   ├── generate-color-palette/
│   │   ├── components/ColorPaletteGenerator.tsx
│   │   ├── lib/colorUtils.ts
│   │   ├── page.tsx
│   │   └── types.ts
│   ├── home/
│   │   └── components/
│   │       ├── HeroSection.tsx
│   │       └── ToolsSection.tsx
│   ├── ia/
│   │   ├── components/IAForm.tsx
│   │   ├── lib/generatePrompt.ts
│   │   ├── page.tsx
│   │   └── types.ts
│   ├── prd/
│   │   ├── components/PRDForm.tsx
│   │   ├── lib/generatePrompt.ts
│   │   ├── page.tsx
│   │   └── types.ts
│   ├── privacy-policy/
│   │   ├── components/PrivacyPolicyForm.tsx
│   │   ├── lib/generatePrivacyPolicy.ts
│   │   ├── page.tsx
│   │   └── types.ts
│   ├── spoid-image-color/
│   │   ├── ColorInfoDisplay.tsx
│   │   ├── ImageColorPicker.tsx
│   │   ├── page.tsx
│   │   └── types.ts
│   ├── table-to-json/
│   │   ├── TableToJsonConverter.tsx
│   │   └── page.tsx
│   ├── trd/
│   │   ├── components/TRDForm.tsx
│   │   ├── lib/generatePrompt.ts
│   │   ├── page.tsx
│   │   └── types.ts
│   └── usecases/
│       ├── components/UsecaseForm.tsx
│       ├── lib/generatePrompt.ts
│       └── page.tsx
├── lib/
│   ├── googleSheets.ts
│   ├── license-utils.ts
│   ├── string.ts
│   └── utils.ts
├── third-parties/
│   └── AdSense.tsx
└── types/
    ├── global.d.ts
    ├── gtag.d.ts
    └── license.ts
```

### Feature Module Pattern

Each feature in `src/features/` follows this structure:
- `page.tsx` - Main feature component (exported as client component)
- `components/` - Feature-specific form components
- `lib/generatePrompt.ts` - Prompt generation logic
- `types.ts` - TypeScript types for the feature

App router pages (`src/app/(tools)/`) import and render the corresponding feature page component.

### Key Shared Components

- `PromptGeneratorLayout` - Reusable layout for prompt generator tools. Handles form rendering, prompt display dialog, clipboard copying, and optional OpenAI API integration for direct generation.

### State Management

- React Query (`@tanstack/react-query`) for server state
- Zustand for global client state
- react-hook-form + zod for form handling and validation

### Third-Party Integrations

- Google AdSense (production only) - `src/third-parties/AdSense.tsx`
- Google Analytics via `@next/third-parties/google`
- Google Sheets API for email subscriptions
- OpenAI API (client-side, user provides key)

## Code Conventions

- Always use `"use client"` directive for components
- Use `promise` for `page.tsx` params props (Next.js 15 requirement)
- Use picsum.photos for placeholder images
- Prefer early returns and descriptive naming
- Follow functional programming principles (immutability, pure functions)
- Korean text: Verify UTF-8 encoding after generating code

## Adding New Components

For shadcn-ui components:
```bash
npx shadcn@latest add <component-name>
```

## Environment Variables

Required for full functionality:
- `NEXT_PUBLIC_GA_ID` - Google Analytics measurement ID
- `GOOGLE_SHEETS_CLIENT_EMAIL` - Service account email for Sheets API
- `GOOGLE_SHEETS_PRIVATE_KEY` - Service account private key
- `GOOGLE_SHEETS_ID` - Target spreadsheet ID
