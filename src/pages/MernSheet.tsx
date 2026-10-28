import { FactList } from "../components/FactList.tsx";
import { ReSetText } from "../components/ReSetText.tsx";
import type { PageCopy } from "../content/index.ts";
import { sheetHeadingId } from "../routes.ts";

type MernSheetProps = {
  copy: PageCopy;
};

export function MernSheet({ copy }: MernSheetProps) {
  const { mern } = copy;

  return (
    <article className="vita">
      <ReSetText
        as="h2"
        id={sheetHeadingId("mern-website")}
        tabIndex={-1}
        text={mern.title}
        className="sheet-title"
      />
      <FactList
        facts={[
          { label: mern.kindLabel, value: mern.kind },
          { label: mern.stackLabel, value: mern.stack },
          { label: mern.statusLabel, value: mern.status },
        ]}
        className="vita__facts"
      />
      <p className="archive-stamp" aria-hidden="true">
        {mern.status}
      </p>
      {mern.sections.map((section) => (
        <section key={section.heading}>
          <ReSetText as="h3" text={section.heading} className="subhead" />
          <ReSetText as="p" text={section.body} className="prose" />
        </section>
      ))}
    </article>
  );
}
