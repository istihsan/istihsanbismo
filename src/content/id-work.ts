import type { PageCopy } from "./types.ts";

export const idWork: Pick<PageCopy, "work" | "mern" | "tycoon"> = {
  work: {
    exhibit: "Lampiran",
    open: "Buka lampiran",
    transjakarta: {
      title: "Dashboard Aplikasi\u00A0Transjakarta",
      kind: "Dashboard operasional enterprise",
      stack: "React, TypeScript, TanStack Query, React Table",
      role: "Frontend Engineer",
      note: "Internal / disanitasi",
    },
    mern: {
      title: "Layanan Cetak Online & Dasbor",
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
    title: "Layanan Cetak Online & Dasbor",
    kindLabel: "Jenis",
    kind: "Full-stack",
    stackLabel: "Stack",
    stack: "MongoDB, Express, React, Node",
    statusLabel: "Status",
    status: "Diarsipkan",
    sections: [
      {
        heading: "Ikhtisar",
        body: "Lembar ini mencatat situs full-stack yang diarsipkan, dengan judul layanan cetak online dan dasbor. Repositori ini hanya menyimpan entri berkas, bukan kode aplikasinya, jadi catatan berhenti pada apa yang sudah ada: pekerjaan full-stack, stack di bawah, dan status diarsipkan.",
      },
      {
        heading: "Alur produk",
        body: "Tidak ada alur produk yang tercatat, dan repositori ini tidak memuat kode aplikasi yang bisa dipakai untuk menyusunnya kembali. Lembar ini tidak menjelaskan cara layanan itu dipakai.",
      },
      {
        heading: "Teknologi",
        body: "Stack yang tercatat adalah MongoDB, Express, React, dan Node. Rangkaian itu berasal dari salinan situs sebelumnya, bukan dari kode aplikasi di repositori ini.",
      },
      {
        heading: "Arsitektur",
        body: "Repositori ini tidak memuat arsitektur layanan tersebut: tidak ada modul, batas sistem, atau diagram. Tidak ada yang ditambahkan di sini.",
      },
      {
        heading: "Keputusan teknis",
        body: "Tidak ada keputusan teknis untuk layanan ini yang tercatat di repositori ini. Statusnya tetap diarsipkan. Lembar ini bukan studi kasus yang masih berjalan, dan tidak melaporkan hasil.",
      },
    ],
  },
  tycoon: {
    title: "Game Tycoon Berbasis Web",
    description:
      "Game tycoon berbasis web yang berfokus pada membangun dan mengelola bisnis transportasi.",
    stamp: "Segera hadir",
    sections: [
      {
        heading: "Ikhtisar",
        body: "Yang ada di repositori ini: rute berkas, segel segera hadir, dan deskripsi singkat di atas, yaitu game tycoon berbasis web tentang membangun dan mengelola bisnis transportasi. Yang direncanakan: gamenya. Game itu tidak ada di repositori ini.",
      },
      {
        heading: "Alur produk",
        body: "Yang sudah dibuat: tidak ada putaran permainan dan tidak ada alur pengelolaan. Segel itu menggantikan produk. Alur yang direncanakan tidak dicatat di berkas ini, dan tidak ada yang dikarang.",
      },
      {
        heading: "Teknologi",
        body: "Yang sudah dibuat: tidak ada klien game, server, atau penyimpanan data. Tidak ada stack yang tercatat, dan repositori ini tidak memilihnya.",
      },
      {
        heading: "Arsitektur",
        body: "Yang sudah dibuat: grafik tersegel segera hadir pada lembar ini. Arsitektur game yang direncanakan tidak ada di repositori ini, jadi tidak ada yang digambar.",
      },
      {
        heading: "Keputusan teknis",
        body: "Yang sudah dibuat: lembar ini tetap tersegel dan bertanda segera hadir. Keputusan lain tidak dicatat, karena game ini belum dibangun di repositori ini.",
      },
    ],
  },
};
