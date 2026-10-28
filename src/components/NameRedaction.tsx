import { useLayoutEffect, useRef } from "react";
import { animate } from "motion/react";
import { EASE_OUT } from "../motion/ease.ts";
import { usePageMotion } from "../motion/pageMotion.ts";

const DRAW = 1.15;

type NameRedactionProps = {
  play: boolean;
  onDone: () => void;
};

/**
 * One ink plate over the cover name. A jagged clip travels left to right
 * until the plate is already gone, then the node unmounts.
 */
export function NameRedaction({ play, onDone }: NameRedactionProps) {
  const plateRef = useRef<HTMLSpanElement>(null);
  const { live } = usePageMotion();
  const onDoneRef = useRef(onDone);
  const finished = useRef(false);
  onDoneRef.current = onDone;

  function finish() {
    if (finished.current) return;
    finished.current = true;
    onDoneRef.current();
  }

  useLayoutEffect(() => {
    const plate = plateRef.current;
    if (!plate) return;
    if (!play || !live) return;

    let cancelled = false;
    const control = animate(0, 1, {
      duration: DRAW,
      ease: EASE_OUT,
      onUpdate: (value) => {
        plate.style.setProperty("--scratch", String(value));
      },
    });

    const backup = window.setTimeout(() => {
      if (cancelled) return;
      plate.style.setProperty("--scratch", "1");
      window.requestAnimationFrame(() => {
        if (!cancelled) finish();
      });
    }, DRAW * 1000 + 70);

    control.finished.then(
      () => {
        if (cancelled) return;
        plate.style.setProperty("--scratch", "1");
        window.requestAnimationFrame(() => {
          if (!cancelled) finish();
        });
      },
      () => {},
    );

    return () => {
      cancelled = true;
      control.stop();
      window.clearTimeout(backup);
    };
  }, [play, live]);

  return <span ref={plateRef} className="cover__redact" aria-hidden="true" />;
}
