import { useReducedMotion } from "motion/react";

/** True when decorative motion should not run. Synchronous on the client. */
export function useQuietMotion(): boolean {
  const reduced = useReducedMotion();
  if (reduced === true) return true;
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
