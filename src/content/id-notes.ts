import type { PageCopy } from "./types.ts";

export const idNotes: PageCopy["notes"] = {
  title: "Cara saya menyusun frontend yang padat data",
  lead: "Catatan beranotasi tentang cara saya menangani antarmuka admin yang padat data dan berbasis peran. Isinya cara kerja saya secara umum, bukan detail internal produk tertentu.",
  sections: {
    featureArchitecture: "Arsitektur berbasis fitur",
    serverState: "Server state",
    dataHeavyAdmin: "Admin yang padat data",
    forms: "Form dan validasi",
    reusableUi: "UI yang dipakai ulang",
    roleAware: "Antarmuka yang sadar peran",
    quality: "Kualitas dan delivery",
  },
  formsNote: {
    title: "Form berada di ruang kerja yang sama",
    body: "Staf menulis, bukan hanya membaca. Status loading, kosong, dan error pada form saya rancang bersama field-nya, sama seperti pada tabel.",
  },
  quality: {
    title: "Yang bisa saya tanggung",
    body: "Saya merancang status menunggu, kosong, dan gagal sebelum isi barisnya, dan aturan peran saya kumpulkan di satu tempat supaya perubahan cukup satu suntingan. Layar yang tidak bisa dipublikasikan tetap tidak dipublikasikan — berkas ini menjelaskan pekerjaannya lewat tulisan, bukan detail internal.",
  },
  principlesHeading: "Prinsip kerja",
  principles: [
    {
      title: "Struktur mengikuti domain",
      body: "Saya menyusun frontend berdasarkan domain bisnis, bukan jenis file, sehingga layar, tipe, dan akses data tiap area tetap berkumpul. Perubahan di satu area tetap di area itu.",
    },
    {
      title: "Server state bukan UI state",
      body: "Data dari server punya lapisannya sendiri lewat TanStack Query: caching, refetch, serta status loading dan error. Komponen cukup menyatakan data yang dibutuhkan, tanpa mengurus request.",
    },
    {
      title: "Tabel adalah ruang kerja",
      body: "Di antarmuka admin yang padat data, tabel adalah tempat staf bekerja. Status loading, kosong, dan error-nya saya rancang sama seriusnya dengan isi barisnya.",
    },
    {
      title: "Peran membentuk antarmuka",
      body: "Antarmuka role-based menentukan apa yang bisa dilihat dan dikerjakan setiap orang. Aturan itu saya kumpulkan di satu tempat, bukan tersebar di banyak layar, supaya alur kerja operasional tetap bisa diprediksi untuk setiap peran.",
    },
  ],
  layerFigure: {
    tag: "Ilustratif — cara saya menyusun frontend",
    number: "Gbr. 2",
    caption:
      "Diagram ilustratif lapisan frontend yang padat data: cara saya menyusun pekerjaan secara umum, bukan arsitektur produk tertentu.",
  },
  layers: [
    {
      name: "Area fitur",
      note: "Satu untuk tiap area bisnis. Route, layar, tipe, dan akses datanya berkumpul di sana.",
    },
    {
      name: "Komposisi berbasis peran",
      note: "Aturan peran dibaca di satu tempat, lalu tampilan disusun darinya, bukan dicek di tiap layar.",
    },
    {
      name: "Tabel dan form",
      note: "Tempat staf bekerja. Masing-masing punya status loading, kosong, dan error yang dirancang.",
    },
    {
      name: "Server state · TanStack Query",
      note: "Caching, refetch, dan status request. Komponen cukup menyatakan data yang dibutuhkan.",
    },
    {
      name: "API",
      note: "Batas ke backend. Frontend memakainya; API bukan bagian dari lingkup frontend saya.",
    },
  ],
  decisionsHeading: "Keputusan beranotasi",
  decisionColumns: {
    requirement: "Kebutuhan",
    implementation: "Implementasi",
    tradeOff: "Kompromi",
  },
  decisions: [
    {
      title: "Di mana data server disimpan",
      requirement:
        "Banyak layar membaca dan mengubah data server yang sama, dan data itu harus tetap terbaru.",
      implementation:
        "Data server lewat TanStack Query, diberi key per resource dan di-invalidate setelah ada perubahan. State lokal hanya untuk urusan UI: panel yang terbuka, draf, pilihan.",
      tradeOff:
        "Query key dan invalidation butuh disiplin. Gantinya, tidak ada layar yang menyimpan salinan basi atau flag loading sendiri.",
    },
    {
      title: "Di mana aturan peran disimpan",
      requirement:
        "Satu layar dipakai orang dengan peran berbeda, yang boleh melihat dan melakukan hal berbeda.",
      implementation:
        "Aturan peran ada di satu tempat, lalu tampilan dan aksi disusun darinya, bukan dicek di dalam tiap layar.",
      tradeOff:
        "Aturan itu harus dirancang sebelum layarnya. Setelahnya, perubahan peran cukup satu suntingan, bukan pencarian di setiap layar.",
    },
    {
      title: "Perilaku tabel sebelum ada baris",
      requirement:
        "Staf bekerja di dalam tabel, termasuk saat data sedang dimuat, kosong, atau gagal.",
      implementation:
        "Status loading, kosong, dan error dibangun di tiap tabel sejak awal, dengan pola status yang sama.",
      tradeOff:
        "Lebih banyak status yang dirancang dan dicek per tabel. Gantinya, tabel yang menunggu atau gagal tetap memberi tahu staf apa yang terjadi.",
    },
    {
      title: "Seberapa banyak kode yang dibagi",
      requirement:
        "Area di produk admin berubah dengan kecepatan berbeda, untuk orang yang berbeda.",
      implementation:
        "Tiap area menyimpan layar, tipe, dan akses datanya sendiri; hanya UI yang benar-benar umum yang dibagi.",
      tradeOff:
        "Ada kode yang mirip di dua tempat. Itu lebih murah daripada abstraksi bersama yang terlalu cepat mengikat area.",
    },
  ],
  statesFigure: {
    tag: "Ilustratif — wireframe abstrak",
    number: "Gbr. 3",
    caption:
      "Wireframe ilustratif: tiga status tabel yang saya rancang sebelum isi barisnya.",
  },
  states: [
    { title: "Memuat", body: "Bentuk baris tetap terjaga selama data datang." },
    { title: "Kosong", body: "Menjelaskan kenapa kosong dan langkah berikutnya." },
    { title: "Error", body: "Menjelaskan apa yang gagal dan menawarkan coba lagi." },
  ],
};
