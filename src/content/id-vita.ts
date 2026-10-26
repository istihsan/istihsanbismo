import type { PageCopy } from "./types.ts";

export const idVita: Pick<PageCopy, "experience" | "education" | "skills" | "missing"> = {
  experience: {
    title: "Pengalaman",
    org: "PT Transportasi Jakarta",
    role: "Frontend Engineer",
    dates: "Mei 2025–sekarang",
  },
  education: {
    title: "Pendidikan",
    items: [
      {
        title: "Universitas Brawijaya",
        body: "S.Kom",
      },
      {
        title: "Binar Academy",
        body: "Bootcamp Front-End",
      },
      {
        title: "Pengabdian masyarakat Randuagung",
        body: "Retribusi pembayaran daring",
      },
    ],
  },
  skills: {
    title: "Indeks teknis",
    groups: [
      { label: "Bahasa", items: "TypeScript" },
      { label: "Frontend", items: "React, TanStack Query" },
      { label: "Backend / DB", items: "MongoDB, Express, Node" },
      {
        label: "Arsitektur",
        items: "Struktur domain / area fitur, admin berbasis peran, tabel sebagai ruang kerja",
      },
    ],
  },
  missing: {
    title: "Lembar hilang",
    body: "Lembar ini tidak ada di berkas.",
    home: "Kembali ke sampul",
  },
};
