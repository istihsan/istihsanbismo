/**
 * Preferred-language store. Route identity lives in routes.ts and the URL.
 *
 * Preference store: one localStorage key, `preferred-language`.
 * Stored values are only `en` and `id`.
 */

export const LANGUAGE_STORAGE_KEY = "preferred-language";

export type Language = "en" | "id";

export function languageLabel(language: Language): string {
  return language === "id" ? "Bahasa Indonesia" : "English";
}

export function readStoredLanguage(): Language | null {
  try {
    const value = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (value === "en" || value === "id") {
      return value;
    }
  } catch {
    // Storage can be blocked; callers then default to English.
  }
  return null;
}

export function writeStoredLanguage(language: Language): void {
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch {
    // Storage can be blocked; the URL remains the source of truth.
  }
}

export function applyDocumentLanguage(language: Language): void {
  document.documentElement.lang = language;
}
