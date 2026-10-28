import type { Fact } from "../content/index.ts";
import { InkCircle } from "./InkMark.tsx";
import { ReSetText } from "./ReSetText.tsx";

type FactListProps = {
  facts: Fact[];
  className?: string;
  /** Circles one existing fact. The index is the copy order, not a new claim. */
  markedIndex?: number;
};

export function FactList({ facts, className = "", markedIndex }: FactListProps) {
  return (
    <dl className={`fact-list ${className}`}>
      {facts.map((fact, position) => {
        const marked = position === markedIndex;
        return (
          <div
            key={position}
            className={marked ? "fact-list__row fact-list__row--marked" : "fact-list__row"}
          >
            <ReSetText as="dt" text={fact.label} className="label" />
            <ReSetText as="dd" text={fact.value} className="text-small" />
            {marked ? <InkCircle /> : null}
          </div>
        );
      })}
    </dl>
  );
}
