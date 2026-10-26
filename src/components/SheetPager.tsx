import { Link } from "react-router-dom";
import type { PageCopy } from "../content/index.ts";
import type { Language } from "../language.ts";
import {
  pagerNeighbors,
  pathFor,
  sheetNumber,
  type RouteId,
} from "../routes.ts";
import { Arrow } from "./Arrow.tsx";
import { ReSetText } from "./ReSetText.tsx";

type SheetPagerProps = {
  copy: PageCopy;
  routeId: RouteId;
  language: Language;
};

export function SheetPager({ copy, routeId, language }: SheetPagerProps) {
  if (routeId === "missing") {
    return (
      <nav aria-label={copy.dossier.pagerLabel} className="pager">
        <Link to={pathFor(language, "cover")} className="pager__link pager__link--next">
          <ReSetText text={copy.missing.home} className="label" />
          <span className="pager__title">
            <ReSetText text={copy.segments.cover.label} />
            <Arrow />
          </span>
        </Link>
      </nav>
    );
  }

  const { previous, next } = pagerNeighbors(routeId);

  return (
    <nav aria-label={copy.dossier.pagerLabel} className="pager">
      {previous ? (
        <Link
          to={pathFor(language, previous)}
          className="pager__link pager__link--previous"
        >
          <ReSetText text={copy.dossier.previous} className="label" />
          <span className="pager__title">
            <Arrow direction="left" />
            {pagerRef(previous)}
            <ReSetText text={copy.segments[previous].label} />
          </span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link to={pathFor(language, next)} className="pager__link pager__link--next">
          <ReSetText text={copy.dossier.next} className="label" />
          <span className="pager__title">
            {pagerRef(next)}
            <ReSetText text={copy.segments[next].label} />
            <Arrow />
          </span>
        </Link>
      ) : (
        <ReSetText as="p" text={copy.dossier.endOfFile} className="label pager__end" />
      )}
    </nav>
  );
}

function pagerRef(routeId: RouteId): string {
  const number = sheetNumber(routeId);
  if (!number || routeId === "transjakarta" || routeId === "mern-website" || routeId === "tycoon-game") {
    return "";
  }
  return `${number} `;
}
