type TextTag =
  | "p"
  | "span"
  | "h2"
  | "h3"
  | "h4"
  | "dt"
  | "dd"
  | "figcaption";

type ReSetTextProps = {
  as?: TextTag;
  text: string;
  className?: string;
  id?: string;
  tabIndex?: number;
};

/** Translatable text. Language changes update the node immediately. */
export function ReSetText({
  as: Tag = "span",
  text,
  className,
  id,
  tabIndex,
}: ReSetTextProps) {
  return (
    <Tag id={id} tabIndex={tabIndex} className={className}>
      {text}
    </Tag>
  );
}
