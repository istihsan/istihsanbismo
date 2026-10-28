import { EvidenceRegister } from "../components/EvidenceRegister.tsx";
import { ReSetText } from "../components/ReSetText.tsx";
import type { PageCopy } from "../content/index.ts";
import type { Language } from "../language.ts";
import { sheetHeadingId } from "../routes.ts";

type WorkIndexProps = {
  copy: PageCopy;
  language: Language;
};

export function WorkIndex({ copy, language }: WorkIndexProps) {
  return (
    <div className="work-index">
      <ReSetText
        as="h2"
        id={sheetHeadingId("work")}
        tabIndex={-1}
        text={copy.segments.work.label}
        className="sheet-title"
      />
      <EvidenceRegister copy={copy} language={language} />
    </div>
  );
}
