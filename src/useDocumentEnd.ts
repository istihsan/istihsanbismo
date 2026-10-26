import { useEffect, useState, type RefObject } from "react";

/** Fractional pixels and mobile browser chrome. */
const DOCUMENT_END_EPSILON = 8;

function canScrollY(element: HTMLElement): boolean {
  const overflowY = getComputedStyle(element).overflowY;
  return overflowY === "auto" || overflowY === "scroll" || overflowY === "overlay";
}

function isAtEnd(element: HTMLElement): boolean {
  return element.scrollHeight - element.scrollTop - element.clientHeight <= DOCUMENT_END_EPSILON;
}

/**
 * The sheet scrolls on `.sheet__body`, unless a pocket or a short viewport
 * moves that scroll onto `.sheet__face`. Only one of those is a scroll container.
 */
function pickScroller(face: HTMLElement, body: HTMLElement | null): HTMLElement | null {
  const candidates = [body, face].filter((element): element is HTMLElement => {
    return element !== null && canScrollY(element);
  });
  const overflowing = candidates.filter(
    (element) => element.scrollHeight - element.clientHeight > DOCUMENT_END_EPSILON,
  );
  if (overflowing.length === 1) return overflowing[0];
  if (overflowing.length > 1) {
    return overflowing.find((element) => element.classList.contains("sheet__body")) ?? overflowing[0];
  }
  return candidates.find((element) => element.classList.contains("sheet__body")) ?? candidates[0] ?? null;
}

/**
 * Whether the active sheet's scroller has reached its end.
 * One scroll listener, on the element that is actually scrolling. Does not navigate.
 */
export function useDocumentEnd(
  enabled: boolean,
  rootRef: RefObject<HTMLElement | null>,
): boolean {
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setAtEnd(false);
      return;
    }

    const root = rootRef.current;
    if (!root) {
      setAtEnd(false);
      return;
    }

    let alive = true;
    let resolving = false;
    let scroller: HTMLElement | null = null;
    let observer: ResizeObserver | null = null;

    const publish = (value: boolean) => {
      if (!alive) return;
      setAtEnd((current) => (current === value ? current : value));
    };

    const measure = () => {
      publish(scroller ? isAtEnd(scroller) : true);
    };

    const detach = () => {
      scroller?.removeEventListener("scroll", measure);
      observer?.disconnect();
      observer = null;
    };

    const resolve = () => {
      if (resolving) {
        measure();
        return;
      }
      resolving = true;

      try {
        const face = root.closest<HTMLElement>(".sheet__face");
        if (!face) {
          detach();
          scroller = null;
          publish(false);
          return;
        }

        const body = face.querySelector<HTMLElement>(".sheet__body");
        const next = pickScroller(face, body);
        if (next === scroller) {
          measure();
          return;
        }

        detach();
        scroller = next;
        if (!scroller) {
          publish(true);
          return;
        }

        scroller.addEventListener("scroll", measure, { passive: true });
        observer = new ResizeObserver(() => {
          resolve();
        });
        observer.observe(scroller);
        for (const child of scroller.children) {
          if (child instanceof HTMLElement) observer.observe(child);
        }
        measure();
      } finally {
        resolving = false;
      }
    };

    const shortSheet = window.matchMedia("(max-height: 720px)");
    const onLayout = () => resolve();
    shortSheet.addEventListener("change", onLayout);
    window.visualViewport?.addEventListener("resize", onLayout);
    resolve();

    return () => {
      alive = false;
      detach();
      shortSheet.removeEventListener("change", onLayout);
      window.visualViewport?.removeEventListener("resize", onLayout);
    };
  }, [enabled, rootRef]);

  return atEnd;
}
