/**
 * Consumed on animation end, Skip, or any non-cover route.
 * Module scope only: a full reload clears it, so the cover may open again.
 * Not sessionStorage, and not a store.
 */
let openingConsumed = false;

export function consumeOpening(): void {
  openingConsumed = true;
}

function motionBlocked(): boolean {
  if (typeof window === "undefined") return true;
  return (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    window.matchMedia("print").matches ||
    window.matchMedia("(forced-colors: active)").matches
  );
}

/** Direct inner routes consume the opening without playing it. */
export function openingShouldPlay(routeId: string): boolean {
  if (routeId !== "cover") {
    openingConsumed = true;
    return false;
  }
  if (motionBlocked() || openingConsumed) return false;
  return true;
}
