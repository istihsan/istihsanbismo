import { Link } from "react-router-dom";
import type { PageCopy } from "../content/index.ts";
import type { Language } from "../language.ts";
import {
  headerRouteId,
  pathFor,
  sheetNumber,
  SPINE_ORDER,
  spineCurrent,
  type RouteId,
} from "../routes.ts";
import { LanguageSwitch } from "./LanguageSwitch.tsx";
import { ReSetText } from "./ReSetText.tsx";

type SpineProps = {
  copy: PageCopy;
  language: Language;
  routeId: RouteId;
  onSelectLanguage: (next: Language) => void;
};

export function Spine({ copy, language, routeId, onSelectLanguage }: SpineProps) {
  const current = spineCurrent(routeId);
  const markNumber = sheetNumber(routeId);
  const markName = copy.segments[headerRouteId(routeId)].short;

  return (
    <div className="spine__inner">
      <div className="spine__lang">
        <LanguageSwitch language={language} onSelect={onSelectLanguage} />
      </div>
      <nav aria-label={copy.dossier.navLabel} className="spine__nav">
        <ol className="spine__tabs">
          {SPINE_ORDER.map((id) => (
            <li key={id}>
              <Link
                to={pathFor(language, id)}
                aria-current={id === current ? "page" : undefined}
                className="spine-tab"
              >
                <span className="spine-tab__no">{sheetNumber(id)}</span>
                <ReSetText
                  text={copy.segments[id].short}
                  className="spine-tab__label"
                />
              </Link>
            </li>
          ))}
        </ol>
      </nav>
      <p className="spine__mark" aria-hidden="true">
        <ReSetText text={copy.dossier.spineLabel} />
        {markNumber ? ` · ${markNumber}` : ` · ${markName}`}
      </p>
    </div>
  );
}
