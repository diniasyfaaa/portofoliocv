// ──────────────────────────────────────────────
//  FORM VALIDATION UTILITIES (LEVEL 10)
// ──────────────────────────────────────────────

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateName(name: string): ValidationResult {
  const trimmed = (name || '').trim();
  if (!trimmed) {
    return { isValid: false, error: 'Nama tidak boleh kosong.' };
  }
  if (trimmed.length < 3) {
    return { isValid: false, error: 'Nama minimal 3 karakter.' };
  }
  if (trimmed.length > 60) {
    return { isValid: false, error: 'Nama maksimal 60 karakter.' };
  }
  // Allow letters, spaces, hyphens, and apostrophes
  const nameRegex = /^[a-zA-Z\s'-.]+$/;
  if (!nameRegex.test(trimmed)) {
    return { isValid: false, error: 'Nama hanya boleh mengandung huruf dan spasi.' };
  }
  return { isValid: true };
}

export function validateEmail(email: string): ValidationResult {
  const trimmed = (email || '').trim();
  if (!trimmed) {
    return { isValid: false, error: 'Email tidak boleh kosong.' };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(trimmed)) {
    return { isValid: false, error: 'Format email tidak valid (contoh: nama@domain.com).' };
  }
  return { isValid: true };
}

export function validateMessage(message: string): ValidationResult {
  const trimmed = (message || '').trim();
  if (!trimmed) {
    return { isValid: false, error: 'Pesan tidak boleh kosong.' };
  }
  if (trimmed.length < 10) {
    return { isValid: false, error: 'Pesan terlalu singkat (minimal 10 karakter).' };
  }
  if (trimmed.length > 1000) {
    return { isValid: false, error: 'Pesan maksimal 1000 karakter.' };
  }
  return { isValid: true };
}
