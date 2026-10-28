import { useLayoutEffect, useRef, type ReactNode } from "react";
import type { PageCopy } from "../content/index.ts";
import type { Language } from "../language.ts";
import {
  headerRouteId,
  sheetHeadingId,
  sheetNumber,
  sheetTotal,
  type RouteId,
} from "../routes.ts";
import { PageMotionProvider } from "../motion/pageMotion.ts";
import { paperStyle } from "../paperShift.ts";
import { ReSetText } from "./ReSetText.tsx";
import { SheetPager } from "./SheetPager.tsx";

type SheetProps = {
  routeId: RouteId;
  active: boolean;
  exiting: boolean;
  turning: boolean;
  direction: 1 | -1;
  language: Language;
  copy: PageCopy;
  /** Replaces the default numbered header. */
  head?: { label: string; docRef: string };
  /** Contact pocket: after the pager in the DOM so tab order matches the page. */
  after?: ReactNode;
  children: ReactNode;
};

/** Stop content motion on the way out. The sheet turn itself is not in this subtree. */
function haltContentMotion(sheet: HTMLElement): void {
  const scopes = sheet.querySelectorAll(".sheet__body, .pager");
  scopes.forEach((scope) => {
    const nodes = [scope, ...scope.querySelectorAll("*")];
    nodes.forEach((node) => {
      node.getAnimations().forEach((animation) => animation.cancel());
    });
  });
}

function sheetClass(active: boolean, exiting: boolean, direction: 1 | -1): string {
  const names = ["sheet", "on-paper"];
  if (active) names.push("sheet--active");
  if (active && !exiting) names.push("sheet--live");
  if (exiting) {
    names.push("sheet--exiting");
    names.push(direction === 1 ? "sheet--forward" : "sheet--back");
  }
  return names.join(" ");
}

export function Sheet({
  routeId,
  active,
  exiting,
  turning,
  direction,
  language,
  copy,
  head,
  after,
  children,
}: SheetProps) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;
    const locked = !active || turning;
    node.inert = locked;
    if (locked) node.setAttribute("inert", "");
    else node.removeAttribute("inert");
    if (exiting) haltContentMotion(node);
  }, [active, turning, exiting]);

  const headerId = headerRouteId(routeId);
  const number = sheetNumber(routeId);
  const total = sheetTotal();

  return (
    <section
      ref={ref}
      id={`sheet-${routeId}`}
      aria-labelledby={sheetHeadingId(routeId)}
      className={sheetClass(active, exiting, direction)}
      style={paperStyle(routeId)}
    >
      <div className="sheet__leaf">
        <div className="sheet__face">
          <span className="sheet__wear" aria-hidden="true" />
          <div className="sheet__head">
            {head ? (
              <ReSetText as="p" text={head.label} className="sheet__label" />
            ) : number ? (
              <p className="sheet__label">
                <span className="sheet__no">{number}</span>
                <span aria-hidden="true"> — </span>
                <ReSetText text={copy.segments[headerId].label} />
              </p>
            ) : (
              <ReSetText
                as="p"
                text={copy.segments[routeId].label}
                className="sheet__label"
              />
            )}
            {head ? (
              <ReSetText as="p" text={head.docRef} className="sheet__ref" />
            ) : number ? (
              <p className="sheet__ref">
                {number} / {total}
              </p>
            ) : (
              <span className="sheet__ref" />
            )}
          </div>
          <div className="sheet__body">
            <PageMotionProvider live={active && !exiting} epoch={language}>
              {children}
            </PageMotionProvider>
          </div>
          <SheetPager
            copy={copy}
            routeId={routeId}
            language={language}
            active={active}
            turning={turning}
          />
          {after}
        </div>
        <span className="sheet__shade" aria-hidden="true" />
        <span className="sheet__spec" aria-hidden="true" />
        <span className="sheet__verso" aria-hidden="true" />
        <span className="sheet__curl" aria-hidden="true" />
      </div>
      <span className="sheet__cast" aria-hidden="true" />
    </section>
  );
}
