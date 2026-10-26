import { ReSetText } from "../components/ReSetText.tsx";
import type { PageCopy } from "../content/index.ts";
import { sheetHeadingId } from "../routes.ts";

type TycoonSheetProps = {
  copy: PageCopy;
};

export function TycoonSheet({ copy }: TycoonSheetProps) {
  const { tycoon } = copy;

  return (
    <article className="vita tycoon-sheet">
      <div className="tycoon-sheet__seal">
        <span className="tycoon-sheet__thumb" aria-hidden="true" />
        <ReSetText text={tycoon.stamp} className="work-card__stamp" />
      </div>
      <ReSetText
        as="h2"
        id={sheetHeadingId("tycoon-game")}
        tabIndex={-1}
        text={tycoon.title}
        className="sheet-title"
      />
      <ReSetText as="p" text={tycoon.description} className="prose prose--lead" />
    </article>
  );
}
