import type { CSSProperties } from "react";
import type { RouteId } from "./routes.ts";

/** Deterministic warmth and fiber phase per sheet. Not a shared stain. */
const SHIFT: Record<RouteId, [string, string, string, string, string]> = {
  cover: ["8%", "2%", "94%", "90%", "0px 0px"],
  work: ["92%", "18%", "6%", "86%", "2px 1px"],
  transjakarta: ["16%", "74%", "88%", "8%", "1px 3px"],
  "mern-website": ["74%", "38%", "12%", "94%", "3px 0px"],
  "tycoon-game": ["40%", "8%", "86%", "76%", "0px 2px"],
  engineering: ["10%", "26%", "82%", "66%", "2px 2px"],
  experience: ["80%", "12%", "8%", "70%", "1px 0px"],
  education: ["22%", "88%", "76%", "16%", "0px 1px"],
  skills: ["62%", "6%", "14%", "82%", "3px 2px"],
  contact: ["8%", "48%", "92%", "14%", "1px 2px"],
  missing: ["46%", "20%", "18%", "76%", "2px 0px"],
};

export function paperStyle(routeId: RouteId): CSSProperties {
  const [x, y, x2, y2, fiber] = SHIFT[routeId];
  return {
    "--warm-x": x,
    "--warm-y": y,
    "--warm2-x": x2,
    "--warm2-y": y2,
    "--fiber-shift": fiber,
  } as CSSProperties;
}
