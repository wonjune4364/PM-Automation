"use client";

import { PromptGeneratorLayout } from "@/components/prompt/PromptGeneratorLayout";
import { TRDForm } from "./components/TRDForm";
import { generatePrompt } from "./lib/generatePrompt";

export function TrdPage() {
  const helpContent = {
    title: "What is TRD?",
    description: (
      <>
        <p>
          TRD (Technical Requirements Document) defines the system's technical implementation methods, architecture, infrastructure, etc., in detail.
        </p>
        <p>It acts as a technical blueprint for actual development based on the PRD:</p>
        <ul className="list-disc pl-4 space-y-2">
          <li>
            <strong>Tech Stack Decision:</strong> Select suitable frontend, backend, database technologies for the project.
          </li>
          <li>
            <strong>System Architecture Design:</strong> Define the overall system structure and relationships between components.
          </li>
          <li>
            <strong>Security and Performance Requirements:</strong> Specify data security, performance goals, and scalability strategies.
          </li>
          <li>
            <strong>Provide Development Guide:</strong> Provide detailed technical guides so the development team can implement in a consistent direction.
          </li>
        </ul>
      </>
    ),
  };

  return (
    <PromptGeneratorLayout
      title="TRD Prompt Generator"
      description="Generates prompts for creating TRD (Technical Requirements Document)."
      helpContent={helpContent}
      bkitDocType="trd"
      nextPage={{
        buttonTitle: "Create PRD",
        href: "/prd",
      }}
      renderForm={({ onGenerate }) => (
        <TRDForm onSubmit={(data) => onGenerate(generatePrompt(data))} />
      )}
    />
  );
}
