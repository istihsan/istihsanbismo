import type { Language } from "../language.ts";
import { languageLabel } from "../language.ts";

const LANGUAGES: readonly Language[] = ["en", "id"];

type LanguageSwitchProps = {
  language: Language;
  onSelect: (next: Language) => void;
};

function accessibleName(code: Language): string {
  return `${languageLabel(code)} (${code.toUpperCase()})`;
}

export function LanguageSwitch({ language, onSelect }: LanguageSwitchProps) {
  return (
    <div
      role="group"
      aria-label={language === "id" ? "Bahasa" : "Language"}
      className="flex w-full flex-row flex-nowrap items-center gap-6 lg:flex-col lg:items-stretch lg:gap-8"
    >
      {LANGUAGES.map((code) => {
        const selected = language === code;
        return (
          <button
            key={code}
            type="button"
            aria-pressed={selected}
            aria-label={accessibleName(code)}
            onClick={() => onSelect(code)}
            className={`inline-flex min-h-11 min-w-11 lg:min-h-6 lg:min-w-6 items-center whitespace-nowrap px-1 py-1 text-left text-small leading-5 underline-offset-4 transition-opacity duration-dossier ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oxblood motion-reduce:transition-none lg:w-full ${
              selected
                ? "font-semibold underline"
                : "font-normal no-underline motion-safe:active:opacity-80"
            }`}
          >
            {code.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
