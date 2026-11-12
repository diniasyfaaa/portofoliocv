import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useCVData } from '../context/CVContext';
import ScreenContainer from '../components/navigation/ScreenContainer';
import SectionCard from '../components/SectionCard';
import ExperienceItem from '../components/ExperienceItem';

export default function AboutScreen() {
  const theme = useTheme();
  const { cvData } = useCVData();

  if (!cvData) return null;
  const { profile } = cvData;

  const personalInfo = [
    { label: 'Nama Lengkap', value: profile.nama },
    { label: 'NIM', value: profile.nim },
    { label: 'Program Studi', value: profile.prodi },
    { label: 'Perguruan Tinggi', value: profile.universitas },
    { label: 'Profesi & Minat', value: profile.profesi },
    { label: 'Tahun Angkatan', value: profile.tahun },
    { label: 'Email Kampus', value: profile.email },
    { label: 'Kontak WhatsApp', value: profile.telepon },
    { label: 'Domisili', value: profile.lokasi },
  ];

  return (
    <ScreenContainer
      title="About"
      subtitle="Informasi Pribadi, Riwayat Karier, & Pendidikan"
    >
      {/* ── 1. Biodata Lengkap ── */}
      <SectionCard title="Biodata Mahasiswi" collapsible defaultOpen>
        <View style={styles.infoGrid}>
          {personalInfo.map((item, idx) => (
            <View
              key={idx}
              style={[
                styles.infoItem,
                {
                  backgroundColor: theme.surface,
                  borderColor: theme.cardBorder,
                },
              ]}
            >
              <Text style={[styles.infoLabel, { color: theme.textMuted }]}>
                {item.label}
              </Text>
              <Text style={[styles.infoValue, { color: theme.text }]}>
                {item.value}
              </Text>
            </View>
          ))}
        </View>
      </SectionCard>

      {/* ── 2. Biografi & Visi Karier ── */}
      <SectionCard title="Biografi & Minat Profesional" collapsible defaultOpen>
        <Text style={[styles.bioParagraph, { color: theme.text }]}>
          {profile.deskripsi}
        </Text>
        <Text style={[styles.bioParagraph, { color: theme.textMuted, marginTop: 12 }]}>
          Berfokus pada pembuatan karya desain visual yang fungsional, komunikatif, dan selaras dengan identitas brand. Memiliki ketertarikan mendalam dalam perancangan antarmuka digital (UI/UX) yang ramah pengguna serta produksi video kreatif untuk promosi media sosial.
        </Text>
      </SectionCard>

      {/* ── 3. Pengalaman Kerja & Magang ── */}
      <SectionCard title="Pengalaman Kerja & Proyek" collapsible defaultOpen>
        {profile.pengalaman.map((item, i) => (
          <ExperienceItem
            key={`exp-${i}`}
            role={item.role}
            organization={item.org}
            period={item.period}
            isLast={i === profile.pengalaman.length - 1}
          />
        ))}
      </SectionCard>

      {/* ── 4. Pengalaman Organisasi ── */}
      <SectionCard title="Aktivitas Organisasi Kampus" collapsible defaultOpen>
        {profile.organisasi.map((item, i) => (
          <ExperienceItem
            key={`org-${i}`}
            role={item.role}
            organization={item.org}
            period={item.period}
            isLast={i === profile.organisasi.length - 1}
          />
        ))}
      </SectionCard>

      {/* ── 5. Riwayat Pendidikan ── */}
      <SectionCard title="Riwayat Pendidikan" collapsible defaultOpen>
        {profile.pendidikan.map((item, i) => (
          <ExperienceItem
            key={`edu-${i}`}
            role={item.role}
            organization={item.org}
            period={item.period}
            isLast={i === profile.pendidikan.length - 1}
          />
        ))}
      </SectionCard>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },
  infoItem: {
    flex: 1,
    minWidth: 260,
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  infoLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  bioParagraph: {
    fontSize: 15,
    lineHeight: 25,
  },
});
