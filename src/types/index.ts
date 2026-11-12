// ──────────────────────────────────────────────
//  CENTRALIZED TYPES (LEVEL 10 ARCHITECTURE)
// ──────────────────────────────────────────────

export interface PengalamanItem {
  role: string;
  org: string;
  period: string;
  deskripsi?: string;
}

export interface PendidikanItem {
  role: string;
  org: string;
  period: string;
  keterangan?: string;
}

export interface OrganisasiItem {
  role: string;
  org: string;
  period: string;
  deskripsi?: string;
}

export interface ProfileData {
  nim: string;
  nama: string;
  profesi: string;
  prodi: string;
  universitas: string;
  deskripsi: string;
  tahun: string;
  barcode: string;
  email: string;
  telepon: string;
  lokasi: string;
  github: string;
  linkedin: string;
  instagram: string;
  kemampuan: string[];
  keahlian: string[];
  pengalaman: PengalamanItem[];
  organisasi: OrganisasiItem[];
  pendidikan: PendidikanItem[];
}

export interface PortfolioItem {
  id: string;
  judul: string;
  kategori: string;
  deskripsi: string;
  tools: string[];
  warna: string;
  tahun: string;
  link?: string;
  featured?: boolean;
}

export interface AcademicIdentitas {
  nama: string;
  nim: string;
  mataKuliah: string;
  dosen: string;
  semester: string;
  ipk: number;
}

export interface CurrentScore {
  nilai: number;
  grade: string;
}

export interface ProgressEntry {
  label: string;
  value: number;
}

export interface AcademicData {
  identitas: AcademicIdentitas;
  currentScore: CurrentScore;
  learningPoints: number;
  learningProgress: ProgressEntry[];
}

export interface ContactMessage {
  id: string;
  nama: string;
  email: string;
  pesan: string;
  timestamp: string;
}

export interface CVData {
  profile: ProfileData;
  portfolio: PortfolioItem[];
  academic: AcademicData;
}
