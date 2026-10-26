import { WorkCard } from "../components/WorkCard.tsx";
import type { PageCopy } from "../content/index.ts";
import type { Language } from "../language.ts";
import { sheetHeadingId } from "../routes.ts";
import { ReSetText } from "../components/ReSetText.tsx";

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
      <ul className="work-grid">
        <li>
          <WorkCard
            language={language}
            routeId="transjakarta"
            card={copy.work.transjakarta}
          />
        </li>
        <li>
          <WorkCard
            language={language}
            routeId="mern-website"
            card={copy.work.mern}
          />
        </li>
        <li>
          <WorkCard
            language={language}
            routeId="tycoon-game"
            comingSoon={copy.work.tycoon}
          />
        </li>
      </ul>
    </div>
  );
}
