import { useRef, useState, type MouseEvent } from "react";
import { Link } from "react-router-dom";
import type { PageCopy } from "../content/index.ts";
import type { Language } from "../language.ts";
import {
  pagerNeighbors,
  pathFor,
  sheetNumber,
  type RouteId,
} from "../routes.ts";
import { useDocumentEnd } from "../useDocumentEnd.ts";
import { Arrow } from "./Arrow.tsx";
import { ReSetText } from "./ReSetText.tsx";

type SheetPagerProps = {
  copy: PageCopy;
  routeId: RouteId;
  language: Language;
  active: boolean;
  turning: boolean;
};

export function SheetPager({ copy, routeId, language, active, turning }: SheetPagerProps) {
  const navRef = useRef<HTMLElement>(null);
  const [dismissed, setDismissed] = useState(false);
  const nextId = routeId === "missing" ? null : pagerNeighbors(routeId).next;
  const atEnd = useDocumentEnd(active && !turning && nextId !== null, navRef);

  if (routeId === "missing") {
    return (
      <nav ref={navRef} aria-label={copy.dossier.pagerLabel} className="pager">
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
  const cue = Boolean(next) && atEnd && !dismissed && active && !turning;

  function onNext(event: MouseEvent<HTMLAnchorElement>) {
    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    ) {
      return;
    }
    setDismissed(true);
  }

  return (
    <nav ref={navRef} aria-label={copy.dossier.pagerLabel} className="pager">
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
        <Link
          to={pathFor(language, next)}
          className={`pager__link pager__link--next${cue ? " pager__link--cue" : ""}`}
          onClick={onNext}
        >
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
