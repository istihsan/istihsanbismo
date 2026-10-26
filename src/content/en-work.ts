import type { PageCopy } from "./types.ts";

export const enWork: Pick<PageCopy, "work" | "mern" | "tycoon"> = {
  work: {
    exhibit: "Exhibit",
    transjakarta: {
      title: "Transjakarta App Dashboard",
      kind: "Enterprise operations dashboard",
      stack: "React, TypeScript, TanStack Query, React Table",
      role: "Frontend Engineer",
      note: "Internal / sanitized",
    },
    mern: {
      title: "Archived MERN website",
      kind: "Full-stack",
      stack: "MongoDB, Express, React, Node",
      note: "Archived",
    },
    tycoon: {
      title: "Web-Based Tycoon Game",
      description:
        "A web-based tycoon game focused on building and managing a transport business.",
      stamp: "Coming soon",
    },
  },
  mern: {
    title: "Archived MERN website",
    kindLabel: "Kind",
    kind: "Full-stack",
    stackLabel: "Stack",
    stack: "MongoDB, Express, React, Node",
    statusLabel: "Status",
    status: "Archived",
  },
  tycoon: {
    title: "Web-Based Tycoon Game",
    description:
      "A web-based tycoon game focused on building and managing a transport business.",
    stamp: "Coming soon",
  },
};
