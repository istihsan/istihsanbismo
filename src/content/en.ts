import { enNotes } from "./en-notes.ts";
import { enVita } from "./en-vita.ts";
import { enWork } from "./en-work.ts";
import type { PageCopy } from "./types.ts";

export const en: PageCopy = {
  documentTitle: "Istihsan Bismoputro — Frontend Engineer",
  name: "Istihsan Bismoputro",
  title: "Frontend Engineer",
  dossier: {
    label: "Personnel file",
    fileId: "IB–01",
    spineLabel: "Dossier",
    navLabel: "Dossier sheets",
    pagerLabel: "Sheet navigation",
    pageRef: "p.",
    previous: "Previous",
    next: "Next",
    endOfFile: "End of file",
  },
  segments: {
    cover: { label: "Cover", short: "Cover", summary: "Name, role, contents" },
    work: {
      label: "Case index",
      short: "Work",
      summary: "Transjakarta App Dashboard",
    },
    transjakarta: {
      label: "Transjakarta App Dashboard",
      short: "Transjakarta",
      summary: "Enterprise operations dashboard",
    },
    "mern-website": {
      label: "Online Printing Service & Dashboard",
      short: "Printing",
      summary: "Archived full-stack record",
    },
    "tycoon-game": {
      label: "Web-Based Tycoon Game",
      short: "Tycoon",
      summary: "Coming soon",
    },
    engineering: {
      label: "Annotated notes",
      short: "Engineering",
      summary: "How I structure data-heavy frontends",
    },
    experience: {
      label: "Assignment record",
      short: "Experience",
      summary: "PT Transportasi Jakarta",
    },
    education: {
      label: "Academic record",
      short: "Education",
      summary: "Brawijaya University, S.Kom",
    },
    skills: {
      label: "Capability index",
      short: "Skills",
      summary: "TypeScript, React, TanStack Query",
    },
    contact: {
      label: "Correspondence",
      short: "Contact",
      summary: "Email and LinkedIn",
    },
    missing: {
      label: "Missing sheet",
      short: "Missing",
      summary: "This sheet is not in the file",
    },
  },
  cover: {
    statement:
      "This file documents the frontend of data-heavy operational interfaces: modular React and TypeScript, role-based views, and tables staff can act on.",
    indexLabel: "File index",
    windowCaption:
      "Featured: Transjakarta App Dashboard. An illustrative sketch of where it sits, not the actual interface.",
    openFile: "Open the file",
    portraitLabel: "Portrait",
    accessMark: "Restricted",
    personnelDossier: "PERSONNEL DOSSIER",
    fileReference: "FILE REFERENCE",
    classification: "CLASSIFICATION",
    skipIntro: "Skip intro",
    replayOpening: "Replay opening",
  },
  folio: {
    caseTitle: "Transjakarta App Dashboard",
    facts: [
      { label: "Product", value: "Staff dashboard" },
      { label: "My role", value: "Sole frontend developer" },
      { label: "Stack", value: "React, TypeScript, TanStack Query" },
    ],
    contextHeading: "Assignment briefing",
    context:
      "An operational platform supporting teams behind Jakarta's public transportation services. My assignment was the frontend of the staff dashboard: interfaces that turn operational data into workflows staff can act on. The dashboard sits between the passenger app and field operations and does not replace either one.",
    contributionHeading: "My contribution",
    contribution:
      "I was the sole frontend developer responsible for the Transjakarta App Dashboard.",
    scope:
      "I built the staff-facing interfaces across its domains, from data tables to the workflow screens built on them. My scope was the frontend; the wider product, backend, and design are not claimed here.",
    footprintHeading: "Operational footprint",
    footprint: [
      { label: "Laporan", value: "Reports. One domain of the staff dashboard." },
      { label: "Tickets", value: "One domain of the staff dashboard." },
      { label: "Engagement", value: "One domain of the staff dashboard." },
      { label: "Loyalty", value: "One domain of the staff dashboard." },
      {
        label: "Placement",
        value: "Between the passenger app and field operations. Neither is replaced.",
      },
      {
        label: "Access",
        value: "Role-based views, a frontend concern across all four domains.",
      },
    ],
    domainsHeading: "Selected domains",
    roleViews: {
      name: "Role-based views",
      gloss: "a frontend concern across all four",
    },
    challengesHeading: "Engineering complexity and constraints",
    challenges: [
      {
        title: "Several domains, one dashboard",
        body: "Laporan, tickets, engagement, and loyalty each carry their own data and workflows, yet staff use them as one interface.",
      },
      {
        title: "Different roles, different views",
        body: "What a staff member sees and can do depends on their role, so the same screen has to hold up for each of them.",
      },
      {
        title: "Asynchronous data throughout",
        body: "Tables and workflows depend on server data, so loading, error, and refetch states are part of the interface, not an afterthought.",
      },
    ],
    decisionsHeading: "Technical decisions",
    decisions: [
      {
        title: "A modular frontend",
        body: "I kept the frontend modular in React and TypeScript, so one area can change without unsettling the others.",
      },
      {
        title: "Role-based views",
        body: "Views follow the staff member's role, so each person gets the screens and actions that belong to their work.",
      },
      {
        title: "TanStack Query for server state",
        body: "TanStack Query handles caching, loading, and error states for server data, so tables and forms do not each reinvent them.",
      },
    ],
    confidentialityHeading: "Confidentiality",
    confidentiality:
      "Production screens and internal details cannot be published without permission, so this folio describes the work in words and an illustrative diagram.",
  },
  figure: {
    tag: "Illustrative — not the actual interface",
    number: "Fig. 1",
    caption:
      "Illustrative diagram, not the actual dashboard interface. It shows where the staff dashboard sits: between the passenger app and field operations.",
    passengerApp: {
      title: "Passenger app",
      note: "Passenger-facing",
      tag: "Adjacent, not replaced",
    },
    dashboard: {
      title: "Staff dashboard",
      note: "Turns passenger activity into work staff can act on.",
      tag: "Frontend I built",
    },
    domains: [
      { name: "Laporan", gloss: "reports" },
      { name: "Tickets" },
      { name: "Engagement" },
      { name: "Loyalty" },
    ],
    layers: ["React + TypeScript", "TanStack Query", "Role-based views"],
    fieldOps: {
      title: "Field operations",
      note: "On the ground",
      tag: "Adjacent, not replaced",
    },
    edgeIn: "Passenger activity",
  },
  notes: enNotes,
  ...enWork,
  ...enVita,
  contact: {
    heading: "Correspondence",
    closing:
      "Questions about this file, or the work behind it, are welcome by email or LinkedIn.",
    summaryLabel: "File summary",
    summary: [
      { label: "Role", value: "Frontend Engineer" },
      { label: "Focus", value: "Data-heavy admin interfaces" },
      { label: "Stack", value: "React, TypeScript, TanStack Query" },
      {
        label: "Featured work",
        value: "Transjakarta App Dashboard, sole frontend developer",
      },
    ],
    emailLabel: "Email",
    linkedInLabel: "LinkedIn",
    pocketLabel: "Contact",
  },
};
