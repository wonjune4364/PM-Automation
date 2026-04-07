"use client";

import { useCallback, useRef } from "react";
import { PromptGeneratorLayout } from "@/components/prompt/PromptGeneratorLayout";
import { ContextBanner } from "@/components/prompt/ContextBanner";
import { DesignForm } from "./components/DesignForm";
import { generatePrompt } from "./lib/generatePrompt";
import { DOC_TYPE_LABEL } from "@/lib/bkitContext";

export function DesignPage() {
  const priorContextRef = useRef<string>("");
  const sourceDocTypeRef = useRef<string>("");

  const handleContextLoaded = useCallback((context: string, sourceDocType: string) => {
    priorContextRef.current = context;
    sourceDocTypeRef.current = sourceDocType;
  }, []);

  const helpContent = {
    title: "What is a Design Guide?",
    description: (
      <>
        <p>
          A Design Guide defines the visual identity and user experience of a product.
        </p>
        <p>A Design Guide includes the following elements:</p>
        <ul className="list-disc pl-4 space-y-2">
          <li>
            <strong>Design System:</strong> Defines standards for colors, typography, components, etc.
          </li>
          <li>
            <strong>Layout:</strong> Designs screen composition and grid systems.
          </li>
          <li>
            <strong>Interaction:</strong> Defines feedback and animations for user actions.
          </li>
          <li>
            <strong>Accessibility:</strong> Includes design considerations for diverse users.
          </li>
        </ul>
      </>
    ),
  };

  return (
    <PromptGeneratorLayout
      title="Design Prompt Generator"
      description="Generates prompts for creating UI/UX Design Guides."
      helpContent={helpContent}
      bkitDocType="design"
      contextBanner={
        <ContextBanner
          currentDocType="design"
          onContextLoaded={handleContextLoaded}
        />
      }
      renderForm={({ onGenerate }) => (
        <DesignForm
          onSubmit={(data) => {
            const prompt = generatePrompt(data);
            const context = priorContextRef.current;
            const sourceLabel = sourceDocTypeRef.current
              ? DOC_TYPE_LABEL[sourceDocTypeRef.current] ?? sourceDocTypeRef.current.toUpperCase()
              : "";
            const fullPrompt = context
              ? `Below is the ${sourceLabel} content from the previous step. Please use it as reference when creating the Design Guide.\n\n<prior-${sourceDocTypeRef.current}>\n${context}\n</prior-${sourceDocTypeRef.current}>\n\n---\n\n${prompt}`
              : prompt;
            onGenerate(fullPrompt);
          }}
        />
      )}
    />
  );
}
