/**
 * Route identity lives only in the URL. parseLocation is the single reader.
 * The four-scroll-beat hash model is retired; leftover hashes redirect once.
 */
import {
  type Language,
  readStoredLanguage,
} from "./language.ts";

export type RouteId =
  | "cover"
  | "work"
  | "transjakarta"
  | "mern-website"
  | "tycoon-game"
  | "engineering"
  | "experience"
  | "education"
  | "skills"
  | "contact"
  | "missing";

export const MAIN_ORDER = [
  "cover",
  "work",
  "engineering",
  "experience",
  "education",
  "skills",
  "contact",
] as const satisfies readonly RouteId[];

export const SPINE_ORDER = [
  "cover",
  "work",
  "engineering",
  "experience",
  "education",
  "skills",
  "contact",
] as const satisfies readonly RouteId[];

export const PAGER_ORDER = [
  "cover",
  "work",
  "transjakarta",
  "mern-website",
  "tycoon-game",
  "engineering",
  "experience",
  "education",
  "skills",
  "contact",
] as const satisfies readonly RouteId[];

export const WORK_ORDER = [
  "work",
  "transjakarta",
  "mern-website",
  "tycoon-game",
] as const satisfies readonly RouteId[];

export type MainRouteId = (typeof MAIN_ORDER)[number];
export type SpineRouteId = (typeof SPINE_ORDER)[number];
export type PagerRouteId = (typeof PAGER_ORDER)[number];
export type WorkRouteId = (typeof WORK_ORDER)[number];

const ROUTE_PATH: Record<Exclude<RouteId, "missing">, string> = {
  cover: "",
  work: "/work",
  transjakarta: "/work/transjakarta",
  "mern-website": "/work/mern-website",
  "tycoon-game": "/work/tycoon-game",
  engineering: "/engineering",
  experience: "/experience",
  education: "/education",
  skills: "/skills",
  contact: "/contact",
};

const PATH_TO_ROUTE: Record<string, Exclude<RouteId, "missing">> = Object.fromEntries(
  Object.entries(ROUTE_PATH).map(([id, path]) => [path.replace(/^\//, ""), id]),
) as Record<string, Exclude<RouteId, "missing">>;

const LEGACY_HASH: Record<string, Exclude<RouteId, "missing">> = {
  cover: "cover",
  folio: "transjakarta",
  notes: "engineering",
  contact: "contact",
};

const WORK_DETAIL = new Set<RouteId>(["transjakarta", "mern-website", "tycoon-game"]);

export type ParsedLocation = {
  language: Language;
  routeId: RouteId;
  redirectTo?: string;
};

export function isLanguage(value: string): value is Language {
  return value === "en" || value === "id";
}

export function stripTrailingSlash(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

export function pathFor(language: Language, routeId: Exclude<RouteId, "missing">): string {
  return `/${language}${ROUTE_PATH[routeId]}`;
}

export function swapLanguage(pathname: string, next: Language): string {
  const trimmed = stripTrailingSlash(pathname);
  const parts = trimmed.split("/").filter(Boolean);
  if (parts.length === 0) return `/${next}`;
  parts[0] = next;
  return `/${parts.join("/")}`;
}

export function sheetHeadingId(routeId: RouteId): string {
  return `${routeId}-title`;
}

export function isWorkDetail(routeId: RouteId): boolean {
  return WORK_DETAIL.has(routeId);
}

export function isWorkBranch(routeId: RouteId): routeId is WorkRouteId {
  return (WORK_ORDER as readonly RouteId[]).includes(routeId);
}

export function headerRouteId(routeId: RouteId): RouteId {
  return isWorkDetail(routeId) ? "work" : routeId;
}

export function sheetNumber(routeId: RouteId): string | null {
  if (routeId === "missing") return null;
  const main = headerRouteId(routeId);
  const index = MAIN_ORDER.indexOf(main as MainRouteId);
  if (index < 0) return null;
  return String(index + 1).padStart(2, "0");
}

export function sheetTotal(): string {
  return String(MAIN_ORDER.length).padStart(2, "0");
}

export function spineCurrent(routeId: RouteId): SpineRouteId | null {
  if (isWorkDetail(routeId) || routeId === "work") return "work";
  if ((SPINE_ORDER as readonly RouteId[]).includes(routeId)) {
    return routeId as SpineRouteId;
  }
  return null;
}

function mainNavIndex(routeId: RouteId): number {
  if (routeId === "missing") return -1;
  const main = headerRouteId(routeId);
  return MAIN_ORDER.indexOf(main as MainRouteId);
}

export function turnDirection(from: RouteId, to: RouteId): 1 | -1 {
  if (isWorkBranch(from) && isWorkBranch(to)) {
    return WORK_ORDER.indexOf(to) > WORK_ORDER.indexOf(from) ? 1 : -1;
  }
  const a = mainNavIndex(from);
  const b = mainNavIndex(to);
  if (a < 0 || b < 0) return 1;
  return b >= a ? 1 : -1;
}

export function pagerNeighbors(routeId: RouteId): {
  previous: PagerRouteId | null;
  next: PagerRouteId | null;
} {
  const position = (PAGER_ORDER as readonly RouteId[]).indexOf(routeId);
  if (position < 0) {
    return { previous: null, next: null };
  }
  return {
    previous: PAGER_ORDER[position - 1] ?? null,
    next: PAGER_ORDER[position + 1] ?? null,
  };
}

function preferredLanguage(): Language {
  return readStoredLanguage() ?? "en";
}

function knownDestination(path: string): Exclude<RouteId, "missing"> | null {
  if (path in PATH_TO_ROUTE) {
    return PATH_TO_ROUTE[path];
  }
  if (path in LEGACY_HASH) {
    return LEGACY_HASH[path];
  }
  if (path === "") return "cover";
  return null;
}

export function parseLocation(pathname: string, hash: string): ParsedLocation {
  const preferred = preferredLanguage();
  const trimmed = stripTrailingSlash(pathname);
  const parts = trimmed.split("/").filter(Boolean);
  const hashId = hash.replace(/^#/, "");

  if (parts.length === 0) {
    if (hashId in LEGACY_HASH) {
      const target = LEGACY_HASH[hashId];
      return {
        language: preferred,
        routeId: target,
        redirectTo: pathFor(preferred, target),
      };
    }
    return {
      language: preferred,
      routeId: "cover",
      redirectTo: `/${preferred}`,
    };
  }

  const first = parts[0];
  const remainder = parts.slice(1).join("/");

  if (!isLanguage(first)) {
    const dest = knownDestination(parts.join("/"));
    if (dest) {
      return {
        language: preferred,
        routeId: dest,
        redirectTo: pathFor(preferred, dest),
      };
    }
    return {
      language: preferred,
      routeId: "cover",
      redirectTo: `/${preferred}`,
    };
  }

  const language = first;
  const known = knownDestination(remainder);
  const routeId: RouteId = known ?? "missing";
  const canonical = routeId === "missing" ? trimmed : pathFor(language, routeId);
  const needsTrim = pathname !== trimmed && pathname !== "/";

  if (hashId) {
    if (remainder === "" && hashId in LEGACY_HASH) {
      const target = LEGACY_HASH[hashId];
      const to = pathFor(language, target);
      if (to !== trimmed || hash !== "") {
        return { language, routeId: target, redirectTo: to };
      }
    }
    return { language, routeId, redirectTo: canonical };
  }

  if (needsTrim || (routeId !== "missing" && canonical !== trimmed)) {
    return { language, routeId, redirectTo: canonical };
  }

  return { language, routeId };
}
