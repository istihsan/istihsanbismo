import { idNotes } from "./id-notes.ts";
import { idVita } from "./id-vita.ts";
import { idWork } from "./id-work.ts";
import type { PageCopy } from "./types.ts";

export const id: PageCopy = {
  documentTitle: "Istihsan Bismoputro — Frontend Engineer",
  name: "Istihsan Bismoputro",
  title: "Frontend Engineer",
  dossier: {
    label: "Berkas profesional",
    spineLabel: "Berkas",
    navLabel: "Lembar berkas",
    pagerLabel: "Navigasi lembar",
    pageRef: "hlm.\u00A0",
    previous: "Sebelumnya",
    next: "Berikutnya",
    endOfFile: "Akhir berkas",
  },
  segments: {
    cover: { label: "Sampul", short: "Sampul", summary: "Nama, peran, isi" },
    work: {
      label: "Karya pilihan",
      short: "Karya",
      summary: "Dashboard Aplikasi\u00A0Transjakarta",
    },
    transjakarta: {
      label: "Dashboard Aplikasi\u00A0Transjakarta",
      short: "Transjakarta",
      summary: "Dashboard operasional enterprise",
    },
    "mern-website": {
      label: "Situs MERN yang diarsipkan",
      short: "MERN",
      summary: "Full-stack, diarsipkan",
    },
    "tycoon-game": {
      label: "Game Tycoon Berbasis Web",
      short: "Tycoon",
      summary: "Segera hadir",
    },
    engineering: {
      label: "Catatan engineering",
      short: "Engineering",
      summary: "Cara saya menyusun frontend yang padat data",
    },
    experience: {
      label: "Pengalaman",
      short: "Pengalaman",
      summary: "PT Transportasi Jakarta",
    },
    education: {
      label: "Pendidikan",
      short: "Pendidikan",
      summary: "Universitas Brawijaya, S.Kom",
    },
    skills: {
      label: "Indeks teknis",
      short: "Keahlian",
      summary: "TypeScript, React, TanStack Query",
    },
    contact: {
      label: "Kantong penutup",
      short: "Kontak",
      summary: "Email dan LinkedIn",
    },
    missing: {
      label: "Lembar hilang",
      short: "Hilang",
      summary: "Lembar ini tidak ada di berkas",
    },
  },
  cover: {
    statement:
      "Saya membangun frontend untuk antarmuka operasional yang padat data: React dan TypeScript yang modular, tampilan role-based, dan tabel yang bisa langsung ditindaklanjuti staf.",
    indexLabel: "Isi berkas",
    windowCaption:
      "Unggulan: Dashboard Aplikasi\u00A0Transjakarta. Sketsa ilustratif tentang posisinya, bukan tampilan asli.",
  },
  folio: {
    caseTitle: "Dashboard Aplikasi\u00A0Transjakarta",
    facts: [
      { label: "Produk", value: "Dashboard staf" },
      { label: "Peran saya", value: "Satu-satunya developer frontend" },
      { label: "Stack", value: "React, TypeScript, TanStack Query" },
    ],
    contextHeading: "Konteks",
    context:
      "Dashboard ini mengubah aktivitas penumpang menjadi pekerjaan yang bisa ditindaklanjuti staf. Posisinya di antara aplikasi penumpang dan operasional lapangan, bukan pengganti keduanya. Laporan adalah salah satu bagiannya, di samping tiket, engagement, dan loyalitas.",
    contributionHeading: "Kontribusi saya",
    contribution:
      "Saya satu-satunya developer yang bertanggung jawab atas frontend Dashboard Aplikasi\u00A0Transjakarta.",
    scope:
      "Saya membangun antarmuka untuk staf di seluruh domainnya, dari tabel data sampai layar alur kerja yang dibangun di atasnya. Lingkup saya adalah frontend; produk secara keseluruhan, backend, dan desainnya tidak saya klaim di sini.",
    domainsHeading: "Domain terpilih",
    roleViews: {
      name: "Tampilan role-based",
      gloss: "urusan frontend di keempat domain",
    },
    challengesHeading: "Kompleksitas dan batasan engineering",
    challenges: [
      {
        title: "Banyak domain, satu dashboard",
        body: "Laporan, tiket, engagement, dan loyalitas punya data dan alur kerjanya sendiri, tetapi staf memakainya sebagai satu antarmuka.",
      },
      {
        title: "Peran berbeda, tampilan berbeda",
        body: "Apa yang bisa dilihat dan dikerjakan staf bergantung pada perannya, jadi layar yang sama harus tetap masuk akal untuk masing-masing.",
      },
      {
        title: "Data asinkron di seluruh alur",
        body: "Tabel dan alur kerja bergantung pada data dari server, jadi status loading, error, dan refetch adalah bagian dari antarmuka, bukan tambahan belakangan.",
      },
    ],
    decisionsHeading: "Keputusan teknis",
    decisions: [
      {
        title: "Frontend yang modular",
        body: "Saya menjaga frontend tetap modular dengan React dan TypeScript, supaya satu bagian bisa diubah tanpa mengganggu bagian lain.",
      },
      {
        title: "Tampilan role-based",
        body: "Tampilan mengikuti peran staf, sehingga setiap orang mendapat layar dan aksi yang memang sesuai dengan pekerjaannya.",
      },
      {
        title: "TanStack Query untuk server state",
        body: "TanStack Query menangani caching, status loading, dan error untuk data dari server, jadi tabel dan form tidak perlu mengurusnya masing-masing.",
      },
    ],
    confidentialityHeading: "Kerahasiaan",
    confidentiality:
      "Tampilan produksi dan detail internal tidak bisa dipublikasikan tanpa izin, jadi berkas ini menjelaskan pekerjaannya lewat tulisan dan diagram ilustratif.",
  },
  figure: {
    tag: "Ilustratif — bukan tampilan asli",
    number: "Gbr. 1",
    caption:
      "Diagram ilustratif, bukan tampilan asli dashboard. Diagram ini menunjukkan posisi dashboard staf: di antara aplikasi penumpang dan operasional lapangan.",
    passengerApp: {
      title: "Aplikasi penumpang",
      note: "Untuk penumpang",
      tag: "Berdampingan, tidak digantikan",
    },
    dashboard: {
      title: "Dashboard staf",
      note: "Mengubah aktivitas penumpang menjadi pekerjaan yang bisa ditindaklanjuti staf.",
      tag: "Frontend yang saya bangun",
    },
    domains: [
      { name: "Laporan" },
      { name: "Tiket" },
      { name: "Engagement" },
      { name: "Loyalitas" },
    ],
    layers: ["React + TypeScript", "TanStack Query", "Tampilan role-based"],
    fieldOps: {
      title: "Operasional lapangan",
      note: "Di lapangan",
      tag: "Berdampingan, tidak digantikan",
    },
    edgeIn: "Aktivitas penumpang",
  },
  notes: idNotes,
  ...idWork,
  ...idVita,
  contact: {
    heading: "Hubungi saya",
    closing:
      "Pertanyaan tentang berkas ini atau pekerjaan di baliknya bisa dikirim lewat email atau LinkedIn.",
    summaryLabel: "Ringkasan berkas",
    summary: [
      { label: "Peran", value: "Frontend Engineer" },
      { label: "Fokus", value: "Antarmuka admin yang padat data" },
      { label: "Stack", value: "React, TypeScript, TanStack Query" },
      {
        label: "Karya utama",
        value: "Dashboard Aplikasi\u00A0Transjakarta, satu-satunya developer frontend",
      },
    ],
    emailLabel: "Email",
    linkedInLabel: "LinkedIn",
    pocketLabel: "Kontak",
  },
};
