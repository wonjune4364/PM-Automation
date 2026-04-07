"use client";

import { PromptGeneratorLayout } from "@/components/prompt/PromptGeneratorLayout";
import { PrivacyPolicyForm } from "./components/PrivacyPolicyForm";
import { generatePrivacyPolicy } from "./lib/generatePrivacyPolicy";

export function PrivacyPolicyPage() {
  const helpContent = {
    title: "What is a Privacy Policy?",
    description: (
      <>
        <p>
          A Privacy Policy is a document specifying the policy on how the service provider collects, uses, and protects user&#39;s personal information. All services collecting personal information must write and disclose a privacy policy in accordance with privacy laws.
        </p>
        <p>The Privacy Policy plays the following important roles:</p>
        <ul className="list-disc pl-4 space-y-2">
          <li>
            <strong>Compliance with Legal Obligations:</strong> Complies with legal obligations under privacy laws.
          </li>
          <li>
            <strong>Providing Transparency:</strong> Provides transparent information about personal information processing to users.
          </li>
          <li>
            <strong>Building Trust:</strong> Helps build trust relationships with users.
          </li>
          <li>
            <strong>Dispute Prevention:</strong> Prevents disputes by presenting clear policies regarding personal information processing.
          </li>
        </ul>
      </>
    ),
  };

  return (
    <PromptGeneratorLayout
      title="Privacy Policy Generator"
      description="Create a privacy policy for your service step-by-step and automatically generate the document."
      helpContent={helpContent}
      renderForm={({ onGenerate }) => (
        <PrivacyPolicyForm
          onSubmit={(data) => onGenerate(generatePrivacyPolicy(data))}
        />
      )}
      dialog={{
        title: "Privacy Policy Generated! 🎉",
        description: "Please apply the generated privacy policy below to your service.",
      }}
    />
  );
}
