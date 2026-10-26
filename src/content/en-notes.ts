import type { PageCopy } from "./types.ts";

export const enNotes: PageCopy["notes"] = {
  title: "How I structure data-heavy frontends",
  lead: "Notes on how I approach data-heavy, role-based admin interfaces. They describe my general way of working, not the internals of a specific product.",
  sections: {
    featureArchitecture: "Feature-driven architecture",
    serverState: "Server state",
    dataHeavyAdmin: "Data-heavy admin",
    forms: "Forms and validation",
    reusableUi: "Reusable UI",
    roleAware: "Role-aware interfaces",
    quality: "Quality and delivery",
  },
  formsNote: {
    title: "Forms sit with the tables",
    body: "Staff write as well as read. I design a form's loading, empty, and error states with the fields, the same way I design those states for a table.",
  },
  quality: {
    title: "What I will stand behind",
    body: "I design waiting, empty, and failed states before the rows, and I keep role rules in one place so a change is one edit. Screens I cannot publish stay unpublished — this file describes the work in words, not internals.",
  },
  principlesHeading: "Working principles",
  principles: [
    {
      title: "Structure follows the domain",
      body: "I organize a frontend by business domain, not by file type, so each area keeps its screens, types, and data access together. A change to one area stays in that area.",
    },
    {
      title: "Server state is not UI state",
      body: "Data from the server gets its own layer with TanStack Query: caching, refetching, loading, and error states. Components declare what they need instead of managing requests.",
    },
    {
      title: "The table is the workspace",
      body: "In data-heavy admin interfaces, the table is where staff do the work. I design its loading, empty, and error states as carefully as its rows.",
    },
    {
      title: "Roles shape the interface",
      body: "Role-based interfaces decide what each person sees and can do. I keep those rules in one place rather than scattered across screens, so operational workflows stay predictable for every role.",
    },
  ],
  layerFigure: {
    tag: "Illustrative — how I structure frontends",
    number: "Fig. 2",
    caption:
      "Illustrative layering of a data-heavy frontend: how I structure the work in general, not the architecture of a specific product.",
  },
  layers: [
    {
      name: "Feature area",
      note: "One per business area. Its routes, screens, types, and data access live together.",
    },
    {
      name: "Role-aware composition",
      note: "Role rules are read in one place, and views are composed from them instead of checked screen by screen.",
    },
    {
      name: "Tables and forms",
      note: "Where staff do the work. Each one designs its loading, empty, and error states.",
    },
    {
      name: "Server state · TanStack Query",
      note: "Caching, refetching, and request status. Components declare the data they need.",
    },
    {
      name: "API",
      note: "The backend boundary. The frontend consumes it; it is not part of my frontend scope.",
    },
  ],
  decisionsHeading: "Annotated decisions",
  decisionColumns: {
    requirement: "Requirement",
    implementation: "Implementation",
    tradeOff: "Trade-off",
  },
  decisions: [
    {
      title: "Where server data lives",
      requirement:
        "Many screens read and change the same server data, and it has to stay current.",
      implementation:
        "Server data goes through TanStack Query, keyed by resource and invalidated after a change. Local state is kept for what is purely UI: open panels, drafts, selection.",
      tradeOff:
        "Cache keys and invalidation need discipline. In exchange, no screen keeps its own stale copy or its own loading flags.",
    },
    {
      title: "Where role rules live",
      requirement:
        "The same screen serves people whose roles allow different views and actions.",
      implementation:
        "Role rules sit in one place, and views and actions are composed from them rather than checked inside each screen.",
      tradeOff:
        "The rule set has to be designed before the screens. Afterwards, a role change is one edit instead of a search through every screen.",
    },
    {
      title: "How a table behaves before it has rows",
      requirement:
        "Staff work inside tables, including while data loads, comes back empty, or fails.",
      implementation:
        "Loading, empty, and error states are built into each table from the start, using shared state patterns.",
      tradeOff:
        "More states to design and check per table. In return, a waiting or failed table still tells staff what is happening.",
    },
    {
      title: "How much code areas share",
      requirement:
        "Areas of an admin product change at different speeds, for different people.",
      implementation:
        "Each area keeps its screens, types, and data access together; only genuinely generic UI is shared.",
      tradeOff:
        "Some similar code exists in two places. That costs less than a shared abstraction that couples areas too early.",
    },
  ],
  statesFigure: {
    tag: "Illustrative — abstract wireframes",
    number: "Fig. 3",
    caption:
      "Illustrative wireframes: the three table states I design before the rows themselves.",
  },
  states: [
    { title: "Loading", body: "Rows keep their shape while data arrives." },
    { title: "Empty", body: "Says why nothing is here and what to do next." },
    { title: "Error", body: "Explains what failed and offers a retry." },
  ],
};
