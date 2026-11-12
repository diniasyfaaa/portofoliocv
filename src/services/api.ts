// ──────────────────────────────────────────────
//  MOCK API SERVICE (LEVEL 10)
//  Simulates public/LMS API integration with loading,
//  error handling, and data filtering capabilities.
// ──────────────────────────────────────────────

import profileRaw from '../data/profile.json';
import portfolioRaw from '../data/portfolio.json';
import academicRaw from '../data/academic.json';
import { CVData, ProfileData, PortfolioItem, AcademicData, ContactMessage } from '../types';

let simulateErrorState = false;

// Toggle simulated error state for demonstrating Error View & Retry
export function setSimulatedError(enable: boolean) {
  simulateErrorState = enable;
}

export function isSimulatedError(): boolean {
  return simulateErrorState;
}

// Simulates network latency
const delay = (ms: number = 400) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchCVData(): Promise<CVData> {
  await delay(450);

  if (simulateErrorState) {
    throw new Error('Gagal memuat data dari server LMS. Periksa koneksi jaringan Anda.');
  }

  return {
    profile: profileRaw as unknown as ProfileData,
    portfolio: portfolioRaw as unknown as PortfolioItem[],
    academic: academicRaw as unknown as AcademicData,
  };
}

export async function fetchProfile(): Promise<ProfileData> {
  await delay(300);
  if (simulateErrorState) {
    throw new Error('Gagal mengambil data profil.');
  }
  return profileRaw as unknown as ProfileData;
}

export async function fetchPortfolio(
  category?: string,
  searchQuery?: string
): Promise<PortfolioItem[]> {
  await delay(350);
  if (simulateErrorState) {
    throw new Error('Gagal mengambil data portofolio.');
  }

  let items = [...portfolioRaw] as unknown as PortfolioItem[];

  if (category && category !== 'Semua') {
    items = items.filter((p) => p.kategori.toLowerCase() === category.toLowerCase());
  }

  if (searchQuery && searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    items = items.filter(
      (p) =>
        p.judul.toLowerCase().includes(q) ||
        p.deskripsi.toLowerCase().includes(q) ||
        p.tools.some((t) => t.toLowerCase().includes(q))
    );
  }

  return items;
}

export async function fetchAcademic(): Promise<AcademicData> {
  await delay(300);
  if (simulateErrorState) {
    throw new Error('Gagal menyinkronkan data nilai dari Academic War LMS.');
  }
  return academicRaw as unknown as AcademicData;
}

export async function sendContactMessage(payload: {
  nama: string;
  email: string;
  pesan: string;
}): Promise<ContactMessage> {
  await delay(600);
  if (simulateErrorState) {
    throw new Error('Server pengiriman pesan sedang sibuk. Silakan coba lagi.');
  }

  const newMessage: ContactMessage = {
    id: 'msg_' + Date.now(),
    nama: payload.nama.trim(),
    email: payload.email.trim(),
    pesan: payload.pesan.trim(),
    timestamp: new Date().toISOString(),
  };

  return newMessage;
}
