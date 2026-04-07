export const CONTEXT_KEY = (docType: string) => `bkit_context_${docType}`;

export const saveContext = (docType: string, content: string): void => {
  try {
    sessionStorage.setItem(CONTEXT_KEY(docType), content);
  } catch {
    // sessionStorage may not be available (SSR, private browsing, etc.)
  }
};

export const loadContext = (docType: string): string | null => {
  try {
    return sessionStorage.getItem(CONTEXT_KEY(docType));
  } catch {
    return null;
  }
};

export const clearContext = (docType: string): void => {
  try {
    sessionStorage.removeItem(CONTEXT_KEY(docType));
  } catch {
    // ignore
  }
};

/**
 * Maps a doc type to the label shown in the context banner.
 * e.g. "prd" → "PRD"
 */
export const DOC_TYPE_LABEL: Record<string, string> = {
  prd: "PRD",
  trd: "TRD",
  ia: "IA",
  usecases: "Use Cases",
  design: "Design",
};

/**
 * Returns the docType whose output should be injected into the given page.
 * PRD output → injected into IA
 * IA output → injected into UseCases
 * Use Cases output → injected into Design
 */
export const CONTEXT_SOURCE: Record<string, string> = {
  ia: "prd",
  usecases: "ia",
  design: "usecases",
};
