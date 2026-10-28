import type { RouteId } from "../routes.ts";

export type Fact = { label: string; value: string };

export type Entry = { title: string; body: string };

export type DiagramNode = { title: string; note: string; tag: string };

export type DiagramDomain = { name: string; gloss?: string };

export type Layer = { name: string; note: string };

export type Decision = {
  title: string;
  requirement: string;
  implementation: string;
  tradeOff: string;
};

export type WorkCardCopy = {
  title: string;
  kind: string;
  stack: string;
  role?: string;
  note: string;
};

export type RecordSection = {
  heading: string;
  body: string;
};

export type SkillGroup = {
  label: string;
  items: string;
};

export type PageCopy = {
  documentTitle: string;
  name: string;
  title: string;
  dossier: {
    label: string;
    fileId: string;
    spineLabel: string;
    navLabel: string;
    pagerLabel: string;
    pageRef: string;
    previous: string;
    next: string;
    endOfFile: string;
  };
  segments: Record<RouteId, { label: string; short: string; summary: string }>;
  cover: {
    statement: string;
    indexLabel: string;
    windowCaption: string;
    openFile: string;
    portraitLabel: string;
    accessMark: string;
    personnelDossier: string;
    fileReference: string;
    classification: string;
    skipIntro: string;
    replayOpening: string;
  };
  folio: {
    caseTitle: string;
    facts: Fact[];
    contextHeading: string;
    context: string;
    contributionHeading: string;
    contribution: string;
    scope: string;
    footprintHeading: string;
    footprint: Fact[];
    domainsHeading: string;
    roleViews: DiagramDomain;
    challengesHeading: string;
    challenges: Entry[];
    decisionsHeading: string;
    decisions: Entry[];
    confidentialityHeading: string;
    confidentiality: string;
  };
  figure: {
    tag: string;
    number: string;
    caption: string;
    passengerApp: DiagramNode;
    dashboard: DiagramNode;
    domains: DiagramDomain[];
    layers: string[];
    fieldOps: DiagramNode;
    edgeIn: string;
  };
  notes: {
    title: string;
    lead: string;
    sections: {
      featureArchitecture: string;
      serverState: string;
      dataHeavyAdmin: string;
      forms: string;
      reusableUi: string;
      roleAware: string;
      quality: string;
    };
    formsNote: Entry;
    quality: Entry;
    principlesHeading: string;
    principles: Entry[];
    layerFigure: { tag: string; number: string; caption: string };
    layers: Layer[];
    decisionsHeading: string;
    decisionColumns: Omit<Decision, "title">;
    decisions: Decision[];
    statesFigure: { tag: string; number: string; caption: string };
    states: Entry[];
  };
  work: {
    exhibit: string;
    open: string;
    transjakarta: WorkCardCopy;
    mern: WorkCardCopy;
    tycoon: {
      title: string;
      description: string;
      stamp: string;
    };
  };
  mern: {
    title: string;
    kindLabel: string;
    kind: string;
    stackLabel: string;
    stack: string;
    statusLabel: string;
    status: string;
    sections: RecordSection[];
  };
  tycoon: {
    title: string;
    description: string;
    stamp: string;
    sections: RecordSection[];
  };
  experience: {
    title: string;
    org: string;
    role: string;
    dates: string;
  };
  education: {
    title: string;
    items: Entry[];
  };
  skills: {
    title: string;
    groups: SkillGroup[];
  };
  missing: {
    title: string;
    body: string;
    home: string;
  };
  contact: {
    heading: string;
    closing: string;
    summaryLabel: string;
    summary: Fact[];
    emailLabel: string;
    linkedInLabel: string;
    pocketLabel: string;
  };
};
