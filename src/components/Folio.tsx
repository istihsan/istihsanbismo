import type { PageCopy } from "../content/index.ts";
import { sheetHeadingId } from "../routes.ts";
import { CaseDiagram } from "./CaseDiagram.tsx";
import { EntryList } from "./EntryList.tsx";
import { FactList } from "./FactList.tsx";
import { ReSetText } from "./ReSetText.tsx";

type FolioProps = {
  folio: PageCopy["folio"];
  figure: PageCopy["figure"];
};

export function Folio({ folio, figure }: FolioProps) {
  const domains = [...figure.domains, folio.roleViews];

  return (
    <article className="folio">
      <div className="folio__opening">
        <div className="folio__lede">
          <ReSetText
            as="h2"
            id={sheetHeadingId("transjakarta")}
            tabIndex={-1}
            text={folio.caseTitle}
            className="sheet-title folio__title"
          />
          <div className="folio__block">
            <ReSetText as="h3" text={folio.contextHeading} className="subhead" />
            <ReSetText as="p" text={folio.context} className="prose" />
          </div>
          <FactList facts={folio.facts} className="folio__facts" />
        </div>

        <div className="folio__aside">
          <div className="folio__block">
            <ReSetText as="h3" text={folio.contributionHeading} className="subhead" />
            <ReSetText as="p" text={folio.contribution} className="prose prose--strong" />
            <ReSetText as="p" text={folio.scope} className="prose prose--muted" />
          </div>
          <div className="folio__block">
            <ReSetText as="h3" text={folio.domainsHeading} className="subhead" />
            <ul className="domain-list">
              {domains.map((domain, position) => (
                <li
                  key={position}
                  className={`domain-list__item${domain === folio.roleViews ? " domain-list__item--across" : ""}`}
                >
                  <ReSetText text={domain.name} className="domain-list__name" />
                  {domain.gloss ? (
                    <ReSetText
                      text={`(${domain.gloss})`}
                      className="domain-list__gloss"
                    />
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <CaseDiagram figure={figure} />

      <div className="folio__pairs">
        <div className="folio__block">
          <ReSetText as="h3" text={folio.challengesHeading} className="subhead" />
          <EntryList entries={folio.challenges} className="folio__entries" />
        </div>
        <div className="folio__block">
          <ReSetText as="h3" text={folio.decisionsHeading} className="subhead" />
          <EntryList entries={folio.decisions} className="folio__entries" />
        </div>
      </div>

      <div className="confidential">
        <p className="confidential__bars" aria-hidden="true">
          <span />
          <span />
          <span />
        </p>
        <div className="confidential__body">
          <ReSetText as="h3" text={folio.confidentialityHeading} className="subhead" />
          <ReSetText as="p" text={folio.confidentiality} className="prose" />
        </div>
      </div>
    </article>
  );
}
