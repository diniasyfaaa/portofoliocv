// ──────────────────────────────────────────────
//  LOCAL STORAGE SERVICE (LEVEL 10)
//  Lightweight persistence for user preferences,
//  drafts, and message history across sessions.
// ──────────────────────────────────────────────

import { Platform } from 'react-native';
import { ContactMessage } from '../types';

const memoryStore: Record<string, string> = {};

function getItem(key: string): string | null {
  try {
    if (Platform.OS === 'web' && typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage.getItem(key);
    }
  } catch {
    // fallback to memory
  }
  return memoryStore[key] || null;
}

function setItem(key: string, value: string): void {
  try {
    if (Platform.OS === 'web' && typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(key, value);
      return;
    }
  } catch {
    // fallback to memory
  }
  memoryStore[key] = value;
}

const STORAGE_KEYS = {
  THEME_MODE: 'cv_app_theme_mode',
  CONTACT_MESSAGES: 'cv_app_contact_messages',
  CONTACT_DRAFT: 'cv_app_contact_draft',
  FAVORITE_PROJECTS: 'cv_app_favorite_projects',
};

export const storage = {
  getThemeMode(): 'light' | 'dark' | null {
    const val = getItem(STORAGE_KEYS.THEME_MODE);
    return val === 'light' || val === 'dark' ? val : null;
  },
  setThemeMode(mode: 'light' | 'dark'): void {
    setItem(STORAGE_KEYS.THEME_MODE, mode);
  },

  getContactMessages(): ContactMessage[] {
    const raw = getItem(STORAGE_KEYS.CONTACT_MESSAGES);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  },
  saveContactMessage(msg: ContactMessage): void {
    const existing = storage.getContactMessages();
    const updated = [msg, ...existing];
    setItem(STORAGE_KEYS.CONTACT_MESSAGES, JSON.stringify(updated.slice(0, 20)));
  },

  getContactDraft(): { nama: string; email: string; pesan: string } | null {
    const raw = getItem(STORAGE_KEYS.CONTACT_DRAFT);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },
  saveContactDraft(draft: { nama: string; email: string; pesan: string }): void {
    setItem(STORAGE_KEYS.CONTACT_DRAFT, JSON.stringify(draft));
  },
  clearContactDraft(): void {
    try {
      if (Platform.OS === 'web' && typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(STORAGE_KEYS.CONTACT_DRAFT);
      }
    } catch {
      // ignore
    }
    delete memoryStore[STORAGE_KEYS.CONTACT_DRAFT];
  },

  getFavoriteProjects(): string[] {
    const raw = getItem(STORAGE_KEYS.FAVORITE_PROJECTS);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  },
  toggleFavoriteProject(id: string): string[] {
    const current = storage.getFavoriteProjects();
    const next = current.includes(id) ? current.filter((x) => x !== id) : [...current, id];
    setItem(STORAGE_KEYS.FAVORITE_PROJECTS, JSON.stringify(next));
    return next;
  },
};
