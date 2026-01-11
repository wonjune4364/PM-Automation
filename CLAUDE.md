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
