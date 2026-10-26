import type { Decision } from "../content/index.ts";
import { ReSetText } from "./ReSetText.tsx";

type DecisionLedgerProps = {
  columns: Omit<Decision, "title">;
  decisions: Decision[];
};

const FIELDS = ["requirement", "implementation", "tradeOff"] as const;

export function DecisionLedger({ columns, decisions }: DecisionLedgerProps) {
  return (
    <ol className="ledger">
      {decisions.map((decision, position) => (
        <li key={position} className="ledger__entry">
          <ReSetText as="h4" text={decision.title} className="ledger__title" />
          <dl className="ledger__fields">
            {FIELDS.map((field) => (
              <div
                key={field}
                className={
                  field === "tradeOff"
                    ? "ledger__field ledger__field--trade-off"
                    : "ledger__field"
                }
              >
                <ReSetText as="dt" text={columns[field]} className="label" />
                <ReSetText as="dd" text={decision[field]} className="ledger__text" />
              </div>
            ))}
          </dl>
        </li>
      ))}
    </ol>
  );
}
