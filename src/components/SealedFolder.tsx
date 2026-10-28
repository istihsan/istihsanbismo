import { useLayoutEffect, useRef, useState } from "react";
import { animate } from "motion/react";
import type { PageCopy } from "../content/index.ts";
import { EASE_OUT } from "../motion/ease.ts";

type Box = {
  top: number;
  left: number;
  width: number;
  height: number;
};

type SealedFolderProps = {
  copy: PageCopy;
  onDone: () => void;
  onSkip: () => void;
  onReveal: () => void;
};

/** Hold, hinge, tear on a readable plane, then throw the cover off the sheet. */
const HOLD = 0.5;
const OPEN = 0.82;
const TEAR = 0.38;
const FLY = 0.86;
const OPEN_AT = HOLD;
const TEAR_AT = OPEN_AT + OPEN;
const FLY_AT = TEAR_AT + TEAR;
const SCRATCH_AT_MS = Math.round((TEAR_AT - 0.06) * 1000);
const DONE_FALLBACK_MS = Math.round((FLY_AT + FLY + 0.4) * 1000);

/** Heavier than the document ease: the cover has to feel like board, not a fade. */
const HINGE_EASE = [0.62, 0.04, 0.18, 1] as const;
const FLY_EASE = [0.32, 0.04, 0.18, 1] as const;
/** Same vertex count so the rip interpolates instead of snapping. */
const WHOLE =
  "polygon(0% 0%, 0% 12%, 0% 24%, 0% 37%, 0% 50%, 0% 63%, 0% 76%, 0% 88%, 0% 100%, 100% 100%, 100% 0%)";
const TORN =
  "polygon(20% 0%, 4% 12%, 24% 24%, 2% 37%, 18% 50%, 1% 63%, 22% 76%, 5% 88%, 16% 100%, 100% 100%, 100% 0%)";

function readCompact(): boolean {
  return window.matchMedia("(max-width: 1023px)").matches;
}

function measureStack(): Box | "fallback" {
  const node =
    document.querySelector<HTMLElement>(".sheet-stack") ??
    document.querySelector<HTMLElement>(".stage");
  if (!node) return "fallback";
  const rect = node.getBoundingClientRect();
  const overflows =
    rect.width < 8 ||
    rect.height < 8 ||
    rect.left < -1 ||
    rect.left + rect.width > window.innerWidth + 1;
  if (overflows) return "fallback";
  return { top: rect.top, left: rect.left, width: rect.width, height: rect.height };
}

/**
 * One closed folder, hinged on the left, over the real cover.
 * Motion owns this sequence. The cover underneath is the portfolio.
 */
export function SealedFolder({ copy, onDone, onSkip, onReveal }: SealedFolderProps) {
  const compact = useRef(readCompact()).current;
  const [box, setBox] = useState<Box | "fallback" | null>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const flapRef = useRef<HTMLDivElement>(null);
  const hingeRef = useRef<HTMLDivElement>(null);
  const onDoneRef = useRef(onDone);
  const onRevealRef = useRef(onReveal);
  onDoneRef.current = onDone;
  onRevealRef.current = onReveal;

  useLayoutEffect(() => {
    setBox(measureStack());
  }, []);

  useLayoutEffect(() => {
    if (!box) return;
    const scrim = scrimRef.current;
    const shadow = shadowRef.current;
    const flap = flapRef.current;
    const hinge = hingeRef.current;
    if (!scrim || !shadow || !flap || !hinge) return;

    let cancelled = false;
    let done = false;
    let tearPlay: ReturnType<typeof animate> | null = null;
    const complete = () => {
      if (cancelled || done) return;
      done = true;
      onDoneRef.current();
    };
    /* Stay broad enough that the rip is a plane, not an edge-on sliver. */
    const swing = compact ? "-48deg" : "-54deg";

    const openPlay = animate([
      [shadow, { opacity: [0.42, 0.62] }, { duration: HOLD, ease: EASE_OUT }],
      [
        flap,
        { rotateY: ["0deg", swing] },
        { duration: OPEN, at: OPEN_AT, ease: HINGE_EASE },
      ],
      [
        shadow,
        { opacity: [0.62, 0.36], x: ["0%", "-8%"] },
        { duration: OPEN, at: OPEN_AT, ease: HINGE_EASE },
      ],
      [scrim, { opacity: [0.82, 0] }, { duration: OPEN, at: OPEN_AT, ease: EASE_OUT }],
    ]);

    void openPlay.finished.then(() => {
      if (cancelled) return;
      /* Clip starts only after the hinge, so the open itself stays a transform. */
      tearPlay = animate([
        [
          flap,
          { clipPath: [WHOLE, TORN] },
          { duration: TEAR, ease: EASE_OUT },
        ],
        [
          flap,
          {
            x: ["0%", "-155%"],
            y: ["0%", "-36%"],
            rotate: ["0deg", "-16deg"],
            rotateY: [swing, "-108deg"],
          },
          { duration: FLY, at: TEAR, ease: FLY_EASE },
        ],
        [
          hinge,
          { x: ["0%", "-155%"], y: ["0%", "-36%"], rotate: ["0deg", "-16deg"] },
          { duration: FLY, at: TEAR, ease: FLY_EASE },
        ],
        [
          shadow,
          { x: ["-8%", "-130%"], opacity: [0.36, 0] },
          { duration: FLY, at: TEAR, ease: EASE_OUT },
        ],
      ]);
      void tearPlay.finished.then(complete, () => {});
    }, () => {});

    const revealTimer = window.setTimeout(() => {
      if (!cancelled) onRevealRef.current();
    }, SCRATCH_AT_MS);

    const doneFallback = window.setTimeout(complete, DONE_FALLBACK_MS);

    return () => {
      cancelled = true;
      openPlay.stop();
      tearPlay?.stop();
      window.clearTimeout(revealTimer);
      window.clearTimeout(doneFallback);
    };
  }, [box, compact]);

  const placed = box && box !== "fallback" ? box : null;

  return (
    <>
      <button type="button" className="opening-skip" onClick={onSkip}>
        {copy.cover.skipIntro}
      </button>
      <div
        className={compact ? "opening opening--compact" : "opening"}
        aria-hidden="true"
        data-opening={box === "fallback" ? "fallback" : placed ? "measured" : "pending"}
      >
        <div ref={scrimRef} className="opening__scrim" />
        {box ? (
          <div
            className="opening__scene"
            style={
              placed
                ? {
                    top: placed.top,
                    left: placed.left,
                    width: placed.width,
                    height: placed.height,
                    perspective: `${Math.round(placed.width * 3.4)}px`,
                  }
                : undefined
            }
          >
            <div ref={shadowRef} className="opening__shadow" />
            <div ref={hingeRef} className="opening__hinge" />
            <div ref={flapRef} className="opening__flap">
              <div className="opening__deck" />
              <div className="opening__front">
                <div className="opening__label">
                  <p className="opening__name">{copy.name}</p>
                  <p className="opening__role">{copy.title}</p>
                  <p className="opening__tab">{copy.cover.personnelDossier}</p>
                  <p className="opening__meta">
                    {copy.cover.fileReference} {copy.dossier.fileId}
                  </p>
                  <p className="opening__meta">
                    {copy.cover.classification} {copy.cover.accessMark}
                  </p>
                </div>
              </div>
              <div className="opening__inside" />
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
