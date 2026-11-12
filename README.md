# Personal CV & Portfolio Mobile Application
### Dini Asyfa — NIM: 242505008
**Program Studi Sistem Informasi — Universitas Ma'soem**  
*Mata Kuliah: Pemrograman Mobile 2*  
*Tahun Akademik: 2026*

---

## 🎯 Gambaran Proyek

Aplikasi **Personal CV & Portfolio** ini dirancang secara profesional dengan pendekatan **Production-Oriented Mobile Application**, mengimplementasikan arsitektur bersih (*Clean Architecture*), multi-screen navigation berbasis **Expo Router**, serta desain visual **monokrom hitam-putih dominan** yang terinspirasi langsung dari slide presentasi portofolio desainer.

Aplikasi ini memenuhi seluruh kriteria kompetensi mulai dari **Level 1 hingga Level 10 (Industry Grade)**.

---

## 📊 Matriks Pencapaian Level (Level 1 — Level 10)

| Level | Kategori | Status | Keterangan & Implementasi |
| :--- | :--- | :---: | :--- |
| **Level 1** | Basic Layout | ✅ Selesai | Struktur `View`, `Text`, dan `Image` dasar dengan tata letak rapi |
| **Level 2** | Styling & Theme | ✅ Selesai | Desain monokrom hitam-putih, hierarki tipografi tegas, border elegan |
| **Level 3** | Components | ✅ Selesai | Komponen modular (`ProfileHeader`, `SectionCard`, `ExperienceItem`, dll.) |
| **Level 4** | Props & State | ✅ Selesai | Komponen menerima data dinamis melalui typed props |
| **Level 5** | Interactivity | ✅ Selesai | Collapsible card accordion, pressed animation, filter dinamis |
| **Level 6** | Lists & Data | ✅ Selesai | Render array data via `map()` dan horizontal gallery `FlatList` |
| **Level 7** | Form & Validation | ✅ Selesai | Formulir kontak dengan validasi langsung, regex, & counter karakter |
| **Level 8** | Responsive Design | ✅ Selesai | Responsif otomatis untuk PC (Desktop Slide Hero) & HP (Clean Mobile) |
| **Level 9** | Multi-Screen Professional | ✅ Selesai | Expo Router multi-halaman (`/`, `/about`, `/skills`, `/portfolio`, `/score`, `/contact`) |
| **Level 10** | Production & Industry | ✅ Selesai | Mock API, Loading/Error/Empty states, Target Simulator, Storage, a11y, Unit Tests |

---

## 📱 Struktur Navigasi Multi-Screen (Level 9)

Aplikasi telah dipisahkan menjadi 6 layar terdedikasi sesuai fungsinya:

```text
Personal CV App (Expo Router)
│
├── Home (/)
│   └── Profil Singkat, Desktop Slide Hero (PC), Ringkasan Metrik, & Menu Cepat
│
├── About (/about)
│   └── Biodata Lengkap, Visi Karier, Riwayat Pengalaman Kerja, Organisasi, & Pendidikan
│
├── Skills (/skills)
│   └── Soft Skills, Creative Tools (Figma, Canva, Adobe), & Tingkat Kemahiran (Proficiency)
│
├── Portfolio (/portfolio)
│   └── Galeri Proyek, Filter Kategori, Pencarian Real-time, Favorit, & Tautan Desain
│
├── My Score (/score)
│   └── Academic Dashboard LMS, Nilai (89/A), Learning Points (12.375), & Target Grade Simulator
│
└── Contact (/contact)
    └── Formulir Kontak Tervalidasi, Saluran Langsung (WhatsApp, Email), & Riwayat Pesan
```

- **Versi PC / Desktop**: Memiliki **Desktop Navbar** tetap di bagian atas dengan indikator halaman aktif, tombol simulasi error, dan tombol ganti tema (*Light/Dark*).
- **Versi HP / Mobile**: Memiliki **Mobile Tab Bar** tetap di bagian bawah dengan 6 tab navigasi yang mudah dijangkau ibu jari (*thumb-friendly*).

---

## 🚀 Fitur Praktik Industri (Level 10)

### 1. Mock API & Academic War LMS Integration
- Lapisan service terpisah di `src/services/api.ts` yang mensimulasikan pemanggilan data asinkron dari server/LMS dengan latensi jaringan realistis (400–600ms).
- Menyediakan fitur pengujian interaktif **"Test Error Mode"** pada navigasi atas untuk menguji ketahanan aplikasi saat server mengalami gangguan.

### 2. Penanganan Status Aplikasi (States Handling)
- **Loading State**: Komponen `LoadingSkeleton` dengan animasi denyut (*pulse animation*) bernuansa monokrom.
- **Error State**: Komponen `ErrorState` menampilkan pesan ramah pengguna dan tombol **"Coba Lagi (Retry)"** untuk mengambil ulang data.
- **Empty State**: Komponen `EmptyState` saat pencarian atau filter portofolio/skill tidak menemukan hasil, dilengkapi tombol reset filter.

### 3. Simulasi Target Nilai (Target Grade Simulator)
- Mahasiswi dapat memilih target nilai akhir yang diinginkan (`Grade A`, `Grade A-`, `Grade B+`, `Grade B`).
- Sistem menghitung secara matematis berapa skor minimum UAS yang wajib diperoleh berdasarkan bobot perkuliahan.

### 4. Penyimpanan Lokal (Local Persistence)
- Menyimpan preferensi tema pengguna (*Light / Dark*).
- Menyimpan riwayat pesan kontak yang pernah dikirim langsung di penyimpanan perangkat via `src/services/storage.ts`.
- Fitur *Auto-save Draft* formulir kontak sehingga teks tidak hilang saat pengguna berpindah tab.
- Fitur bookmark / favorit proyek portofolio.

### 5. Aksesibilitas (a11y) & UX
- Seluruh elemen interaktif memiliki properti `accessibilityRole`, `accessibilityLabel`, dan `accessibilityHint`.
- Input teks dilengkapi penanganan keyboard yang tepat (`keyboardType`, `returnKeyType`, `autoCapitalize`).

---

## 🧪 Pengujian Fitur Utama (Automated Unit Tests)

Aplikasi dilengkapi dengan rangkaian tes unit otomatis yang menguji logika bisnis utama:
- **Validasi Formulir**: Uji validitas nama, email (format regex), dan panjang pesan.
- **Kalkulasi Akademik**: Uji konversi grade, GPA, rata-rata progres, dan formula simulator UAS.
- **Integritas Data API**: Uji struktur data profil, portofolio, dan identitas akademik.

Jalankan pengujian dengan perintah:
```bash
npm test
```

Hasil pengujian:
```text
========================================================
  🚀 RUNNING AUTOMATED UNIT TEST SUITE (LEVEL 10)       
========================================================

🧪 Testing Validation Utilities...
  ✓ 10/10 validation test cases passed successfully!

🧪 Testing Score & Academic Calculations...
  ✓ 6/6 score calculation test cases passed successfully!

🧪 Testing Mock API & LMS Integration Service...
  ✓ 5/5 API & Data integrity test cases passed successfully!

========================================================
  🎉 ALL TEST SUITES PASSED! (3/3) in 4ms
  ✓ Level 10 Testing Requirement: COMPLETED
========================================================
```

---

## 💻 Panduan Menjalankan Aplikasi

### 1. Prasyarat
- Node.js versi 18 atau lebih baru.
- Web browser modern atau aplikasi Expo Go pada perangkat seluler.

### 2. Menjalankan di Browser (Versi PC / Web)
```bash
npx expo start --web
```
*Tampilan PC akan otomatis menyajikan slide banner PPT layar penuh, navigasi atas, dan tata letak sebaris-sebaris.*

### 3. Menjalankan di Perangkat Seluler (Android / iOS)
```bash
npx expo start
```
*Pindai kode QR yang muncul di terminal menggunakan aplikasi Expo Go.*

### 4. Menjalankan Pemeriksaan Kode (Lint & Typecheck)
```bash
# Typecheck TypeScript
npx tsc --noEmit

# Linting ESLint
npx eslint src

# Unit Testing
npm test
```
