import type { Entry } from "../content/index.ts";
import { ReSetText } from "./ReSetText.tsx";

type EntryListProps = {
  entries: Entry[];
  titleAs?: "h3" | "h4" | "p";
  className?: string;
};

export function EntryList({
  entries,
  titleAs = "p",
  className = "",
}: EntryListProps) {
  return (
    <ol className={`entry-list ${className}`}>
      {entries.map((entry, position) => (
        <li key={position} className="entry-list__item">
          <ReSetText
            as={titleAs}
            text={entry.title}
            className="entry-list__title"
          />
          <ReSetText as="p" text={entry.body} className="entry-list__body" />
        </li>
      ))}
    </ol>
  );
}
