import { ReSetText } from "./ReSetText.tsx";

type FigureCaptionProps = {
  number: string;
  caption: string;
};

export function FigureCaption({ number, caption }: FigureCaptionProps) {
  return (
    <figcaption className="figure-caption">
      <ReSetText text={number} className="figure-caption__no" />{" "}
      <span aria-hidden="true">—</span> <ReSetText text={caption} />
    </figcaption>
  );
}
