import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';

// ──────────────────────────────────────────────
//  TYPES
// ──────────────────────────────────────────────
type FormState = {
  nama: string;
  email: string;
  pesan: string;
};

type FormErrors = {
  nama?: string;
  email?: string;
  pesan?: string;
};

// ──────────────────────────────────────────────
//  COMPONENT (Monochrome Black & White)
// ──────────────────────────────────────────────
export default function ContactForm() {
  const theme = useTheme();

  // ── State ──
  const [form, setForm] = useState<FormState>({
    nama: '',
    email: '',
    pesan: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<keyof FormState | null>(null);

  // ── Helpers ──
  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.nama.trim()) newErrors.nama = 'Nama tidak boleh kosong.';
    if (!form.email.trim()) {
      newErrors.email = 'Email tidak boleh kosong.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      newErrors.email = 'Format email tidak valid.';
    }
    if (!form.pesan.trim()) newErrors.pesan = 'Pesan tidak boleh kosong.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setForm({ nama: '', email: '', pesan: '' });
    setErrors({});
    setSubmitted(false);
  };

  // ── Submitted View ──
  if (submitted) {
    return (
      <View style={styles.successBox}>
        <Text style={[styles.successIcon, { color: theme.text }]}>✓</Text>
        <Text style={[styles.successTitle, { color: theme.text }]}>
          Pesan Terkirim!
        </Text>
        <Text style={[styles.successMsg, { color: theme.textMuted }]}>
          Terima kasih,{' '}
          <Text style={[styles.highlight, { color: theme.text }]}>
            {form.nama}
          </Text>
          !{'\n'}
          Pesan kamu sudah diterima dan akan segera dibalas ke{' '}
          <Text style={[styles.highlight, { color: theme.text }]}>
            {form.email}
          </Text>
          .
        </Text>
        <TouchableOpacity
          style={[
            styles.resetBtn,
            {
              borderColor: theme.cardBorder,
              backgroundColor: theme.surface,
            },
          ]}
          onPress={handleReset}
        >
          <Text style={[styles.resetBtnText, { color: theme.text }]}>
            Kirim Pesan Lagi
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ── Form View ──
  return (
    <View>
      {/* Responsive Input Row (side-by-side on PC, stacked on mobile) */}
      <View style={styles.inputsRow}>
        {/* Nama */}
        <View style={styles.inputCol}>
          <Text style={[styles.label, { color: theme.textMuted }]}>Nama</Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.inputBg,
                borderColor: theme.cardBorder,
                color: theme.text,
              },
              focused === 'nama' && {
                borderColor: theme.text,
                backgroundColor: theme.surface,
              },
              errors.nama ? styles.inputError : null,
            ]}
            placeholder="Nama lengkap kamu"
            placeholderTextColor={theme.textMuted}
            value={form.nama}
            onChangeText={(v) => handleChange('nama', v)}
            onFocus={() => setFocused('nama')}
            onBlur={() => setFocused(null)}
            autoCapitalize="words"
          />
          {errors.nama ? <Text style={styles.errorText}>{errors.nama}</Text> : null}
        </View>

        {/* Email */}
        <View style={styles.inputCol}>
          <Text style={[styles.label, { color: theme.textMuted }]}>Email</Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.inputBg,
                borderColor: theme.cardBorder,
                color: theme.text,
              },
              focused === 'email' && {
                borderColor: theme.text,
                backgroundColor: theme.surface,
              },
              errors.email ? styles.inputError : null,
            ]}
            placeholder="email@kamu.com"
            placeholderTextColor={theme.textMuted}
            value={form.email}
            onChangeText={(v) => handleChange('email', v)}
            onFocus={() => setFocused('email')}
            onBlur={() => setFocused(null)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
        </View>
      </View>

      {/* Pesan (Full width) */}
      <Text style={[styles.label, { color: theme.textMuted }]}>Pesan</Text>
      <TextInput
        style={[
          styles.input,
          styles.textarea,
          {
            backgroundColor: theme.inputBg,
            borderColor: theme.cardBorder,
            color: theme.text,
          },
          focused === 'pesan' && {
            borderColor: theme.text,
            backgroundColor: theme.surface,
          },
          errors.pesan ? styles.inputError : null,
        ]}
        placeholder="Tulis pesanmu di sini..."
        placeholderTextColor={theme.textMuted}
        value={form.pesan}
        onChangeText={(v) => handleChange('pesan', v)}
        onFocus={() => setFocused('pesan')}
        onBlur={() => setFocused(null)}
        multiline
        numberOfLines={4}
        textAlignVertical="top"
      />
      {errors.pesan ? <Text style={styles.errorText}>{errors.pesan}</Text> : null}

      {/* Submit button */}
      <TouchableOpacity
        style={[
          styles.submitBtn,
          {
            backgroundColor: theme.primaryBtn,
          },
        ]}
        onPress={handleSubmit}
        activeOpacity={0.8}
      >
        <Text style={[styles.submitBtnText, { color: theme.primaryBtnText }]}>
          Kirim Pesan →
        </Text>
      </TouchableOpacity>
    </View>
  );
}

// ──────────────────────────────────────────────
//  STYLES
// ──────────────────────────────────────────────
const ERROR = '#ef4444';

const styles = StyleSheet.create({
  inputsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  inputCol: {
    flex: 1,
    minWidth: 260,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 6,
    marginTop: 4,
  },
  input: {
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    marginBottom: 4,
  },
  textarea: {
    height: 110,
    paddingTop: 12,
  },
  inputError: {
    borderColor: ERROR,
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
  },
  errorText: {
    fontSize: 12,
    color: ERROR,
    marginBottom: 8,
    marginLeft: 4,
  },
  submitBtn: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  submitBtnText: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  // ── Success state ──
  successBox: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  successIcon: {
    fontSize: 38,
    marginBottom: 8,
    fontWeight: '900',
  },
  successTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 8,
  },
  successMsg: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  highlight: {
    fontWeight: '700',
  },
  resetBtn: {
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  resetBtnText: {
    fontWeight: '700',
    fontSize: 13,
  },
});
