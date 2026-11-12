import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useResponsive } from '../../hooks/useResponsive';
import { useCVData } from '../../context/CVContext';
import DesktopNavbar from './DesktopNavbar';
import MobileTabBar from './MobileTabBar';
import LoadingSkeleton from '../common/LoadingSkeleton';
import ErrorState from '../common/ErrorState';

interface ScreenContainerProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  showBackButton?: boolean;
}

export default function ScreenContainer({
  title,
  subtitle,
  children,
}: ScreenContainerProps) {
  const theme = useTheme();
  const { isDesktop, isMobile } = useResponsive();
  const { loading, error, isErrorSimulationActive, toggleErrorSimulation } = useCVData();

  return (
    <View style={[styles.root, { backgroundColor: theme.bg }]}>
      <StatusBar
        barStyle={theme.isDark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.bg}
      />

      {/* ── Desktop Fixed Navbar ── */}
      {isDesktop && <DesktopNavbar />}

      {/* ── Scrollable Body ── */}
      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          isDesktop ? styles.scrollDesktop : styles.scrollMobile,
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Subtle architectural monochrome glow */}
        <View style={[styles.blob1, { backgroundColor: theme.bgBlob1 }]} />
        <View style={[styles.blob2, { backgroundColor: theme.bgBlob2 }]} />

        {/* ── Mobile Header ── */}
        {isMobile && (
          <View style={styles.mobileHeader}>
            <View style={styles.mobileTitleCol}>
              <Text style={[styles.mobileAppTitle, { color: theme.text }]}>
                {title || 'Portofolio'}
              </Text>
              {subtitle && (
                <Text style={[styles.mobileAppSubtitle, { color: theme.textMuted }]}>
                  {subtitle}
                </Text>
              )}
            </View>

            <View style={styles.mobileActions}>
              <TouchableOpacity
                style={[
                  styles.mobileSimBtn,
                  {
                    borderColor: isErrorSimulationActive ? '#ef4444' : theme.cardBorder,
                    backgroundColor: isErrorSimulationActive
                      ? 'rgba(239, 68, 68, 0.12)'
                      : theme.surface,
                  },
                ]}
                onPress={toggleErrorSimulation}
                accessibilityRole="button"
                accessibilityLabel="Test error"
              >
                <Text
                  style={[
                    styles.mobileSimText,
                    { color: isErrorSimulationActive ? '#ef4444' : theme.textMuted },
                  ]}
                >
                  {isErrorSimulationActive ? '⚠ Err' : '⚡'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.mobileThemeBtn,
                  { backgroundColor: theme.surface, borderColor: theme.cardBorder },
                ]}
                onPress={theme.toggle}
                accessibilityRole="button"
                accessibilityLabel="Ganti tema"
              >
                <Text style={[styles.mobileThemeText, { color: theme.text }]}>
                  {theme.isDark ? '☀️' : '🌙'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* ── Content States: Loading, Error, or Children ── */}
        {loading ? (
          <LoadingSkeleton />
        ) : error ? (
          <ErrorState message={error} />
        ) : (
          <View style={styles.content}>{children}</View>
        )}
      </ScrollView>

      {/* ── Mobile Bottom Navigation Bar ── */}
      {isMobile && <MobileTabBar />}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scroll: {
    width: '100%',
  },
  scrollDesktop: {
    paddingHorizontal: 48,
    paddingTop: 36,
    paddingBottom: 80,
    width: '100%',
  },
  scrollMobile: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 90, // extra bottom padding for bottom tab bar
    width: '100%',
  },

  // ── Blobs ──
  blob1: {
    position: 'absolute',
    width: 450,
    height: 450,
    borderRadius: 225,
    top: -120,
    right: -120,
    pointerEvents: 'none',
  },
  blob2: {
    position: 'absolute',
    width: 360,
    height: 360,
    borderRadius: 180,
    top: 700,
    left: -140,
    pointerEvents: 'none',
  },

  // ── Mobile Header ──
  mobileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 8,
  },
  mobileTitleCol: {
    flex: 1,
  },
  mobileAppTitle: {
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  mobileAppSubtitle: {
    fontSize: 12,
    letterSpacing: 0.2,
    marginTop: 2,
    fontWeight: '500',
  },
  mobileActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  mobileSimBtn: {
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  mobileSimText: {
    fontSize: 11,
    fontWeight: '700',
  },
  mobileThemeBtn: {
    borderRadius: 16,
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  mobileThemeText: {
    fontSize: 13,
  },

  // ── Main Content Container ──
  content: {
    width: '100%',
  },
});
