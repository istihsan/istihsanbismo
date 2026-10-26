import type { PageCopy } from "./types.ts";

export const idWork: Pick<PageCopy, "work" | "mern" | "tycoon"> = {
  work: {
    exhibit: "Lampiran",
    transjakarta: {
      title: "Dashboard Aplikasi\u00A0Transjakarta",
      kind: "Dashboard operasional enterprise",
      stack: "React, TypeScript, TanStack Query, React Table",
      role: "Frontend Engineer",
      note: "Internal / disanitasi",
    },
    mern: {
      title: "Situs MERN yang diarsipkan",
      kind: "Full-stack",
      stack: "MongoDB, Express, React, Node",
      note: "Diarsipkan",
    },
    tycoon: {
      title: "Game Tycoon Berbasis Web",
      description:
        "Game tycoon berbasis web yang berfokus pada membangun dan mengelola bisnis transportasi.",
      stamp: "Segera hadir",
    },
  },
  mern: {
    title: "Situs MERN yang diarsipkan",
    kindLabel: "Jenis",
    kind: "Full-stack",
    stackLabel: "Stack",
    stack: "MongoDB, Express, React, Node",
    statusLabel: "Status",
    status: "Diarsipkan",
  },
  tycoon: {
    title: "Game Tycoon Berbasis Web",
    description:
      "Game tycoon berbasis web yang berfokus pada membangun dan mengelola bisnis transportasi.",
    stamp: "Segera hadir",
  },
};
