import type { PageCopy } from "../content/index.ts";
import { sheetHeadingId } from "../routes.ts";
import { FactList } from "./FactList.tsx";
import { Paperclip } from "./Paperclip.tsx";
import { ReSetText } from "./ReSetText.tsx";

type ClosingProps = {
  contact: PageCopy["contact"];
};

export function Closing({ contact }: ClosingProps) {
  return (
    <div className="closing">
      <div className="closing__lede">
        <ReSetText
          as="h2"
          id={sheetHeadingId("contact")}
          tabIndex={-1}
          text={contact.heading}
          className="sheet-title"
        />
        <ReSetText as="p" text={contact.closing} className="prose prose--lead" />
      </div>
      <div className="closing__summary">
        <ReSetText as="h3" text={contact.summaryLabel} className="subhead" />
        <div className="closing__facts-wrap">
          <span className="closing__clip" aria-hidden="true">
            <Paperclip />
          </span>
          <FactList facts={contact.summary} className="closing__facts" />
        </div>
      </div>
    </div>
  );
}
