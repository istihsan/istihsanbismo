import type { Layer, PageCopy } from "../content/index.ts";
import { FigureCaption } from "./FigureCaption.tsx";
import { InkCircle } from "./InkMark.tsx";
import { ReSetText } from "./ReSetText.tsx";

type LayerDiagramProps = {
  figure: PageCopy["notes"]["layerFigure"];
  layers: Layer[];
  markedIndex?: number;
};

/** A layered frontend, top to bottom, with an annotation per layer. */
export function LayerDiagram({ figure, layers, markedIndex }: LayerDiagramProps) {
  return (
    <figure className="layers">
      <div className="plate">
        {/* The figcaption states this for assistive technology. */}
        <p className="plate__tag" aria-hidden="true">
          <ReSetText text={figure.tag} />
        </p>
        <ol className="layers__stack">
          {layers.map((layer, position) => (
            <li
              key={position}
              className={`layer${position === layers.length - 1 ? " layer--boundary" : ""}${
                position === markedIndex ? " layer--marked" : ""
              }`}
            >
              <p className="layer__bar">
                <span className="layer__no" aria-hidden="true">
                  L{position + 1}
                </span>
                <ReSetText text={layer.name} className="layer__name" />
                {position === markedIndex ? <InkCircle /> : null}
              </p>
              <ReSetText as="p" text={layer.note} className="layer__note" />
            </li>
          ))}
        </ol>
      </div>
      <FigureCaption number={figure.number} caption={figure.caption} />
    </figure>
  );
}
