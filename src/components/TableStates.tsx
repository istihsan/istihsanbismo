import type { Entry, PageCopy } from "../content/index.ts";
import { FigureCaption } from "./FigureCaption.tsx";
import { ReSetText } from "./ReSetText.tsx";

type TableStatesProps = {
  figure: PageCopy["notes"]["statesFigure"];
  states: Entry[];
};

const KINDS = ["loading", "empty", "error"] as const;

// Literal class names: Tailwind keeps only classes it can find in source.
const KIND_CLASS = {
  loading: "wire",
  empty: "wire",
  error: "wire wire--error",
} as const;

function Wireframe({ kind }: { kind: (typeof KINDS)[number] }) {
  return (
    <div className={KIND_CLASS[kind]} aria-hidden="true">
      <span className="wire__head" />
      {kind === "loading" ? (
        <>
          <span className="wire__row" />
          <span className="wire__row" />
          <span className="wire__row" />
        </>
      ) : (
        <span className="wire__message">
          <span className="wire__line" />
          <span className="wire__line wire__line--short" />
          <span className="wire__button" />
        </span>
      )}
    </div>
  );
}

export function TableStates({ figure, states }: TableStatesProps) {
  return (
    <figure className="states">
      {/* The figcaption states this for assistive technology. */}
      <p className="plate__tag" aria-hidden="true">
        <ReSetText text={figure.tag} />
      </p>
      <ul className="states__list">
        {states.map((state, position) => (
          <li key={position} className="state">
            <Wireframe kind={KINDS[position] ?? "loading"} />
            <ReSetText as="p" text={state.title} className="state__name" />
            <ReSetText as="p" text={state.body} className="state__note" />
          </li>
        ))}
      </ul>
      <FigureCaption number={figure.number} caption={figure.caption} />
    </figure>
  );
}
