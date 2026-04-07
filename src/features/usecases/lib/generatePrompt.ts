import { UsecaseFormData } from "../types";

export function generatePrompt(data: UsecaseFormData): string {
  const actorList = data.actors
    .split("\n")
    .filter(Boolean)
    .map((a) => `- ${a.trim()}`)
    .join("\n");

  const featureList = data.features
    .split("\n")
    .filter(Boolean)
    .map((f) => `- ${f.trim()}`)
    .join("\n");

  const nfrSection =
    data.nonFunctionalRequirements.trim()
      ? `\n<non-functional-requirements>\n${data.nonFunctionalRequirements
          .split("\n")
          .filter(Boolean)
          .map((r) => `- ${r.trim()}`)
          .join("\n")}\n</non-functional-requirements>`
      : "";

  const prompt = `
Write a detailed use case document for the following system based on the provided information:

<system-info>
System Name: ${data.systemName}
</system-info>

<actors>
${actorList}
</actors>

<features-to-document>
${featureList}
</features-to-document>
${nfrSection}

Use case document must include the following contents for EACH feature listed above:

<table-of-contents>
- Actor Definitions
- Use Case Scenarios
- Main Steps (Basic Flow)
- Alternative Flows and Edge Cases
- Exception Handling
- Preconditions and Postconditions
- Business Rules and Constraints
- User Interface Considerations
- Data Requirements and Data Flow
- Security and Privacy Considerations
</table-of-contents>

<response-format>
Use markdown format
</response-format>

<guidelines>
- Use tables or lists where appropriate to organize information systematically
- All user interactions, including inputs and outputs, must be in Korean
- Provide accurate answers with reliable references
- Write in Korean
- Clearly separate each use case section
- Include detailed step-by-step descriptions
- Consider error cases and alternative flows
- Include technical considerations
</guidelines>
`.trim();

  return prompt;
}
