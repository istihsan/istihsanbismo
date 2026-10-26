import { Link } from "react-router-dom";
import type { PageCopy } from "../content/index.ts";
import type { Language } from "../language.ts";
import { pathFor, sheetHeadingId } from "../routes.ts";
import { Arrow } from "./Arrow.tsx";
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
        <div className="cover__mast">
          <div className="cover__nameblock">
            <h1 id={sheetHeadingId("cover")} tabIndex={-1} className="cover__name">
              <span className="cover__name-line">{givenName}</span>{" "}
              <span className="cover__name-line">{familyName.join(" ")}</span>
            </h1>
            <ReSetText as="p" text={copy.title} className="cover__role" />
          </div>
          <figure className="portrait">
            <div className="portrait__plate">
              <img
                className="portrait__photo"
                src="/fonts/Vintage%20Classified%20Dossier%20Portrait.png"
                alt={copy.name}
                width={1254}
                height={1254}
              />
              <div className="portrait__stamp" aria-hidden="true">
                <ReSetText text={copy.cover.accessMark} />
              </div>
            </div>
            <ReSetText
              as="figcaption"
              text={copy.cover.portraitLabel}
              className="portrait__caption"
            />
          </figure>
        </div>
        <ReSetText as="p" text={copy.cover.statement} className="cover__statement" />
        <Link to={pathFor(language, "work")} className="cover__open">
          <ReSetText text={copy.cover.openFile} />
          <Arrow />
        </Link>
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
