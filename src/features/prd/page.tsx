"use client";

import { PromptGeneratorLayout } from "@/components/prompt/PromptGeneratorLayout";
import { PRDForm } from "./components/PRDForm";
import { generatePrompt } from "./lib/generatePrompt";

export function PrdPage() {
  const helpContent = {
    title: "What is PRD?",
    description: (
      <>
        <p>
          PRD (Product Requirements Document) defines the product's purpose, features, and characteristics in detail.
        </p>
        <p>It plays a particularly important role in AI-assisted development:</p>
        <ul className="list-disc pl-4 space-y-2">
          <li>
            <strong>Clear communication of intent:</strong> Clearly communicates the planner's intent.
          </li>
          <li>
            <strong>Defining development scope:</strong> Sets the development scope by clearly defining the features and constraints.
          </li>
          <li>
            <strong>Efficient development progress:</strong> Helps AI generate more accurate code based on detailed requirements.
          </li>
        </ul>
      </>
    ),
  };

  return (
    <PromptGeneratorLayout
      title="PRD Prompt Generator"
      description="Generates prompts for creating PRD (Product Requirements Document)."
      helpContent={helpContent}
      bkitDocType="prd"
      nextPage={{
        buttonTitle: "Create IA",
        href: "/ia",
      }}
      renderForm={({ onGenerate }) => (
        <PRDForm onSubmit={(data) => onGenerate(generatePrompt(data))} />
      )}
    />
  );
}
