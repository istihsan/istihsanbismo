import { EntryList } from "../components/EntryList.tsx";
import { ReSetText } from "../components/ReSetText.tsx";
import type { PageCopy } from "../content/index.ts";
import { sheetHeadingId } from "../routes.ts";

type EducationProps = {
  copy: PageCopy;
};

export function Education({ copy }: EducationProps) {
  const { education } = copy;

  return (
    <article className="vita">
      <ReSetText
        as="h2"
        id={sheetHeadingId("education")}
        tabIndex={-1}
        text={education.title}
        className="sheet-title"
      />
      <EntryList entries={education.items} titleAs="h3" className="vita__entries" />
    </article>
  );
}
