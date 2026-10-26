import type { PageCopy } from "../content/index.ts";
import type { Language } from "../language.ts";
import { sheetHeadingId } from "../routes.ts";
import { CoverWindow } from "./CoverWindow.tsx";
import { DossierIndex } from "./DossierIndex.tsx";
import { ReSetText } from "./ReSetText.tsx";

type CoverProps = {
  copy: PageCopy;
  language: Language;
};

export function Cover({ copy, language }: CoverProps) {
  const [givenName, ...familyName] = copy.name.split(" ");

  return (
    <div className="cover">
      <div className="cover__identity">
        <h1 id={sheetHeadingId("cover")} tabIndex={-1} className="cover__name">
          <span className="cover__name-line">{givenName}</span>{" "}
          <span className="cover__name-line">{familyName.join(" ")}</span>
        </h1>
        <ReSetText as="p" text={copy.title} className="cover__role" />
        <ReSetText as="p" text={copy.cover.statement} className="cover__statement" />
      </div>
      <CoverWindow
        figure={copy.figure}
        caption={copy.cover.windowCaption}
        language={language}
        caseTitle={copy.folio.caseTitle}
      />
      <DossierIndex copy={copy} language={language} />
    </div>
  );
}
