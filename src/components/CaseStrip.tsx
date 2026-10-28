import type { PageCopy } from "../content/index.ts";
import { InkRule } from "./InkMark.tsx";

type CaseStripProps = {
  figure: PageCopy["figure"];
};

/** Existing diagram titles only. Not a screenshot of the dashboard. */
export function CaseStrip({ figure }: CaseStripProps) {
  const nodes = [figure.passengerApp.title, figure.dashboard.title, figure.fieldOps.title];

  return (
    <div className="case-strip" aria-hidden="true">
      <InkRule />
      {nodes.map((title, position) => (
        <span
          key={position}
          className={position === 1 ? "case-strip__node case-strip__node--built" : "case-strip__node"}
        >
          {title}
        </span>
      ))}
    </div>
  );
}
