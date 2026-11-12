import { View, Text, Image, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

// ──────────────────────────────────────────────
//  PROPS
// ──────────────────────────────────────────────
type ProfileHeaderProps = {
  nim: string;
  nama: string;
  profesi: string;
  prodi: string;
};

// ──────────────────────────────────────────────
//  COMPONENT (Monochrome Black & White)
// ──────────────────────────────────────────────
export default function ProfileHeader({
  nim,
  nama,
  profesi,
  prodi,
}: ProfileHeaderProps) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      {/* Heading badge */}
      <Text style={[styles.headingBadge, { color: theme.textMuted }]}>
        PROFIL MAHASISWA
      </Text>

      {/* Avatar with sleek monochrome ring */}
      <View
        style={[
          styles.avatarRing,
          {
            borderColor: theme.isDark ? '#ffffff' : '#09090b',
            backgroundColor: theme.surface,
          },
        ]}
      >
        <Image
          source={require('../../assets/images/profile.jpg')}
          style={styles.avatar}
          resizeMode="cover"
        />
      </View>

      {/* Nama */}
      <Text style={[styles.nama, { color: theme.text }]}>{nama}</Text>

      {/* Profesi & Prodi */}
      <Text style={[styles.profesi, { color: theme.text }]}>{profesi}</Text>
      <Text style={[styles.prodi, { color: theme.textMuted }]}>{prodi}</Text>

      {/* NIM badge */}
      <View
        style={[
          styles.nimBadge,
          {
            backgroundColor: theme.surface,
            borderColor: theme.cardBorder,
          },
        ]}
      >
        <Text style={[styles.nimLabel, { color: theme.textMuted }]}>NIM</Text>
        <View style={[styles.nimDivider, { backgroundColor: theme.cardBorder }]} />
        <Text style={[styles.nimValue, { color: theme.text }]}>{nim}</Text>
      </View>
    </View>
  );
}

// ──────────────────────────────────────────────
//  STYLES
// ──────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 8,
  },
  headingBadge: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 3.5,
    textTransform: 'uppercase',
    marginBottom: 18,
  },
  avatarRing: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 2.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    marginBottom: 16,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  nama: {
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: -0.3,
    marginBottom: 6,
  },
  profesi: {
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  prodi: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 14,
  },
  nimBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 16,
    marginBottom: 10,
    borderWidth: 1,
    gap: 10,
  },
  nimLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  nimDivider: {
    width: 1,
    height: 14,
  },
  nimValue: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
});
