import type { Fact } from "../content/index.ts";
import { ReSetText } from "./ReSetText.tsx";

type FactListProps = {
  facts: Fact[];
  className?: string;
};

export function FactList({ facts, className = "" }: FactListProps) {
  return (
    <dl className={`fact-list ${className}`}>
      {facts.map((fact, position) => (
        <div key={position} className="fact-list__row">
          <ReSetText as="dt" text={fact.label} className="label" />
          <ReSetText as="dd" text={fact.value} className="text-small" />
        </div>
      ))}
    </dl>
  );
}
