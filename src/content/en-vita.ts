import type { PageCopy } from "./types.ts";

export const enVita: Pick<PageCopy, "experience" | "education" | "skills" | "missing"> = {
  experience: {
    title: "Assignment record",
    org: "PT Transportasi Jakarta",
    role: "Frontend Engineer",
    dates: "May 2025–present",
  },
  education: {
    title: "Academic record",
    items: [
      {
        title: "Brawijaya University",
        body: "S.Kom",
      },
      {
        title: "Binar Academy",
        body: "Front-End bootcamp",
      },
      {
        title: "Randuagung community service",
        body: "Online payment retribution",
      },
    ],
  },
  skills: {
    title: "Capability index",
    groups: [
      { label: "Languages", items: "TypeScript" },
      { label: "Frontend", items: "React, TanStack Query" },
      { label: "Backend / DB", items: "MongoDB, Express, Node" },
      {
        label: "Architecture",
        items: "Domain / feature-area structure, role-based admin, tables as workspace",
      },
    ],
  },
  missing: {
    title: "Missing sheet",
    body: "This sheet is not in the file.",
    home: "Return to the cover",
  },
};
