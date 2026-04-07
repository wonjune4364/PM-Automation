"use client";

import { useCallback, useRef } from "react";
import { PromptGeneratorLayout } from "@/components/prompt/PromptGeneratorLayout";
import { ContextBanner } from "@/components/prompt/ContextBanner";
import { IAForm } from "./components/IAForm";
import { generatePrompt } from "./lib/generatePrompt";

export function IAPage() {
  const priorContextRef = useRef<string>("");

  const handleContextLoaded = useCallback((context: string) => {
    priorContextRef.current = context;
  }, []);

  const helpContent = {
    title: "What is IA?",
    description: (
      <>
        <p>
          IA (Information Architecture) refers to the information structure, designing the structure and navigation system of a website or app.
        </p>
        <p>IA includes the following elements:</p>
        <ul className="list-disc pl-4 space-y-2">
          <li>
            <strong>Sitemap:</strong> Defines the overall page structure and hierarchy.
          </li>
          <li>
            <strong>User Flow:</strong> Designs user journeys for key features.
          </li>
          <li>
            <strong>Navigation Structure:</strong> Designs menu structure and navigation paths.
          </li>
          <li>
            <strong>Content Composition:</strong> Defines the main content composition of each page.
          </li>
        </ul>
      </>
    ),
  };

  return (
    <PromptGeneratorLayout
      title="IA Prompt Generator"
      description="Generates prompts for creating IA (Information Architecture)."
      helpContent={helpContent}
      bkitDocType="ia"
      nextPage={{
        buttonTitle: "Create Usecases",
        href: "/usecases",
      }}
      contextBanner={
        <ContextBanner
          currentDocType="ia"
          onContextLoaded={handleContextLoaded}
        />
      }
      renderForm={({ onGenerate }) => (
        <IAForm
          onSubmit={(data) => {
            const prompt = generatePrompt(data);
            const context = priorContextRef.current;
            const fullPrompt = context
              ? `Below is the PRD content from the previous step. Please use it as reference when creating the IA.\n\n<prior-prd>\n${context}\n</prior-prd>\n\n---\n\n${prompt}`
              : prompt;
            onGenerate(fullPrompt);
          }}
        />
      )}
    />
  );
}
