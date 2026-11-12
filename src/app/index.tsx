import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '../context/ThemeContext';
import { useResponsive } from '../hooks/useResponsive';
import { useCVData } from '../context/CVContext';
import ScreenContainer from '../components/navigation/ScreenContainer';
import DesktopSlideHero from '../components/DesktopSlideHero';
import ProfileHeader from '../components/ProfileHeader';
import SectionCard from '../components/SectionCard';

export default function HomeScreen() {
  const theme = useTheme();
  const { isDesktop } = useResponsive();
  const { cvData } = useCVData();

  if (!cvData) return null;
  const { profile, academic, portfolio } = cvData;

  const quickNavCards = [
    {
      title: 'Informasi Pribadi & Riwayat',
      desc: `${profile.pengalaman.length} Pengalaman Kerja, ${profile.organisasi.length} Organisasi, & Pendidikan`,
      icon: '👤',
      route: '/about',
      tag: 'About Me',
    },
    {
      title: 'Kemampuan & Keahlian',
      desc: `${profile.kemampuan.length} Soft skills & ${profile.keahlian.length} Creative Tools terverifikasi`,
      icon: '⚡',
      route: '/skills',
      tag: 'Skills',
    },
    {
      title: 'Galeri Portofolio Proyek',
      desc: `Jelajahi ${portfolio.length} karya Branding, UI/UX Design, & Videografi`,
      icon: '💼',
      route: '/portfolio',
      tag: 'Portfolio',
    },
    {
      title: 'Academic Score Dashboard',
      desc: `Nilai: ${academic.currentScore.nilai} (${academic.currentScore.grade}) • ${academic.learningPoints.toLocaleString()} LP`,
      icon: '📊',
      route: '/score',
      tag: 'My Score',
    },
    {
      title: 'Hubungi Saya',
      desc: 'Formulir pesan langsung, email, WhatsApp, & media sosial',
      icon: '✉',
      route: '/contact',
      tag: 'Contact',
    },
  ];

  return (
    <ScreenContainer title="Home" subtitle="Profil Singkat & Navigasi Portofolio">
      {/* ── 1. Hero Section (PPT Slide on PC, Clean Header on Mobile) ── */}
      {isDesktop ? (
        <DesktopSlideHero
          nama={profile.nama}
          nim={profile.nim}
          profesi={profile.profesi}
          prodi={profile.prodi}
          tahun={profile.tahun}
          barcode={profile.barcode}
        />
      ) : (
        <View style={styles.mobileHeroBox}>
          <ProfileHeader
            nim={profile.nim}
            nama={profile.nama}
            profesi={profile.profesi}
            prodi={profile.prodi}
          />
          <View
            style={[
              styles.mobileBioCard,
              { backgroundColor: theme.surface, borderColor: theme.cardBorder },
            ]}
          >
            <Text style={[styles.mobileBioText, { color: theme.text }]}>
              {profile.deskripsi}
            </Text>
          </View>
        </View>
      )}

      {/* ── 2. Quick Metrics Highlights (Full Width) ── */}
      <View
        style={[
          styles.metricsRow,
          { backgroundColor: theme.card, borderColor: theme.cardBorder },
        ]}
      >
        {[
          { label: 'STATUS', value: 'Mahasiswi Aktif' },
          { label: 'PROYEK SELESAI', value: `${portfolio.length} Karya` },
          { label: 'NILAI KULIAH', value: `${academic.currentScore.nilai} (${academic.currentScore.grade})` },
          { label: 'LEARNING POINTS', value: `${academic.learningPoints.toLocaleString()} LP` },
        ].map((item, i) => (
          <View key={i} style={styles.metricItem}>
            <Text style={[styles.metricLabel, { color: theme.textMuted }]}>
              {item.label}
            </Text>
            <Text style={[styles.metricValue, { color: theme.text }]}>
              {item.value}
            </Text>
          </View>
        ))}
      </View>

      {/* ── 3. Multi-Screen Navigation Directory (Full Width Rows) ── */}
      <SectionCard title="Jelajahi Halaman Aplikasi" collapsible defaultOpen>
        <Text style={[styles.sectionSubtitle, { color: theme.textMuted }]}>
          Aplikasi telah diorganisasi ke dalam multi-screen profesional. Pilih menu di bawah atau gunakan navigasi untuk berpindah halaman:
        </Text>

        <View style={styles.navGrid}>
          {quickNavCards.map((card, i) => (
            <TouchableOpacity
              key={i}
              style={[
                styles.navCard,
                {
                  backgroundColor: theme.surface,
                  borderColor: theme.cardBorder,
                },
              ]}
              onPress={() => router.push(card.route as unknown as never)}
              activeOpacity={0.75}
              accessibilityRole="button"
              accessibilityLabel={`Buka halaman ${card.tag}`}
            >
              <View style={styles.navCardTop}>
                <View
                  style={[
                    styles.navIconBox,
                    { backgroundColor: theme.card, borderColor: theme.cardBorder },
                  ]}
                >
                  <Text style={styles.navIcon}>{card.icon}</Text>
                </View>
                <View
                  style={[
                    styles.tagBadge,
                    { backgroundColor: theme.card, borderColor: theme.cardBorder },
                  ]}
                >
                  <Text style={[styles.tagText, { color: theme.text }]}>
                    {card.tag}
                  </Text>
                </View>
              </View>

              <Text style={[styles.navCardTitle, { color: theme.text }]}>
                {card.title}
              </Text>

              <Text style={[styles.navCardDesc, { color: theme.textMuted }]}>
                {card.desc}
              </Text>

              <View style={styles.navCardFooter}>
                <Text style={[styles.navActionText, { color: theme.text }]}>
                  Buka Halaman →
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </SectionCard>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  mobileHeroBox: {
    marginBottom: 20,
  },
  mobileBioCard: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
    marginTop: 8,
  },
  mobileBioText: {
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
  },

  // Metrics
  metricsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 18,
    borderWidth: 1,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 3,
  },
  metricItem: {
    flex: 1,
    minWidth: 140,
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: -0.2,
  },

  // Directory
  sectionSubtitle: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 20,
  },
  navGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  navCard: {
    flex: 1,
    minWidth: 280,
    borderRadius: 16,
    borderWidth: 1,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  navCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  navIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIcon: {
    fontSize: 20,
  },
  tagBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
    borderWidth: 1,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '700',
  },
  navCardTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 6,
  },
  navCardDesc: {
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 16,
  },
  navCardFooter: {
    marginTop: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
  },
  navActionText: {
    fontSize: 13,
    fontWeight: '700',
  },
});
