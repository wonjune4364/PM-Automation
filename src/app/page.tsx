import { HeroSection } from "@/features/home/components/HeroSection";
import { ToolsSection } from "@/features/home/components/ToolsSection";

export default function Page() {
  const aiFlowSteps = [
    {
      title: "PRD Prompt Generator",
      description: "Define what you are building.\nStart here — all other documents build on the PRD.",
      href: "/prd",
    },
    {
      title: "TRD Prompt Generator",
      description: "Define how you are building it.\nSpecify tech stack, architecture, and APIs.\nCan run in parallel with IA.",
      href: "/trd",
      optional: true,
      parallel: true,
    },
    {
      title: "IA Prompt Generator",
      description: "Design the information structure.\nMap out screens, navigation, and user flows.\nRequires PRD.",
      href: "/ia",
    },
    {
      title: "Usecases Prompt Generator",
      description: "Specify how users interact with the system.\nDefine actors, normal flows, and edge cases.\nRequires PRD + IA.",
      href: "/usecases",
    },
    {
      title: "Design Prompt Generator",
      description: "Create the visual design system.\nDefine colors, typography, and component specs.\nRequires all prior documents.",
      href: "/design",
    },
  ];

  const docTools = [
    {
      title: "1. Privacy Policy Generator",
      description:
        "Draft and generate Privacy Policy step-by-step.\nThis is a required document before launch.",
      href: "/privacy-policy",
      doc: true,
    },
    {
      title: "2. Open Source License Generator",
      description:
        "Automatically generates open source license documentation.\nUses package.json.",
      href: "/open-source-license",
      doc: true,
    },
  ];

  const devTools = [
    {
      title: "HTML Table to JSON Converter",
      description: "Great for moving API document content to variables :)",
      href: "/dev/table-to-json",
      dev: true,
    },
    {
      title: "Image Color Picker",
      description: "Extracts color information from a desired point in an image",
      href: "/dev/spoid-image-color",
      dev: true,
    },
    {
      title: "Color Palette Generator",
      description: "Generates a systematic color palette from a base color",
      href: "/dev/generate-color-palette",
      dev: true,
    },
  ];

  return (
    <>
      <div className="pb-12 space-y-8">
        <HeroSection />

        <div className="max-w-4xl mx-auto container">
          <ToolsSection
            title="AI tools — Sequential workflow"
            variant="flow"
            flowSteps={aiFlowSteps}
          />

          <ToolsSection
            title="Document tools"
            variant="grid"
            tools={docTools}
          />

          <ToolsSection
            title="Development tools"
            variant="grid"
            tools={devTools}
          />
        </div>
      </div>
    </>
  );
}
