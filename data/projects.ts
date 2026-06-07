export interface FullstackProject {
  slug: string;
  name: string;
  desc: string;
  longDesc: string;
  tags: string[];
  repo: string;
  iconName: string;
  screenshots: string[];
  video?: string;
}

export const fullstackProjects: FullstackProject[] = [
  {
    slug: "sim-mts-hasanuddin",
    name: "SIM Sekolah MTS Hasanuddin",
    desc: "School management information system built with Laravel for academic data management, scheduling, and reporting.",
    longDesc: `<p class="text-secondary mb-4">Sistem Informasi Manajemen (SIM) untuk MTS Hasanuddin — aplikasi berbasis web yang menangani seluruh siklus administrasi sekolah: manajemen data siswa, guru, jadwal pelajaran, nilai, dan laporan akademik.</p>
<p class="text-secondary mb-4">Dibangun dengan <strong>Laravel</strong> dan <strong>MySQL</strong>, sistem ini menggantikan proses manual dengan dashboard terintegrasi. Fitur utama meliputi manajemen profil sekolah (CMS), pendaftaran peserta didik baru (PPDB) online, ekspor data EMIS untuk pelaporan ke Kemenag, serta dashboard monitoring untuk kepala sekolah.</p>
<p class="text-secondary">Project ini dikerjakan sebagai solusi digitalisasi sekolah swasta di Magetan, dengan fokus pada kemudahan penggunaan oleh staf administrasi yang tidak memiliki latar belakang teknis.</p>`,
    tags: ["Laravel", "MySQL", "Management"],
    repo: "https://github.com/jefryKurniawan/sim-mts-hasanuddin",
    iconName: "School",
    screenshots: [
      "/mts/beranda.png",
      "/mts/dashboard.png",
      "/mts/cms-profile.png",
      "/mts/ppdb.png",
      "/mts/ekspor-emis.png",
    ],
  },
  {
    slug: "axia-orto",
    name: "Axia Orto",
    desc: "React TypeScript + Laravel fullstack application with debloated architecture for modern web performance.",
    longDesc: `<p class="text-secondary mb-4">Axia Orto adalah aplikasi fullstack yang menggabungkan <strong>React TypeScript</strong> di frontend dengan <strong>Laravel</strong> di backend. Fokus utama pada arsitektur modern yang <em>debloated</em> — hanya memuat library yang benar-benar diperlukan.</p>
<p class="text-secondary mb-4">Tampilan klinik (Klinik) pada screenshot menunjukkan modul manajemen data klinik/poli yang terintegrasi dalam sistem. Dibangun dengan pendekatan API-first, memisahkan frontend dan backend secara clean untuk maintainability jangka panjang.</p>
<p class="text-secondary">Menggunakan TypeScript untuk type safety di frontend, Laravel Eloquent untuk ORM di backend, dan MySQL sebagai database.</p>`,
    tags: ["React", "TypeScript", "Laravel"],
    repo: "https://github.com/jefryKurniawan/axia-orto",
    iconName: "Globe",
    screenshots: [
      "/klinik/beranda.png",
      "/klinik/dashboard.png",
    ],
  },
  {
    slug: "ksp-erp",
    name: "KSP ERP",
    desc: "Enterprise ERP system built with Laravel + MySQL for cooperative management, financial tracking, and member services.",
    longDesc: `<p class="text-secondary mb-4">KSP ERP adalah sistem Enterprise Resource Planning untuk Koperasi Simpan Pinjam, dibangun dengan <strong>Laravel</strong> dan <strong>MySQL</strong>. Mencakup modul inti seperti manajemen anggota, simpanan, pinjaman, angsuran, dan laporan keuangan.</p>
<p class="text-secondary mb-4">Sistem ini dirancang untuk menggantikan pencatatan manual koperasi dengan dashboard digital yang menampilkan data real-time. Fitur keamanan mencakup autentikasi multi-level (admin, petugas, anggota) dan enkripsi data transaksi.</p>
<p class="text-secondary">Screenshot menampilkan halaman Login dan Dashboard utama dengan metrik keuangan koperasi.</p>`,
    tags: ["Laravel", "ERP", "MySQL"],
    repo: "https://github.com/jefryKurniawan/ksp-erp",
    iconName: "Building2",
    screenshots: [
      "/ksp/Login-KSP-ERP.png",
      "/ksp/Dashboard-KSP-ERP.png",
    ],
  },
  {
    slug: "tandurai",
    name: "TandurAI",
    desc: "AI-powered agricultural app built with React Native (Expo) + FastAPI backend for smart farming assistance.",
    longDesc: `<div>
  <blockquote class="border-l-4 border-brand-primary pl-4 italic text-secondary mb-6">
    Deteksi Penyakit Tanaman Berbasis AI buat Petani Magetan 🚜✨
  </blockquote>

  <div class="flex flex-wrap gap-2 mb-6">
    <img src="https://img.shields.io/badge/React_Native-Expo_SDK_54-blue" alt="React Native" class="h-5" />
    <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6" alt="TypeScript" class="h-5" />
    <img src="https://img.shields.io/badge/Backend-FastAPI_+_Supabase-009688" alt="FastAPI" class="h-5" />
    <img src="https://img.shields.io/badge/QA-Tested_on_Redmi_8_4GB_RAM-brightgreen" alt="QA Tested" class="h-5" />
    <img src="https://img.shields.io/badge/License-MIT-green" alt="License" class="h-5" />
  </div>

  <hr class="border-brand-secondary/30 my-6" />

  <h2 class="text-xl font-bold mb-3">👋 Halo, Rek!</h2>

  <p class="text-secondary mb-4">
    Perkenalkan, ini <strong>TandurAI</strong>, aplikasi mobile yang kita rancang khusus buat bantu petani kecil di Magetan (dan sekitarnya) supaya bisa deteksi penyakit tanaman cuma lewat foto daun. Gak perlu pusing lagi nebak-nebak kenapa daun kok layu, belang, atau kena hama. Tinggal <em>scan</em>, AI langsung analisis, keluar deh rekomendasi perawatan yang pas.
  </p>

  <p class="text-secondary mb-4">
    <em>Alhamdulillah</em>, UI-nya udah kita optimasi biar tetap <em>smooth</em> dan responsif meski dibuka di HP <em>entry-level</em>. Monggo dilihat-lihat strukturnya, nek ada yang mau dikritik, diajak diskusi, atau kolaborasi, <em>silakan</em> gas aja! 🙏✨
  </p>

  <h2 class="text-xl font-bold mb-3">🎯 Apa Itu TandurAI?</h2>

  <p class="text-secondary mb-4">
    TandurAI itu <em>low-key</em> asisten digital buat petani. Fokus utamanya simpel: bikin proses diagnosa tanaman jadi lebih cepet, akurat, dan terjangkau. Kita paham banget kalau akses ke penyuluh pertanian itu gak selalu gampang, makanya kita bawa AI langsung ke genggaman. <em>Vibes</em>-nya? Santuy tapi profesional. Flow-nya intuitif, desainnya clean, dan performa tetap terjaga bahkan di device dengan RAM terbatas.
  </p>

  <h2 class="text-xl font-bold mb-3">✨ Fitur Utama</h2>

  <ul class="space-y-2 text-secondary mb-4 list-disc list-inside">
    <li><strong>Scan Daun Instan</strong> — Buka kamera, arahkan ke daun, AI langsung kerja. Viewfinder-nya udah dikasih <em>guide</em> biar framing pas.</li>
    <li><strong>AI Diagnosis + Rekomendasi</strong> — Pakai Google Gemini 1.5 Flash. Hasil diagnosa, <em>confidence</em> score, plus langkah penanganan praktis.</li>
    <li><strong>Dashboard Tren Lahan</strong> — Pantau kesehatan tanaman lewat grafik interaktif. Switch view weekly/monthly.</li>
    <li><strong>Konsultasi Pakar Agronomi</strong> — Hubungin ahli lewat app. Pembayaran via Midtrans (QRIS, GoPay, Virtual Account).</li>
    <li><strong>Adaptive Light/Dark Mode</strong> — Enak di mata kapan aja. Micro-animations smooth tanpa drop frame.</li>
  </ul>

  <h2 class="text-xl font-bold mb-3">🛠️ Tech Stack</h2>

  <div class="overflow-x-auto mb-4">
    <table class="w-full text-sm text-secondary">
      <thead>
        <tr class="border-b border-brand-secondary/30">
          <th class="text-left py-2 pr-4 font-bold text-white">Layer</th>
          <th class="text-left py-2 font-bold text-white">Tools & Library</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b border-brand-secondary/20">
          <td class="py-2 pr-4 align-top">Frontend</td>
          <td class="py-2">React Native, Expo SDK 54, TypeScript, Expo Router 6, NativeWind</td>
        </tr>
        <tr class="border-b border-brand-secondary/20">
          <td class="py-2 pr-4 align-top">UI/UX</td>
          <td class="py-2">React Native Reanimated 3, Gesture Handler, Material Icons</td>
        </tr>
        <tr class="border-b border-brand-secondary/20">
          <td class="py-2 pr-4 align-top">Backend</td>
          <td class="py-2">FastAPI, Supabase (PostgreSQL + Storage), Google Gemini 1.5 Flash, Midtrans Sandbox</td>
        </tr>
        <tr>
          <td class="py-2 pr-4 align-top">QA & Device</td>
          <td class="py-2">Manual E2E di HP fisik, Performance profiling di Redmi 8 (4GB RAM), Offline fallback UI</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h2 class="text-xl font-bold mb-3">📱 Performa & Device Awareness</h2>

  <p class="text-secondary mb-4">
    Kita <em>aware</em> banget kalau target user kebanyakan pakai HP <em>mid-to-low range</em>. Makanya project ini kita push performanya biar tetap <em>stable</em> di <strong>Redmi 8 (4GB RAM)</strong>. Semua animasi jalan di UI thread (via Reanimated), <em>bundle</em> kita jaga ringan, dan <em>fallback state</em> udah siap kalau koneksi drop atau timeout. <em>Quality first, rek!</em> 🫡
  </p>

  <h2 class="text-xl font-bold mb-3">🚀 Cara Jalanin Project</h2>

  <pre class="bg-brand-darker rounded-lg p-4 mb-4 overflow-x-auto text-sm text-green-400 font-mono"><code>git clone https://github.com/jefryKurniawan/TandurAI.git
cd TandurAI/mobile
npm install
npx expo start --tunnel</code></pre>

  <p class="text-secondary mb-4">
    Scan QR code pakai <strong>Expo Go</strong> di HP. Pastikan laptop & HP satu WiFi, atau pakai flag <code class="text-brand-primary">--tunnel</code> kalau beda jaringan. <em>Sampun siap dicoba!</em> 🙌
  </p>

  <p class="text-secondary mb-6">
    <em>(Dokumentasi setup backend FastAPI + Supabase bisa dilihat di folder <code class="text-brand-primary">backend/SETUP.md</code>)</em>
  </p>

  <hr class="border-brand-secondary/30 my-6" />

  <h2 class="text-xl font-bold mb-3">👤 Dikembangkan Oleh</h2>

  <p class="text-secondary mb-2"><strong>Jefry Kurniawan</strong></p>
  <p class="text-secondary mb-1">Software Quality Engineer | Linux Enthusiast | React & Python Dev</p>
  <p class="text-secondary mb-1">📍 Magetan, Jawa Timur, Indonesia</p>
  <p class="text-secondary mb-1">📧 kjefry525@gmail.com</p>
  <p class="text-secondary mb-4">🔗 <a href="https://www.linkedin.com/in/jefry-kurniawan-7443272aa" target="_blank" rel="noopener noreferrer" class="text-brand-primary hover:underline">LinkedIn</a></p>

  <blockquote class="border-l-4 border-brand-primary pl-4 italic text-secondary">
    Project ini dikerjain sebagai bukti kalau QA engineer juga bisa hands-on development dengan tetap uphold standar kualitas, performa, dan user experience. Nek pengen diskusi soal testing strategy, automation pipeline, atau kolaborasi project AgriTech, monggo hubungi via LinkedIn atau email. Matur nuwun sanget! 🙏✨
  </blockquote>
</div>`,
    tags: ["React Native", "Expo", "FastAPI", "AI"],
    repo: "https://github.com/jefryKurniawan/TandurAI",
    iconName: "TreePine",
    screenshots: [],
  },
  {
    slug: "al-ikhlas-mosque",
    name: "Masjid Al-Ikhlas",
    desc: "Mosque management application for donation tracking, event scheduling, and community engagement built with Laravel.",
    longDesc: `<p class="text-secondary mb-4">Aplikasi manajemen masjid untuk Masjid Al-Ikhlas Gonggang, Magetan. Dibangun dengan <strong>Laravel</strong> dan <strong>MySQL</strong>, sistem ini mengelola donasi, jadwal kegiatan, dan inventaris masjid secara digital.</p>
<p class="text-secondary mb-4">Fitur utama meliputi pencatatan donasi masuk/keluar secara real-time, manajemen jadwal pengajian dan kegiatan masjid, dokumentasi kegiatan, serta laporan keuangan bulanan yang transparan untuk jamaah.</p>
<p class="text-secondary">Video di bawah menampilkan demo alur donasi dan antarmuka pengguna aplikasi.</p>`,
    tags: ["Laravel", "MySQL", "Management"],
    repo: "https://github.com/jefryKurniawan/al-ikhlas-mosque",
    iconName: "Church",
    screenshots: [],
    video: "/masjid/al-ikhlas-gonggang.webm",
  },
  {
    slug: "laundry",
    name: "Aplikasi Laundry",
    desc: "Laundry management system with order tracking, payment processing, transaction notes, and owner dashboard. Built with Laravel.",
    longDesc: `<p class="text-secondary mb-4">Aplikasi manajemen laundry berbasis web yang dibangun dengan <strong>Laravel</strong> dan <strong>MySQL</strong>. Mencakup pencatatan order, proses pencucian, pembayaran, dan dashboard pemilik.</p>
<p class="text-secondary mb-4">Fitur utama meliputi input order dengan detail pelanggan dan catatan transaksi, status proses cucian (diterima → dicuci → siap → diambil), generate nota transaksi otomatis, serta laporan pendapatan harian/bulanan untuk pemilik.</p>
<p class="text-secondary">Screenshot di bawah menampilkan halaman login, dashboard, daftar order, input order, detail transaksi, nota, pembayaran, dan overview pemilik.</p>`,
    tags: ["Laravel", "MySQL", "Management"],
    repo: "https://github.com/jefryKurniawan/laundry",
    iconName: "Shirt",
    screenshots: [
      "/laundry/home-2.png",
      "/laundry/order.png",
      "/laundry/order-input.png",
      "/laundry/detail-transaksi.png",
      "/laundry/nota-transaksi.png",
      "/laundry/payment.png",
    ],
  },
];

export function getProjectBySlug(slug: string): FullstackProject | undefined {
  return fullstackProjects.find((p) => p.slug === slug);
}
