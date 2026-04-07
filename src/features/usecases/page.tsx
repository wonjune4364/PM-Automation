"use client";

import { useCallback, useRef } from "react";
import { PromptGeneratorLayout } from "@/components/prompt/PromptGeneratorLayout";
import { ContextBanner } from "@/components/prompt/ContextBanner";
import { UsecaseForm } from "./components/UsecaseForm";
import { generatePrompt } from "./lib/generatePrompt";
import { DOC_TYPE_LABEL } from "@/lib/bkitContext";

export function UsecasesPage() {
  const priorContextRef = useRef<string>("");
  const sourceDocTypeRef = useRef<string>("");

  const handleContextLoaded = useCallback((context: string, sourceDocType: string) => {
    priorContextRef.current = context;
    sourceDocTypeRef.current = sourceDocType;
  }, []);

  const helpContent = {
    title: "What are Use Cases?",
    description: (
      <>
        <p>
          A Use Case document describes in detail how users interact with the system, step by step.
        </p>
        <p>Use Cases include the following elements:</p>
        <ul className="list-disc pl-4 space-y-2">
          <li>
            <strong>Actor:</strong> A user or external system that interacts with the system.
          </li>
          <li>
            <strong>Preconditions:</strong> Conditions required before the use case can run.
          </li>
          <li>
            <strong>Basic Flow:</strong> Step-by-step progression of the normal scenario.
          </li>
          <li>
            <strong>Alternative Flow:</strong> Exception handling or alternative scenarios.
          </li>
          <li>
            <strong>Postconditions:</strong> System state after the use case completes.
          </li>
        </ul>
      </>
    ),
  };

  return (
    <PromptGeneratorLayout
      title="Usecases Prompt Generator"
      description="Generates prompts for creating Use Case documents."
      helpContent={helpContent}
      bkitDocType="usecases"
      nextPage={{
        buttonTitle: "Create Design Guide",
        href: "/design",
      }}
      contextBanner={
        <ContextBanner
          currentDocType="usecases"
          onContextLoaded={handleContextLoaded}
        />
      }
      renderForm={({ onGenerate }) => (
        <UsecaseForm
          onSubmit={(data) => {
            const prompt = generatePrompt(data);
            const context = priorContextRef.current;
            const sourceLabel = sourceDocTypeRef.current
              ? DOC_TYPE_LABEL[sourceDocTypeRef.current] ?? sourceDocTypeRef.current.toUpperCase()
              : "";
            const fullPrompt = context
              ? `Below is the ${sourceLabel} content from the previous step. Please use it as reference when creating the Use Cases.\n\n<prior-${sourceDocTypeRef.current}>\n${context}\n</prior-${sourceDocTypeRef.current}>\n\n---\n\n${prompt}`
              : prompt;
            onGenerate(fullPrompt);
          }}
        />
      )}
    />
  );
}
