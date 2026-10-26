import { FactList } from "../components/FactList.tsx";
import { ReSetText } from "../components/ReSetText.tsx";
import type { PageCopy } from "../content/index.ts";
import { sheetHeadingId } from "../routes.ts";

type SkillsProps = {
  copy: PageCopy;
};

export function Skills({ copy }: SkillsProps) {
  const { skills } = copy;

  return (
    <article className="vita">
      <ReSetText
        as="h2"
        id={sheetHeadingId("skills")}
        tabIndex={-1}
        text={skills.title}
        className="sheet-title"
      />
      <FactList
        facts={skills.groups.map((group) => ({
          label: group.label,
          value: group.items,
        }))}
        className="vita__facts skills-facts"
      />
    </article>
  );
}
