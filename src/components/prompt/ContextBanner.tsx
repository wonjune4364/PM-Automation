"use client";

import { useEffect, useState } from "react";
import { X, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  loadContext,
  clearContext,
  DOC_TYPE_LABEL,
  CONTEXT_SOURCE,
} from "@/lib/bkitContext";
import type { BkitDocType } from "./PromptGeneratorLayout";

interface Props {
  /** The docType of the current page (e.g. "ia", "usecases", "design") */
  currentDocType: BkitDocType;
  /** Called with the loaded context string so the parent can inject it */
  onContextLoaded?: (context: string, sourceDocType: string) => void;
}

export function ContextBanner({ currentDocType, onContextLoaded }: Props) {
  const [visible, setVisible] = useState(false);
  const [sourceLabel, setSourceLabel] = useState("");

  useEffect(() => {
    const sourceDocType = CONTEXT_SOURCE[currentDocType];
    if (!sourceDocType) return;

    const stored = loadContext(sourceDocType);
    if (!stored) return;

    setSourceLabel(DOC_TYPE_LABEL[sourceDocType] ?? sourceDocType.toUpperCase());
    setVisible(true);
    onContextLoaded?.(stored, sourceDocType);
  }, [currentDocType, onContextLoaded]);

  const handleDismiss = () => {
    const sourceDocType = CONTEXT_SOURCE[currentDocType];
    if (sourceDocType) clearContext(sourceDocType);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="flex items-center gap-3 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">
      <Info className="w-4 h-4 flex-shrink-0" />
      <span className="flex-1">
        Previous step ({sourceLabel}) content loaded. It will be automatically included when generating the prompt.
      </span>
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6 text-blue-600 hover:text-blue-800 hover:bg-blue-100 flex-shrink-0"
        onClick={handleDismiss}
      >
        <X className="w-4 h-4" />
      </Button>
    </div>
  );
}
