"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HelpCircle, Copy, ArrowRight, Sparkles, Loader2, Save } from "lucide-react";
import { useState, useEffect } from "react";
import JSConfetti from "js-confetti";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Anthropic from "@anthropic-ai/sdk";
import { saveContext } from "@/lib/bkitContext";
import { trackEvent } from "@/lib/analytics";
import { useFullchainTracker } from "@/hooks/useFullchainTracker";

export type BkitDocType = "prd" | "trd" | "ia" | "usecases" | "design";

interface Props {
  title: string;
  description: string;
  dialog?: {
    title?: string;
    description?: string;
  };
  nextPage?: {
    buttonTitle: string;
    href: string;
  };
  helpContent?: {
    title: string;
    description: React.ReactNode;
  };
  /** bkit document type — enables "Save to bkit" after AI generation */
  bkitDocType?: BkitDocType;
  /** Optional context banner rendered above the form (e.g. ContextBanner) */
  contextBanner?: React.ReactNode;
  renderForm: ({
    onGenerate,
  }: {
    onGenerate: (prompt: string) => void;
  }) => React.ReactNode;
}

const BKIT_DOC_LABEL: Record<BkitDocType, string> = {
  prd:      "docs/00-pm",
  trd:      "docs/02-design/features",
  ia:       "docs/02-design/features",
  usecases: "docs/02-design/features",
  design:   "docs/02-design/features",
};

const BKIT_DOC_SUFFIX: Record<BkitDocType, string> = {
  prd:      "prd",
  trd:      "trd",
  ia:       "ia",
  usecases: "usecase",
  design:   "design",
};

export function PromptGeneratorLayout({
  title,
  description,
  dialog,
  helpContent,
  nextPage,
  bkitDocType,
  contextBanner,
  renderForm,
}: Props) {
  const router = useRouter();
  const { recordPromptGenerated } = useFullchainTracker();
  const [isOpen, setIsOpen] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [jsConfetti, setJsConfetti] = useState<JSConfetti | null>(null);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  // Claude AI Generation state
  const [apiKey, setApiKey] = useState("");
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");

  // bkit Save state
  const [showBkitModal, setShowBkitModal] = useState(false);
  const [featureName, setFeatureName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [savedPath, setSavedPath] = useState("");

  useEffect(() => {
    setJsConfetti(new JSConfetti());
  }, []);

  const handleSubmit = async (prompt: string) => {
    setGeneratedPrompt(prompt);
    setGeneratedContent("");
    setSavedPath("");
    setIsOpen(true);

    if (bkitDocType) {
      trackEvent({
        name: "generate_prompt",
        params: { doc_type: bkitDocType, has_prior_context: !!contextBanner },
      });
      recordPromptGenerated(bkitDocType);
    }

    jsConfetti?.addConfetti({
      emojis: ["🎉", "✨", "💫", "⭐️"],
      emojiSize: 30,
      confettiNumber: 50,
    });
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedPrompt);
    alert("Copied to clipboard!");
  };

  const handleAiGeneration = () => {
    const storedKey = localStorage.getItem("claude_api_key");
    if (storedKey) {
      setApiKey(storedKey);
      generateContent(storedKey);
    } else {
      setShowApiKeyModal(true);
    }
  };

  const handleSaveApiKey = () => {
    if (!apiKey.trim()) return;
    localStorage.setItem("claude_api_key", apiKey);
    setShowApiKeyModal(false);
    generateContent(apiKey);
  };

  const generateContent = async (key: string) => {
    setIsGenerating(true);
    try {
      const anthropic = new Anthropic({
        apiKey: key,
        dangerouslyAllowBrowser: true,
      });

      const message = await anthropic.messages.create({
        model: "claude-sonnet-4-6",
        max_tokens: 8192,
        system:
          "You are an expert technical document writer for PT Bank Jtrust Indonesia. " +
          "Generate comprehensive, well-structured documents in Markdown format. " +
          "Write in Korean unless the prompt specifies otherwise.",
        messages: [{ role: "user", content: generatedPrompt }],
      });

      const content =
        message.content[0].type === "text" ? message.content[0].text : "";
      setGeneratedContent(content);

      if (bkitDocType) {
        trackEvent({ name: "ai_generation_complete", params: { doc_type: bkitDocType, success: true } });
      }

      // Auto-download as markdown
      const blob = new Blob([content], { type: "text/markdown" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "generated_content.md";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      alert("Content generated and downloaded!");
    } catch (error: any) {
      console.error(error);
      if (bkitDocType) {
        trackEvent({ name: "ai_generation_complete", params: { doc_type: bkitDocType, success: false } });
      }
      alert("Failed to generate content: " + error.message);
      if (error.status === 401) {
        localStorage.removeItem("claude_api_key");
        setShowApiKeyModal(true);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveToBkit = async () => {
    if (!featureName.trim() || !generatedContent) return;
    setIsSaving(true);
    try {
      const slug = featureName.trim().toLowerCase().replace(/\s+/g, "-");
      const res = await fetch("/api/bkit/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: generatedContent,
          docType: bkitDocType,
          featureName: slug,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSavedPath(data.path);
        setShowBkitModal(false);
        if (bkitDocType) {
          trackEvent({ name: "bkit_save", params: { doc_type: bkitDocType, feature_name: slug } });
        }
      } else {
        alert("Failed to save: " + data.error);
      }
    } catch (error: any) {
      alert("Failed to save to bkit: " + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const bkitPreviewPath =
    bkitDocType
      ? `${BKIT_DOC_LABEL[bkitDocType]}/${featureName || "{feature}"}.${BKIT_DOC_SUFFIX[bkitDocType]}.md`
      : "";

  return (
    <>
      {/* Generated Prompt Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {dialog?.title || "Prompt Generated! 🎉"}
            </DialogTitle>
            <DialogDescription className="space-y-4">
              {dialog?.description ||
                "Copy the prompt below and paste it into Claude or another AI service."}
              <div className="relative">
                <div className="bg-muted p-4 rounded-lg whitespace-pre-wrap text-sm max-h-[300px] overflow-y-auto">
                  <span className="text-ellipsis h-full overflow-hidden">
                    {generatedPrompt}
                  </span>
                </div>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={handleCopy}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex gap-2 w-full">
                <Button className="flex-1" onClick={handleCopy} variant="outline">
                  Copy
                  <Copy className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  className="flex-1"
                  onClick={handleAiGeneration}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      Generating <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                    </>
                  ) : (
                    <>
                      Generate with Claude <Sparkles className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>

              {/* bkit Save section — only visible after Claude generates content */}
              {bkitDocType && generatedContent && (
                <div className="space-y-2">
                  {savedPath ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm">
                      <p className="text-green-700 font-medium">Saved to bkit</p>
                      <code className="text-green-600 text-xs block mt-1">
                        {savedPath}
                      </code>
                      <p className="text-green-600 text-xs mt-1">
                        Run: <code>/pdca plan {featureName}</code>
                      </p>
                    </div>
                  ) : (
                    <Button
                      variant="secondary"
                      className="w-full"
                      onClick={() => setShowBkitModal(true)}
                    >
                      Save to bkit
                      <Save className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              )}

              {nextPage && (
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => {
                    if (bkitDocType && generatedContent) {
                      saveContext(bkitDocType, generatedContent);
                      const toDoc = nextPage.href.replace(/^\//, "") as import("@/lib/analytics").DocType;
                      trackEvent({ name: "handoff_click", params: { from_doc: bkitDocType, to_doc: toDoc } });
                    }
                    router.push(nextPage.href);
                  }}
                >
                  {nextPage.buttonTitle}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* Claude API Key Modal */}
      <Dialog open={showApiKeyModal} onOpenChange={setShowApiKeyModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Enter Claude API Key</DialogTitle>
            <DialogDescription>
              Your Anthropic API key is needed to generate content with Claude.
              It will be stored locally in your browser only.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="api-key">API Key</Label>
              <Input
                id="api-key"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-ant-..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSaveApiKey}>Save & Generate</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* bkit Feature Name Modal */}
      {bkitDocType && (
        <Dialog open={showBkitModal} onOpenChange={setShowBkitModal}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Save to bkit</DialogTitle>
              <DialogDescription>
                Enter a feature name (kebab-case) to save this document into
                the bkit docs structure. After saving, run{" "}
                <code className="text-xs bg-muted px-1 rounded">
                  /pdca plan {"{featureName}"}
                </code>{" "}
                to start the PDCA cycle with this document as context.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="feature-name">Feature Name</Label>
                <Input
                  id="feature-name"
                  value={featureName}
                  onChange={(e) => setFeatureName(e.target.value)}
                  placeholder="e.g., user-authentication"
                />
                <p className="text-xs text-muted-foreground">
                  Save path:{" "}
                  <code className="bg-muted px-1 rounded">
                    {bkitPreviewPath}
                  </code>
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={handleSaveToBkit}
                disabled={isSaving || !featureName.trim()}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Help Dialog */}
      {helpContent && (
        <Dialog open={isHelpOpen} onOpenChange={setIsHelpOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{helpContent.title}</DialogTitle>
              <DialogDescription className="space-y-4">
                {helpContent.description}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}

      <div className="container max-w-3xl py-10 space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold">
              {title}
              {helpContent && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsHelpOpen(true)}
                >
                  <HelpCircle className="w-5 h-5" />
                </Button>
              )}
            </h1>
          </div>
          <p className="text-muted-foreground">{description}</p>
        </div>

        {contextBanner}

        {renderForm({ onGenerate: handleSubmit })}
      </div>
    </>
  );
}
