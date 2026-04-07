"use client";

import { useCallback, useRef } from "react";
import { trackEvent, DocType } from "@/lib/analytics";

const STORAGE_KEY = "bkit_completed_chain";
const CHAIN_START_KEY = "bkit_chain_start_ms";
const ALL_DOC_TYPES: DocType[] = ["prd", "trd", "ia", "usecases", "design"];

function getCompleted(): Set<DocType> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? new Set<DocType>(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

function saveCompleted(set: Set<DocType>): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
  } catch {
    // ignore quota errors
  }
}

/**
 * Tracks full-chain completion across all 5 doc types in a single session.
 * Call `recordPromptGenerated(docType)` after each successful generate_prompt event.
 * Fires fullchain_complete once when all 5 doc types have been submitted.
 */
export function useFullchainTracker() {
  const firedRef = useRef(false);

  const recordPromptGenerated = useCallback((docType: DocType) => {
    if (typeof window === "undefined") return;

    // Record chain start time if first step
    if (!sessionStorage.getItem(CHAIN_START_KEY)) {
      sessionStorage.setItem(CHAIN_START_KEY, String(Date.now()));
    }

    const completed = getCompleted();
    completed.add(docType);
    saveCompleted(completed);

    // Check if all 5 doc types are done
    const allDone = ALL_DOC_TYPES.every((t) => completed.has(t));
    if (allDone && !firedRef.current) {
      firedRef.current = true;
      const startMs = Number(sessionStorage.getItem(CHAIN_START_KEY) ?? Date.now());
      const durationMs = Date.now() - startMs;

      trackEvent({
        name: "fullchain_complete",
        params: { session_duration_ms: durationMs },
      });

      // Reset so the user can trigger it again in the same session (edge case)
      sessionStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(CHAIN_START_KEY);
      firedRef.current = false;
    }
  }, []);

  return { recordPromptGenerated };
}
