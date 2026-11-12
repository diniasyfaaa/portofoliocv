import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { router, usePathname } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { useCVData } from '../../context/CVContext';

const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Skills', path: '/skills' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'My Score', path: '/score' },
  { label: 'Contact', path: '/contact' },
];

export default function DesktopNavbar() {
  const theme = useTheme();
  const pathname = usePathname();
  const { isErrorSimulationActive, toggleErrorSimulation } = useCVData();

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/' || pathname === '';
    return pathname.startsWith(path);
  };

  return (
    <View
      style={[
        styles.navbar,
        {
          backgroundColor: theme.isDark ? '#0d0d10' : '#ffffff',
          borderBottomColor: theme.cardBorder,
        },
      ]}
      accessible={true}
      accessibilityRole="header"
    >
      {/* Brand & Identity */}
      <Pressable
        style={styles.brand}
        onPress={() => router.push('/')}
        accessibilityRole="link"
        accessibilityLabel="Kembali ke Beranda"
      >
        <Text style={[styles.brandTitle, { color: theme.text }]}>Dini Asyfa</Text>
        <Text style={[styles.brandSubtitle, { color: theme.textMuted }]}>
          Personal CV & Portfolio
        </Text>
      </Pressable>

      {/* Nav Links */}
      <View style={styles.navLinks} accessibilityRole="menubar">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.path);
          return (
            <TouchableOpacity
              key={item.path}
              style={[
                styles.navItem,
                active && [
                  styles.navItemActive,
                  { backgroundColor: theme.isDark ? '#1f1f23' : '#f4f4f5' },
                ],
              ]}
              onPress={() => router.push(item.path as unknown as never)}
              activeOpacity={0.7}
              accessibilityRole="tab"
              accessibilityState={{ selected: active }}
              accessibilityLabel={`Menu ${item.label}`}
            >
              <Text
                style={[
                  styles.navItemText,
                  { color: active ? theme.text : theme.textMuted },
                  active && styles.navItemTextActive,
                ]}
              >
                {item.label}
              </Text>
              {active && (
                <View
                  style={[
                    styles.activeIndicator,
                    { backgroundColor: theme.text },
                  ]}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Actions: Error Simulation Toggle & Theme Switcher */}
      <View style={styles.actions}>
        {/* Industry testing helper button: toggle simulated error */}
        <TouchableOpacity
          style={[
            styles.simToggleBtn,
            {
              borderColor: isErrorSimulationActive ? '#ef4444' : theme.cardBorder,
              backgroundColor: isErrorSimulationActive
                ? 'rgba(239, 68, 68, 0.12)'
                : theme.surface,
            },
          ]}
          onPress={toggleErrorSimulation}
          activeOpacity={0.75}
          accessibilityRole="button"
          accessibilityLabel="Toggle simulasi error"
          accessibilityHint="Gunakan untuk menguji kondisi error state dan penanganan kesalahan"
        >
          <Text
            style={[
              styles.simToggleText,
              { color: isErrorSimulationActive ? '#ef4444' : theme.textMuted },
            ]}
          >
            {isErrorSimulationActive ? '⚠ Error Mode: ON' : '⚡ Test Error'}
          </Text>
        </TouchableOpacity>

        {/* Theme Mode Toggle */}
        <TouchableOpacity
          style={[
            styles.themeBtn,
            { backgroundColor: theme.surface, borderColor: theme.cardBorder },
          ]}
          onPress={theme.toggle}
          activeOpacity={0.75}
          accessibilityRole="button"
          accessibilityLabel="Ganti tema warna"
        >
          <Text style={[styles.themeBtnText, { color: theme.text }]}>
            {theme.isDark ? '☀️ Light' : '🌙 Dark'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 48,
    paddingVertical: 14,
    borderBottomWidth: 1,
    zIndex: 100,
  },
  brand: {
    flexDirection: 'column',
    cursor: 'pointer',
  },
  brandTitle: {
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  brandSubtitle: {
    fontSize: 11,
    fontWeight: '500',
    marginTop: 1,
  },
  navLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  navItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    position: 'relative',
    alignItems: 'center',
  },
  navItemActive: {},
  navItemText: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  navItemTextActive: {
    fontWeight: '800',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -2,
    width: 20,
    height: 2.5,
    borderRadius: 2,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  simToggleBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  simToggleText: {
    fontSize: 11,
    fontWeight: '700',
  },
  themeBtn: {
    borderRadius: 20,
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  themeBtnText: {
    fontSize: 12,
    fontWeight: '700',
  },
});
