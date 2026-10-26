import { Link } from "react-router-dom";
import type { PageCopy, WorkCardCopy } from "../content/index.ts";
import type { Language } from "../language.ts";
import { pathFor } from "../routes.ts";
import { ReSetText } from "./ReSetText.tsx";

type WorkDestination = "transjakarta" | "mern-website" | "tycoon-game";

type PublishedCardProps = {
  language: Language;
  routeId: Exclude<WorkDestination, "tycoon-game">;
  card: WorkCardCopy;
  comingSoon?: never;
};

type ComingSoonCardProps = {
  language: Language;
  routeId: "tycoon-game";
  card?: never;
  comingSoon: PageCopy["work"]["tycoon"];
};

type WorkCardProps = PublishedCardProps | ComingSoonCardProps;

export function WorkCard(props: WorkCardProps) {
  const to = pathFor(props.language, props.routeId);

  if (props.comingSoon) {
    return (
      <Link to={to} className="work-card work-card--soon">
        <span className="work-card__thumb" aria-hidden="true" />
        <span className="work-card__body">
          <ReSetText text={props.comingSoon.stamp} className="work-card__stamp" />
          <ReSetText text={props.comingSoon.title} className="work-card__title" />
          <ReSetText
            text={props.comingSoon.description}
            className="work-card__copy"
          />
        </span>
      </Link>
    );
  }

  return (
    <Link to={to} className="work-card">
      <span className="work-card__body">
        <ReSetText text={props.card.note} className="work-card__note" />
        <ReSetText text={props.card.title} className="work-card__title" />
        <ReSetText text={props.card.kind} className="work-card__copy" />
        {props.card.role ? (
          <ReSetText text={props.card.role} className="work-card__meta" />
        ) : null}
        <ReSetText text={props.card.stack} className="work-card__meta" />
      </span>
    </Link>
  );
}
