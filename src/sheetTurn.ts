/** Matches `--duration-sheet`. Instant under reduced motion. */
export const SHEET_TURN_MS = 900;

type Turn = {
  frame: number;
  started: number;
  from: number;
  to: number;
};

let turn: Turn | null = null;
let progress = 0;

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function stackEl(): HTMLElement | null {
  return document.querySelector(".sheet-stack");
}

/** Smoothstep: more time in the curl, then a quiet settle. */
function easeTurn(t: number): number {
  return t * t * (3 - 2 * t);
}

function writeTurn(stack: HTMLElement, value: number, direction: 1 | -1): void {
  progress = value;
  stack.style.setProperty("--sheet-turn", String(value));
  stack.style.setProperty("--sheet-dir", String(direction));
}

function clearTurn(stack: HTMLElement | null): void {
  if (turn) {
    window.cancelAnimationFrame(turn.frame);
    turn = null;
  }
  progress = 0;
  if (!stack) return;
  stack.style.removeProperty("--sheet-turn");
  stack.style.removeProperty("--sheet-dir");
}

function play(stack: HTMLElement, from: number, to: number, direction: 1 | -1): void {
  if (turn) window.cancelAnimationFrame(turn.frame);
  writeTurn(stack, from, direction);

  const next: Turn = {
    frame: 0,
    started: performance.now(),
    from,
    to,
  };

  const step = (now: number) => {
    if (turn !== next) return;
    const t = Math.min(1, (now - next.started) / SHEET_TURN_MS);
    writeTurn(stack, next.from + (next.to - next.from) * easeTurn(t), direction);
    if (t < 1) {
      next.frame = window.requestAnimationFrame(step);
      return;
    }
    turn = null;
  };

  next.frame = window.requestAnimationFrame(step);
  turn = next;
}

/**
 * Drives --sheet-turn on the stack via specified style so descendants inherit.
 * Section identity stays in useSheetTurn. Animation progress is not identity.
 */
export function syncSheetTurn(opts: {
  exiting: string | null;
  direction: 1 | -1;
}): void {
  const stack = stackEl();
  if (!stack || prefersReducedMotion() || !opts.exiting) {
    clearTurn(stack);
    return;
  }

  if (turn) {
    play(stack, progress, 1, opts.direction);
    return;
  }

  play(stack, 0, 1, opts.direction);
}
