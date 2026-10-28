import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import type { PageCopy } from "../content/index.ts";
import type { Language } from "../language.ts";
import { pathFor } from "../routes.ts";
import { Arrow } from "./Arrow.tsx";
import { CaseStrip } from "./CaseStrip.tsx";
import { ReSetText } from "./ReSetText.tsx";

type EvidenceRegisterProps = {
  copy: PageCopy;
  language: Language;
};

type Variant = "flagship" | "archive" | "sealed";

type Row = {
  no: string;
  to: string;
  title: string;
  detail: string;
  status: string;
  role?: string;
  stack?: string;
  variant: Variant;
  visual?: ReactNode;
};

export function EvidenceRegister({ copy, language }: EvidenceRegisterProps) {
  const { work, figure } = copy;
  const rows: Row[] = [
    {
      no: "01",
      to: pathFor(language, "transjakarta"),
      title: work.transjakarta.title,
      detail: work.transjakarta.kind,
      status: work.transjakarta.note,
      role: work.transjakarta.role,
      stack: work.transjakarta.stack,
      variant: "flagship",
      visual: <CaseStrip figure={figure} />,
    },
    {
      no: "02",
      to: pathFor(language, "mern-website"),
      title: work.mern.title,
      detail: work.mern.kind,
      status: work.mern.note,
      stack: work.mern.stack,
      variant: "archive",
    },
    {
      no: "03",
      to: pathFor(language, "tycoon-game"),
      title: work.tycoon.title,
      detail: work.tycoon.description,
      status: work.tycoon.stamp,
      variant: "sealed",
      visual: <SealedPreview stamp={work.tycoon.stamp} />,
    },
  ];

  return (
    <ol className="evidence">
      {rows.map((row) => (
        <li key={row.no} className={`evidence__item evidence__item--${row.variant}`}>
          <span className="evidence__no">
            <span className="evidence__index">{row.no}</span>
            <ReSetText text={work.exhibit} className="evidence__exhibit" />
          </span>
          <span className="evidence__copy">
            <span className="evidence__headline">
              <h3 className="evidence__title">
                <Link to={row.to} className="evidence__link">
                  <ReSetText text={row.title} />
                </Link>
              </h3>
              <ReSetText text={row.status} className="evidence__status" />
            </span>
            <ReSetText as="p" text={row.detail} className="evidence__detail" />
            {row.role ? <ReSetText as="p" text={row.role} className="evidence__meta" /> : null}
            {row.stack ? <ReSetText as="p" text={row.stack} className="evidence__meta" /> : null}
            {row.variant !== "sealed" ? row.visual : null}
          </span>
          {row.variant === "sealed" ? row.visual : null}
          <span className="evidence__open">
            <ReSetText text={work.open} />
            <Arrow />
          </span>
        </li>
      ))}
    </ol>
  );
}

function SealedPreview({ stamp }: { stamp: string }) {
  return (
    <span className="tycoon-sheet__seal evidence__seal" aria-hidden="true">
      <span className="tycoon-sheet__thumb" />
      <span className="work-card__stamp">
        <ReSetText text={stamp} />
      </span>
    </span>
  );
}
