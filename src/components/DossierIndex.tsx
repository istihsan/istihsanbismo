import { Link } from "react-router-dom";
import type { PageCopy } from "../content/index.ts";
import type { Language } from "../language.ts";
import { MAIN_ORDER, pathFor, sheetNumber } from "../routes.ts";
import { ReSetText } from "./ReSetText.tsx";

type DossierIndexProps = {
  copy: PageCopy;
  language: Language;
};

export function DossierIndex({ copy, language }: DossierIndexProps) {
  const label = copy.cover.indexLabel;

  return (
    <nav aria-label={label} className="dossier-index">
      <span aria-hidden="true">
        <ReSetText text={label} className="label" />
      </span>
      <ol className="dossier-index__list">
        {MAIN_ORDER.filter((id) => id !== "cover").map((id) => (
          <li key={id}>
            <Link to={pathFor(language, id)} className="dossier-index__link">
              <span className="dossier-index__text">
                <ReSetText
                  text={copy.segments[id].label}
                  className="dossier-index__label"
                />
                <ReSetText
                  text={copy.segments[id].summary}
                  className="dossier-index__summary"
                />
              </span>
              <span className="dossier-index__ref">
                <ReSetText text={copy.dossier.pageRef} />
                {sheetNumber(id)}
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
