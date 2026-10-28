import { useCallback, useLayoutEffect, useRef, type ReactNode } from "react";
import { animate, useInView } from "motion/react";
import { EASE_OUT } from "../motion/ease.ts";
import { usePageMotion } from "../motion/pageMotion.ts";
import { useQuietMotion } from "../motion/quiet.ts";

type DrawProps = {
  className: string;
  viewBox: string;
  children: (pathRef: (node: SVGGeometryElement | null) => void) => ReactNode;
};

function DrawOnce({ className, viewBox, children }: DrawProps) {
  const ref = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGGeometryElement | null>(null);
  const setPath = useCallback((node: SVGGeometryElement | null) => {
    pathRef.current = node;
    if (!node || node.dataset.inkReady === "1") return;
    node.dataset.inkReady = "1";
    node.setAttribute("pathLength", "1");
    node.setAttribute("stroke-dasharray", "1");
    node.setAttribute("stroke-dashoffset", "1");
  }, []);
  const inView = useInView(ref, { once: true, amount: 0.45 });
  const quiet = useQuietMotion();
  const { live, epoch } = usePageMotion();
  const mountEpoch = useRef(epoch);

  useLayoutEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    if (quiet || epoch !== mountEpoch.current) {
      path.getAnimations().forEach((animation) => animation.cancel());
      path.style.strokeDasharray = "none";
      path.style.strokeDashoffset = "0";
      return;
    }
    if (!live) {
      const dasharray = getComputedStyle(path).strokeDasharray;
      const dashoffset = getComputedStyle(path).strokeDashoffset;
      path.getAnimations().forEach((animation) => animation.cancel());
      path.style.strokeDasharray = dasharray;
      path.style.strokeDashoffset = dashoffset;
      return;
    }
    if (!inView) return;
    const controls = animate(path, { pathLength: [0, 1] }, { duration: 0.6, ease: EASE_OUT });
    return () => {
      const dasharray = getComputedStyle(path).strokeDasharray;
      const dashoffset = getComputedStyle(path).strokeDashoffset;
      controls.stop();
      path.getAnimations().forEach((animation) => animation.cancel());
      path.style.strokeDasharray = dasharray;
      path.style.strokeDashoffset = dashoffset;
    };
  }, [quiet, live, inView, epoch]);

  return (
    <svg
      ref={ref}
      className={className}
      viewBox={viewBox}
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      {children(setPath)}
    </svg>
  );
}

function strokeProps(pathRef: (node: SVGGeometryElement | null) => void) {
  return {
    ref: pathRef,
    fill: "none" as const,
    stroke: "currentColor",
    vectorEffect: "non-scaling-stroke" as const,
  };
}

/** Thin oxblood ellipse. Draws once in view, and stops if the page leaves. */
export function InkCircle() {
  return (
    <DrawOnce className="ink-circle" viewBox="0 0 200 80">
      {(pathRef) => (
        <ellipse
          {...strokeProps(pathRef)}
          cx="100"
          cy="40"
          rx="94"
          ry="32"
          strokeWidth="1.25"
        />
      )}
    </DrawOnce>
  );
}

/** Horizontal rule. Draws once in view, and stops if the page leaves. */
export function InkRule() {
  return (
    <DrawOnce className="ink-rule" viewBox="0 0 100 2">
      {(pathRef) => (
        <path {...strokeProps(pathRef)} d="M0 1 H100" strokeWidth="1" />
      )}
    </DrawOnce>
  );
}
