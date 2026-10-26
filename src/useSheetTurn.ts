import { useLayoutEffect, useRef, useState } from "react";
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

export function useSheetTurn(routeId: RouteId, freeze = false): SheetTurnState {
  const [state, setState] = useState<SheetTurnState>({
    exiting: null,
    direction: 1,
    turned: false,
  });

  const routeRef = useRef(routeId);
  const exitTimer = useRef(0);

  useLayoutEffect(() => {
    if (freeze) {
      routeRef.current = routeId;
      return;
    }
    if (routeId === routeRef.current) return;

    const previous = routeRef.current;
    routeRef.current = routeId;
    const hold = prefersReducedMotion() ? 0 : SHEET_TURN_MS;

    window.clearTimeout(exitTimer.current);
    setState({
      exiting: previous,
      direction: turnDirection(previous, routeId),
      turned: true,
    });
    exitTimer.current = window.setTimeout(() => {
      setState((now) => ({ ...now, exiting: null }));
    }, hold);
  }, [routeId, freeze]);

  useLayoutEffect(() => {
    return () => window.clearTimeout(exitTimer.current);
  }, []);

  return state;
}
