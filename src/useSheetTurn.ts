import { useEffect, useState } from "react";
import { type RouteId, turnDirection } from "./routes.ts";
import { SHEET_TURN_MS } from "./sheetTurn.ts";

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

type SheetTurnState = {
  exiting: RouteId | null;
  direction: 1 | -1;
  /** False until the reader first moves to another sheet. */
  turned: boolean;
};

/**
 * Keeps the previous sheet mounted for the page turn.
 * The exit is recorded during render so the first commit of the new route
 * still contains that sheet. A layout effect would unmount it for a frame
 * and mount a fresh copy, which restarts its content animations.
 */
export function useSheetTurn(routeId: RouteId, freeze = false): SheetTurnState {
  const [shown, setShown] = useState(routeId);
  const [state, setState] = useState<SheetTurnState>({
    exiting: null,
    direction: 1,
    turned: false,
  });

  if (freeze) {
    if (shown !== routeId) setShown(routeId);
    if (state.exiting !== null) setState({ ...state, exiting: null });
  } else if (routeId !== shown) {
    const previous = shown;
    setShown(routeId);
    setState({
      exiting: previous,
      direction: turnDirection(previous, routeId),
      turned: true,
    });
  }

  useEffect(() => {
    if (!state.exiting) return;
    const hold = prefersReducedMotion() ? 0 : SHEET_TURN_MS;
    const timer = window.setTimeout(() => {
      setState((now) => ({ ...now, exiting: null }));
    }, hold);
    return () => window.clearTimeout(timer);
  }, [state.exiting]);

  return state;
}
