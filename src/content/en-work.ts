import type { PageCopy } from "./types.ts";

export const enWork: Pick<PageCopy, "work" | "mern" | "tycoon"> = {
  work: {
    exhibit: "Exhibit",
    open: "Open exhibit",
    transjakarta: {
      title: "Transjakarta App Dashboard",
      kind: "Enterprise operations dashboard",
      stack: "React, TypeScript, TanStack Query, React Table",
      role: "Frontend Engineer",
      note: "Internal / sanitized",
    },
    mern: {
      title: "Online Printing Service & Dashboard",
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
    title: "Online Printing Service & Dashboard",
    kindLabel: "Kind",
    kind: "Full-stack",
    stackLabel: "Stack",
    stack: "MongoDB, Express, React, Node",
    statusLabel: "Status",
    status: "Archived",
    sections: [
      {
        heading: "Overview",
        body: "This sheet records an archived full-stack site, titled here as an online printing service and dashboard. This repository contains the dossier entry only, not the application source, so the record stops at what was already on file: full-stack work, the stack below, and an archived status.",
      },
      {
        heading: "Product workflows",
        body: "No product workflow is on file, and this repository has no application source to recover one from. This sheet does not describe how the service was used.",
      },
      {
        heading: "Technology",
        body: "The stack on file is MongoDB, Express, React, and Node. That line is prior site copy. It is not confirmed by application source in this repository.",
      },
      {
        heading: "Architecture",
        body: "This repository has no architecture for the service: no modules, boundaries, or diagram. None is added here.",
      },
      {
        heading: "Engineering decisions",
        body: "No engineering decision for the service is recorded in this repository. The status stays archived. This sheet is not a live case study, and it reports no results.",
      },
    ],
  },
  tycoon: {
    title: "Web-Based Tycoon Game",
    description:
      "A web-based tycoon game focused on building and managing a transport business.",
    stamp: "Coming soon",
    sections: [
      {
        heading: "Overview",
        body: "Implemented in this repository: the dossier route, the coming-soon seal, and the short description above, a web-based tycoon game about building and managing a transport business. Planned: the game. It is not in this repository.",
      },
      {
        heading: "Product workflows",
        body: "Implemented: no play loop and no management flow. The seal stands in for the product. Planned workflows are not specified in this file, and none are invented here.",
      },
      {
        heading: "Technology",
        body: "Implemented: no game client, server, or data store. No technology stack is on file, and this repository does not choose one.",
      },
      {
        heading: "Architecture",
        body: "Implemented: the sealed coming-soon graphic on this sheet. Planned architecture for the game is not in this repository, so none is drawn.",
      },
      {
        heading: "Engineering decisions",
        body: "Implemented: keep the sheet sealed and marked coming soon. Further decisions are not recorded, because the game has not been built in this repository.",
      },
    ],
  },
};
