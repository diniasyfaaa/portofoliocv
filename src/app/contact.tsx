import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Linking,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useCVData } from '../context/CVContext';
import ScreenContainer from '../components/navigation/ScreenContainer';
import SectionCard from '../components/SectionCard';
import { validateName, validateEmail, validateMessage } from '../utils/validation';
import { sendContactMessage } from '../services/api';
import { storage } from '../services/storage';

export default function ContactScreen() {
  const theme = useTheme();
  const { cvData, messages, addContactMessage } = useCVData();

  // ── Form State (initialized from local draft) ──
  const [nama, setNama] = useState(() => storage.getContactDraft()?.nama || '');
  const [email, setEmail] = useState(() => storage.getContactDraft()?.email || '');
  const [pesan, setPesan] = useState(() => storage.getContactDraft()?.pesan || '');

  const [errors, setErrors] = useState<{ nama?: string; email?: string; pesan?: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Save draft on edit
  const handleFieldChange = (field: 'nama' | 'email' | 'pesan', value: string) => {
    if (field === 'nama') setNama(value);
    if (field === 'email') setEmail(value);
    if (field === 'pesan') setPesan(value);

    // Clear field error
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (apiError) setApiError(null);

    // Save draft
    storage.saveContactDraft({
      nama: field === 'nama' ? value : nama,
      email: field === 'email' ? value : email,
      pesan: field === 'pesan' ? value : pesan,
    });
  };

  const handleValidate = () => {
    const nameVal = validateName(nama);
    const emailVal = validateEmail(email);
    const msgVal = validateMessage(pesan);

    const newErrors: { nama?: string; email?: string; pesan?: string } = {};
    if (!nameVal.isValid) newErrors.nama = nameVal.error;
    if (!emailVal.isValid) newErrors.email = emailVal.error;
    if (!msgVal.isValid) newErrors.pesan = msgVal.error;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!handleValidate()) return;

    try {
      setSubmitting(true);
      setApiError(null);

      const saved = await sendContactMessage({ nama, email, pesan });
      addContactMessage(saved);
      storage.clearContactDraft();

      setSubmitSuccess(true);
    } catch (err) {
      setApiError(err instanceof Error ? err.message : 'Gagal mengirimkan pesan.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setNama('');
    setEmail('');
    setPesan('');
    setErrors({});
    setSubmitSuccess(false);
    setApiError(null);
  };

  const handleOpenLink = (url: string) => {
    Linking.openURL(url).catch(() => {});
  };

  const profile = cvData?.profile;

  return (
    <ScreenContainer
      title="Contact"
      subtitle="Kirim Pesan, Kolaborasi Desain, & Saluran Komunikasi"
    >
      {/* ── 1. Contact Form Section ── */}
      <SectionCard title="Formulir Kontak Profesional" collapsible defaultOpen>
        {submitSuccess ? (
          <View style={styles.successBox}>
            <View
              style={[
                styles.successIconCircle,
                { backgroundColor: theme.surface, borderColor: theme.cardBorder },
              ]}
            >
              <Text style={[styles.successIcon, { color: theme.text }]}>✓</Text>
            </View>
            <Text style={[styles.successTitle, { color: theme.text }]}>
              Pesan Berhasil Terkirim!
            </Text>
            <Text style={[styles.successDesc, { color: theme.textMuted }]}>
              Terima kasih, <Text style={{ color: theme.text, fontWeight: '700' }}>{nama}</Text>. Pesan Anda telah tersimpan dan konfirmasi akan segera dibalas ke <Text style={{ color: theme.text, fontWeight: '700' }}>{email}</Text>.
            </Text>

            <TouchableOpacity
              style={[
                styles.resetBtn,
                {
                  backgroundColor: theme.primaryBtn,
                },
              ]}
              onPress={handleResetForm}
              accessibilityRole="button"
              accessibilityLabel="Kirim pesan lain"
            >
              <Text
                style={[
                  styles.resetBtnText,
                  { color: theme.primaryBtnText },
                ]}
              >
                Kirim Pesan Baru →
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.formContainer}>
            {apiError && (
              <View
                style={[
                  styles.errorAlert,
                  { backgroundColor: 'rgba(239, 68, 68, 0.08)', borderColor: '#ef4444' },
                ]}
              >
                <Text style={styles.errorAlertText}>⚠ {apiError}</Text>
              </View>
            )}

            <View style={styles.inputsRow}>
              {/* Nama */}
              <View style={styles.inputCol}>
                <Text style={[styles.label, { color: theme.textMuted }]}>
                  Nama Lengkap *
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: theme.inputBg,
                      borderColor: errors.nama ? '#ef4444' : theme.cardBorder,
                      color: theme.text,
                    },
                  ]}
                  value={nama}
                  onChangeText={(val) => handleFieldChange('nama', val)}
                  placeholder="Contoh: Budi Santoso"
                  placeholderTextColor={theme.textMuted}
                  autoCapitalize="words"
                  accessibilityLabel="Nama Lengkap"
                />
                {errors.nama && <Text style={styles.fieldError}>{errors.nama}</Text>}
              </View>

              {/* Email */}
              <View style={styles.inputCol}>
                <Text style={[styles.label, { color: theme.textMuted }]}>
                  Alamat Email *
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: theme.inputBg,
                      borderColor: errors.email ? '#ef4444' : theme.cardBorder,
                      color: theme.text,
                    },
                  ]}
                  value={email}
                  onChangeText={(val) => handleFieldChange('email', val)}
                  placeholder="nama@domain.com"
                  placeholderTextColor={theme.textMuted}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  accessibilityLabel="Alamat Email"
                />
                {errors.email && <Text style={styles.fieldError}>{errors.email}</Text>}
              </View>
            </View>

            {/* Pesan */}
            <View style={styles.textAreaCol}>
              <View style={styles.labelWithCounter}>
                <Text style={[styles.label, { color: theme.textMuted }]}>
                  Pesan Anda *
                </Text>
                <Text style={[styles.counterText, { color: theme.textMuted }]}>
                  {pesan.length} / 1000 karakter
                </Text>
              </View>
              <TextInput
                style={[
                  styles.input,
                  styles.textArea,
                  {
                    backgroundColor: theme.inputBg,
                    borderColor: errors.pesan ? '#ef4444' : theme.cardBorder,
                    color: theme.text,
                  },
                ]}
                value={pesan}
                onChangeText={(val) => handleFieldChange('pesan', val)}
                placeholder="Tuliskan topik proyek, tawaran magang, atau pesan Anda..."
                placeholderTextColor={theme.textMuted}
                multiline
                numberOfLines={5}
                textAlignVertical="top"
                maxLength={1000}
                accessibilityLabel="Isi Pesan"
              />
              {errors.pesan && <Text style={styles.fieldError}>{errors.pesan}</Text>}
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={[
                styles.submitBtn,
                {
                  backgroundColor: theme.primaryBtn,
                  opacity: submitting ? 0.7 : 1,
                },
              ]}
              onPress={handleSubmit}
              disabled={submitting}
              accessibilityRole="button"
              accessibilityLabel="Kirim formulir pesan"
            >
              {submitting ? (
                <View style={styles.submittingRow}>
                  <ActivityIndicator color={theme.primaryBtnText} size="small" />
                  <Text
                    style={[
                      styles.submitBtnText,
                      { color: theme.primaryBtnText, marginLeft: 8 },
                    ]}
                  >
                    Mengirimkan Pesan...
                  </Text>
                </View>
              ) : (
                <Text
                  style={[
                    styles.submitBtnText,
                    { color: theme.primaryBtnText },
                  ]}
                >
                  Kirim Pesan Sekarang →
                </Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </SectionCard>

      {/* ── 2. Direct Channels & Social Links ── */}
      {profile && (
        <SectionCard title="Saluran Komunikasi Langsung" collapsible defaultOpen>
          <View style={styles.channelsGrid}>
            {[
              {
                label: 'Email Kampus',
                value: profile.email,
                action: () => handleOpenLink(`mailto:${profile.email}`),
                icon: '✉',
              },
              {
                label: 'WhatsApp',
                value: profile.telepon,
                action: () => handleOpenLink(`https://wa.me/6281234567890`),
                icon: '💬',
              },
              {
                label: 'Domisili Kampus',
                value: profile.lokasi,
                action: () => {},
                icon: '📍',
              },
              {
                label: 'LinkedIn Profile',
                value: 'diniasyfa',
                action: () => handleOpenLink(profile.linkedin),
                icon: '🔗',
              },
              {
                label: 'Instagram Visual',
                value: profile.instagram,
                action: () => handleOpenLink(`https://instagram.com/diniasyfa_`),
                icon: '📷',
              },
              {
                label: 'GitHub Repository',
                value: 'github.com/diniasyfa',
                action: () => handleOpenLink(profile.github),
                icon: '💻',
              },
            ].map((item, idx) => (
              <TouchableOpacity
                key={idx}
                style={[
                  styles.channelCard,
                  {
                    backgroundColor: theme.surface,
                    borderColor: theme.cardBorder,
                  },
                ]}
                onPress={item.action}
                activeOpacity={0.75}
                accessibilityRole="button"
                accessibilityLabel={`Hubungi via ${item.label}`}
              >
                <Text style={styles.channelIcon}>{item.icon}</Text>
                <View style={styles.channelCol}>
                  <Text style={[styles.channelLabel, { color: theme.textMuted }]}>
                    {item.label}
                  </Text>
                  <Text style={[styles.channelValue, { color: theme.text }]}>
                    {item.value}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </SectionCard>
      )}

      {/* ── 3. Local Message History (Level 10 Persistence) ── */}
      {messages.length > 0 && (
        <SectionCard title={`Riwayat Pesan Anda (${messages.length})`} collapsible>
          <Text style={[styles.historyIntro, { color: theme.textMuted }]}>
            Daftar pesan yang telah berhasil Anda kirim dari perangkat ini (tersimpan di local storage):
          </Text>

          <View style={styles.historyList}>
            {messages.map((msg) => (
              <View
                key={msg.id}
                style={[
                  styles.historyCard,
                  {
                    backgroundColor: theme.surface,
                    borderColor: theme.cardBorder,
                  },
                ]}
              >
                <View style={styles.historyHeader}>
                  <Text style={[styles.historySender, { color: theme.text }]}>
                    {msg.nama} ({msg.email})
                  </Text>
                  <Text style={[styles.historyTime, { color: theme.textMuted }]}>
                    {new Date(msg.timestamp).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Text>
                </View>
                <Text style={[styles.historyBody, { color: theme.textMuted }]}>
                  {msg.pesan}
                </Text>
              </View>
            ))}
          </View>
        </SectionCard>
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    gap: 14,
  },
  errorAlert: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
  },
  errorAlertText: {
    color: '#ef4444',
    fontSize: 13,
    fontWeight: '600',
  },
  inputsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },
  inputCol: {
    flex: 1,
    minWidth: 260,
  },
  textAreaCol: {
    width: '100%',
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  labelWithCounter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  counterText: {
    fontSize: 11,
    fontWeight: '500',
  },
  input: {
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
  },
  textArea: {
    height: 120,
    paddingTop: 12,
  },
  fieldError: {
    fontSize: 12,
    color: '#ef4444',
    marginTop: 4,
    fontWeight: '500',
  },
  submitBtn: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  submittingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitBtnText: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  // Success Box
  successBox: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  successIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  successIcon: {
    fontSize: 32,
    fontWeight: '900',
  },
  successTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 8,
  },
  successDesc: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 480,
    marginBottom: 20,
  },
  resetBtn: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  resetBtnText: {
    fontSize: 13,
    fontWeight: '700',
  },

  // Channels
  channelsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  channelCard: {
    flex: 1,
    minWidth: 260,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 12,
  },
  channelIcon: {
    fontSize: 20,
  },
  channelCol: {
    flex: 1,
  },
  channelLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  channelValue: {
    fontSize: 13,
    fontWeight: '700',
  },

  // History
  historyIntro: {
    fontSize: 13,
    marginBottom: 12,
  },
  historyList: {
    gap: 10,
  },
  historyCard: {
    borderRadius: 10,
    borderWidth: 1,
    padding: 14,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
    flexWrap: 'wrap',
    gap: 6,
  },
  historySender: {
    fontSize: 13,
    fontWeight: '700',
  },
  historyTime: {
    fontSize: 11,
  },
  historyBody: {
    fontSize: 13,
    lineHeight: 18,
  },
});
