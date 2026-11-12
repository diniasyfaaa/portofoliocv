import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Barcode from './Barcode';

type DesktopSlideHeroProps = {
  nama: string;
  nim: string;
  profesi: string;
  prodi: string;
  tahun?: string;
  barcode?: string;
};

export default function DesktopSlideHero({
  nama,
  nim,
  profesi,
  prodi,
  tahun = '2026',
  barcode = '3 5 4 6 8 9 5 0 1 8 7 8 4',
}: DesktopSlideHeroProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.slideCard,
        {
          backgroundColor: theme.card,
          borderColor: theme.cardBorder,
        },
      ]}
    >
      {/* ── Slide Header: Name & Year ── */}
      <View style={styles.slideHeader}>
        <Text style={[styles.headerAuthor, { color: theme.text }]}>{nama}</Text>
        <Text style={[styles.headerYear, { color: theme.text }]}>{tahun}</Text>
      </View>

      {/* ── Main Slide Body ── */}
      <View style={styles.slideBody}>
        {/* Left Column: Realistic Hanging Lanyard & ID Badge */}
        <View style={styles.badgeColumn}>
          {/* Lanyard Top Strap */}
          <View style={styles.lanyardStrapContainer}>
            <View style={styles.lanyardStrap} />
            {/* Metal Swivel Ring */}
            <View style={styles.metalRing} />
            {/* Plastic Badge Clamp */}
            <View style={styles.badgeClip} />
          </View>

          {/* ID Card Badge */}
          <View
            style={[
              styles.idCard,
              {
                backgroundColor: theme.isDark ? '#18181b' : '#ffffff',
                borderColor: theme.isDark ? '#27272a' : '#e4e4e7',
              },
            ]}
          >
            {/* Card Punch Hole */}
            <View
              style={[
                styles.punchHole,
                { backgroundColor: theme.isDark ? '#27272a' : '#e5e7eb' },
              ]}
            />

            {/* Photo with crisp border */}
            <View
              style={[
                styles.photoBorderBox,
                { borderColor: theme.isDark ? '#3f3f46' : '#000000' },
              ]}
            >
              <Image
                source={require('../../assets/images/profile.jpg')}
                style={styles.photo}
                resizeMode="cover"
              />
            </View>

            {/* Barcode & Numbers */}
            <View style={styles.barcodeWrapper}>
              <Barcode
                code={barcode}
                height={34}
                color={theme.isDark ? '#fafafa' : '#000000'}
                textColor={theme.isDark ? '#fafafa' : '#000000'}
              />
            </View>
          </View>
        </View>

        {/* Center / Right Content: Typography & Bio */}
        <View style={styles.contentColumn}>
          {/* Headline: Hello, my name is */}
          <View style={styles.headlineRow}>
            <Text style={[styles.helloText, { color: theme.text }]}>Hello, </Text>
            <Text style={[styles.nameIsText, { color: theme.text }]}>
              my name is
            </Text>
          </View>

          {/* Large Name */}
          <Text style={[styles.nameText, { color: theme.text }]}>{nama}</Text>

          {/* Bio paragraph with highlighted bold terms */}
          <Text style={[styles.bioText, { color: theme.text }]}>
            Saya {nama}, seorang Mahasiswi aktif Prodi Sistem Informasi tingkat dua
            Universitas {"Ma'soem"} dengan minat yang kuat dalam bidang Industri Kreatif
            seperti <Text style={styles.boldText}>desain</Text> dan{' '}
            <Text style={styles.boldText}>editing video</Text>. Memiliki
            kreativitas tinggi dan kemampuan dalam kerja sama tim maupun individual.
          </Text>

          {/* Minimalist monochrome metadata tags */}
          <View style={styles.metaRow}>
            <View
              style={[
                styles.metaChip,
                {
                  backgroundColor: theme.surface,
                  borderColor: theme.cardBorder,
                },
              ]}
            >
              <Text style={[styles.metaChipLabel, { color: theme.textMuted }]}>
                NIM
              </Text>
              <Text style={[styles.metaChipVal, { color: theme.text }]}>{nim}</Text>
            </View>

            <View
              style={[
                styles.metaChip,
                {
                  backgroundColor: theme.surface,
                  borderColor: theme.cardBorder,
                },
              ]}
            >
              <Text style={[styles.metaChipVal, { color: theme.text }]}>
                {profesi}
              </Text>
            </View>

            <View
              style={[
                styles.metaChip,
                {
                  backgroundColor: theme.surface,
                  borderColor: theme.cardBorder,
                },
              ]}
            >
              <Text style={[styles.metaChipVal, { color: theme.textMuted }]}>
                {prodi}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* ── Slide Right-Edge Graphic Element (from PPT slide) ── */}
      <View style={styles.rightEdgeShapeContainer}>
        {/* Upper narrow guide */}
        <View
          style={[
            styles.rightEdgeUpper,
            { backgroundColor: theme.isDark ? '#27272a' : '#000000' },
          ]}
        />
        {/* Curved tab cutout */}
        <View
          style={[
            styles.rightEdgeTab,
            { backgroundColor: theme.isDark ? '#27272a' : '#000000' },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  slideCard: {
    width: '100%',
    borderRadius: 24,
    borderWidth: 1,
    paddingTop: 34,
    paddingBottom: 42,
    paddingHorizontal: 48,
    marginBottom: 28,
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 8,
  },

  // ── Header Row ──
  slideHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingRight: 40,
  },
  headerAuthor: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  headerYear: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1.2,
  },

  // ── Body ──
  slideBody: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 50,
  },

  // ── Left Column: Lanyard & ID Badge ──
  badgeColumn: {
    width: 220,
    alignItems: 'center',
    paddingTop: 10,
    marginRight: 40,
  },
  lanyardStrapContainer: {
    alignItems: 'center',
    zIndex: 2,
    marginBottom: -10,
  },
  lanyardStrap: {
    width: 22,
    height: 38,
    backgroundColor: '#0a0a0a',
    borderRadius: 2,
  },
  metalRing: {
    width: 26,
    height: 8,
    backgroundColor: '#cbd5e1',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#94a3b8',
    marginTop: -2,
  },
  badgeClip: {
    width: 14,
    height: 18,
    backgroundColor: '#f8fafc',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    marginTop: -1,
    zIndex: 3,
  },

  idCard: {
    width: 195,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingTop: 14,
    paddingBottom: 16,
    alignItems: 'center',
    transform: [{ rotate: '-6deg' }],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 10,
  },
  punchHole: {
    width: 38,
    height: 8,
    borderRadius: 4,
    marginBottom: 12,
  },
  photoBorderBox: {
    width: '100%',
    height: 170,
    borderWidth: 1.2,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: '#f1f5f9',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  barcodeWrapper: {
    width: '100%',
    alignItems: 'center',
    marginTop: 8,
  },

  // ── Center / Right Column ──
  contentColumn: {
    flex: 1,
    justifyContent: 'center',
  },
  headlineRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: -2,
  },
  helloText: {
    fontSize: 46,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  nameIsText: {
    fontSize: 38,
    fontWeight: '400',
    letterSpacing: -0.3,
  },
  nameText: {
    fontSize: 62,
    fontWeight: '900',
    letterSpacing: -1.2,
    marginBottom: 20,
    marginTop: -4,
  },
  bioText: {
    fontSize: 16,
    lineHeight: 28,
    letterSpacing: 0.2,
    marginBottom: 24,
    maxWidth: 850,
  },
  boldText: {
    fontWeight: '800',
  },

  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  metaChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    gap: 6,
  },
  metaChipLabel: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  metaChipVal: {
    fontSize: 12,
    fontWeight: '600',
  },

  // ── Right-Edge Shape (PPT Slide Motif) ──
  rightEdgeShapeContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 32,
    pointerEvents: 'none',
  },
  rightEdgeUpper: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 10,
    height: '42%',
  },
  rightEdgeTab: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 32,
    height: '58%',
    borderTopLeftRadius: 28,
  },
});
