import { ReSetText } from "../components/ReSetText.tsx";
import type { PageCopy } from "../content/index.ts";
import { sheetHeadingId } from "../routes.ts";

type ExperienceProps = {
  copy: PageCopy;
};

export function Experience({ copy }: ExperienceProps) {
  const { experience } = copy;

  return (
    <article className="vita">
      <ReSetText
        as="h2"
        id={sheetHeadingId("experience")}
        tabIndex={-1}
        text={experience.title}
        className="sheet-title"
      />
      <div className="vita-row">
        <ReSetText as="h3" text={experience.role} className="vita-row__title" />
        <ReSetText as="p" text={experience.org} className="vita-row__meta" />
        <ReSetText as="p" text={experience.dates} className="vita-row__meta" />
      </div>
    </article>
  );
}
