export type DocType = "prd" | "trd" | "ia" | "usecases" | "design";

export type AnalyticsEvent =
  | { name: "generate_prompt";        params: { doc_type: DocType; has_prior_context: boolean } }
  | { name: "ai_generation_complete"; params: { doc_type: DocType; success: boolean } }
  | { name: "handoff_click";          params: { from_doc: DocType; to_doc: DocType } }
  | { name: "bkit_save";              params: { doc_type: DocType; feature_name: string } }
  | { name: "draft_restored";         params: { doc_type: DocType } }
  | { name: "fullchain_complete";     params: { session_duration_ms: number } };

/**
 * Send a GA4 custom event.
 * - Silently skips when window.gtag is not available (local dev without GA_ID).
 * - Logs to console.debug in development for easy verification.
 */
export function trackEvent(event: AnalyticsEvent): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;

  if (process.env.NODE_ENV === "development") {
    console.debug("[GA4]", event.name, event.params);
  }

  window.gtag("event", event.name, event.params as Record<string, unknown>);
}
