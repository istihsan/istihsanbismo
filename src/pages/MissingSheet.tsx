import { Link } from "react-router-dom";
import { ReSetText } from "../components/ReSetText.tsx";
import type { PageCopy } from "../content/index.ts";
import type { Language } from "../language.ts";
import { pathFor, sheetHeadingId } from "../routes.ts";

type MissingSheetProps = {
  copy: PageCopy;
  language: Language;
};

export function MissingSheet({ copy, language }: MissingSheetProps) {
  const { missing } = copy;

  return (
    <article className="vita">
      <ReSetText
        as="h2"
        id={sheetHeadingId("missing")}
        tabIndex={-1}
        text={missing.title}
        className="sheet-title"
      />
      <ReSetText as="p" text={missing.body} className="prose prose--lead" />
      <Link to={pathFor(language, "cover")} className="vita__home">
        <ReSetText text={missing.home} />
      </Link>
    </article>
  );
}
