import { Link } from "react-router-dom";
import type { PageCopy } from "../content/index.ts";
import type { Language } from "../language.ts";
import { pathFor } from "../routes.ts";
import { ReSetText } from "./ReSetText.tsx";

type CoverWindowProps = {
  figure: PageCopy["figure"];
  caption: string;
  language: Language;
  caseTitle: string;
};

/**
 * The featured-project window: a miniature of the system-context diagram
 * in an oxblood inset frame. The plate opens the Transjakarta folio.
 */
export function CoverWindow({
  figure,
  caption,
  language,
  caseTitle,
}: CoverWindowProps) {
  return (
    <figure className="window">
      <Link
        to={pathFor(language, "transjakarta")}
        className="window__frame"
        aria-label={caseTitle}
      >
        <div className="window__plate on-dark" aria-hidden="true">
          <ReSetText as="p" text={figure.tag} className="window__tag" />
          <div className="mini">
            <ReSetText
              as="p"
              text={figure.passengerApp.title}
              className="mini__node mini__node--adjacent"
            />
            <span className="mini__edge mini__edge--directed" />
            <div className="mini__node mini__node--built">
              <ReSetText as="p" text={figure.dashboard.title} className="mini__title" />
              <div className="mini__domains">
                {figure.domains.map((domain, position) => (
                  <ReSetText key={position} text={domain.name} className="mini__domain" />
                ))}
              </div>
              <div className="mini__layers">
                {figure.layers.map((layer) => (
                  <span key={layer} className="mini__layer" />
                ))}
              </div>
            </div>
            <span className="mini__edge" />
            <ReSetText
              as="p"
              text={figure.fieldOps.title}
              className="mini__node mini__node--adjacent"
            />
          </div>
        </div>
      </Link>
      <figcaption className="window__caption">
        <ReSetText text={caption} />
      </figcaption>
    </figure>
  );
}
