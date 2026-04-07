"use client";

import { useEffect, useRef, useCallback } from "react";
import { trackEvent, DocType } from "@/lib/analytics";

const DRAFT_KEY = (docType: string) => `bkit_draft_${docType}`;

interface UseDraftStorageOptions<T> {
  docType: string;
  defaultValue: T;
  onRestore: (data: T) => void;
  onRestoreToast?: () => void;
}

/**
 * Persists form state to localStorage.
 * - Restores saved draft on mount, calling onRestore with parsed data.
 * - Call `save(data)` whenever form state changes.
 * - Call `clear()` to wipe the draft ("처음부터 시작").
 */
export function useDraftStorage<T>({
  docType,
  defaultValue,
  onRestore,
  onRestoreToast,
}: UseDraftStorageOptions<T>) {
  const restoredRef = useRef(false);

  // Restore on mount
  useEffect(() => {
    if (restoredRef.current) return;
    restoredRef.current = true;
    try {
      const raw = localStorage.getItem(DRAFT_KEY(docType));
      if (!raw) return;
      const parsed: T = JSON.parse(raw);
      onRestore(parsed);
      onRestoreToast?.();
      trackEvent({ name: "draft_restored", params: { doc_type: docType as DocType } });
    } catch {
      // malformed JSON — ignore
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [docType]);

  const save = useCallback(
    (data: T) => {
      try {
        localStorage.setItem(DRAFT_KEY(docType), JSON.stringify(data));
      } catch {
        // storage quota or SSR — ignore
      }
    },
    [docType]
  );

  const clear = useCallback(() => {
    try {
      localStorage.removeItem(DRAFT_KEY(docType));
    } catch {
      // ignore
    }
    onRestore(defaultValue);
  }, [docType, defaultValue, onRestore]);

  return { save, clear };
}
