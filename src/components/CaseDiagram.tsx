import type { PageCopy } from "../content/index.ts";
import type { DiagramNode as DiagramNodeCopy } from "../content/types.ts";
import { useContentHeld } from "../motion/pageMotion.ts";
import { FigureCaption } from "./FigureCaption.tsx";
import { ReSetText } from "./ReSetText.tsx";

type CaseDiagramProps = {
  figure: PageCopy["figure"];
};

type NodeHeadProps = {
  node: DiagramNodeCopy;
};

function NodeHead({ node }: NodeHeadProps) {
  return (
    <>
      <ReSetText as="p" text={node.tag} className="diagram__tag" />
      <ReSetText as="p" text={node.title} className="diagram__title" />
      <ReSetText as="p" text={node.note} className="diagram__note" />
    </>
  );
}

export function CaseDiagram({ figure }: CaseDiagramProps) {
  const held = useContentHeld();

  return (
    <figure className={held ? "diagram diagram--still" : "diagram"}>
      <div className="plate">
        {/* The figcaption states this for assistive technology. */}
        <p className="plate__tag" aria-hidden="true">
          <ReSetText text={figure.tag} />
        </p>
        <ol className="diagram__flow">
          <li className="diagram__node diagram__node--adjacent">
            <NodeHead node={figure.passengerApp} />
          </li>
          <li className="diagram__node diagram__node--built">
            <ReSetText as="p" text={figure.edgeIn} className="diagram__edge" />
            <NodeHead node={figure.dashboard} />
            <ul className="diagram__domains">
              {figure.domains.map((domain, position) => (
                <li key={position} className="diagram__domain">
                  <ReSetText text={domain.name} />
                  {domain.gloss ? (
                    <>
                      {" "}
                      <ReSetText
                        text={`(${domain.gloss})`}
                        className="diagram__gloss"
                      />
                    </>
                  ) : null}
                </li>
              ))}
            </ul>
            <ul className="diagram__layers">
              {figure.layers.map((layer, position) => (
                <li key={position}>
                  <ReSetText text={layer} />
                </li>
              ))}
            </ul>
          </li>
          <li className="diagram__node diagram__node--adjacent">
            <NodeHead node={figure.fieldOps} />
          </li>
        </ol>
      </div>
      <FigureCaption number={figure.number} caption={figure.caption} />
    </figure>
  );
}
