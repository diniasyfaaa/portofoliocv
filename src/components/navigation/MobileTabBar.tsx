import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router, usePathname } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';

const MOBILE_TABS = [
  { label: 'Home', icon: '🏠', path: '/' },
  { label: 'About', icon: '👤', path: '/about' },
  { label: 'Skills', icon: '⚡', path: '/skills' },
  { label: 'Portfolio', icon: '💼', path: '/portfolio' },
  { label: 'Score', icon: '📊', path: '/score' },
  { label: 'Contact', icon: '✉', path: '/contact' },
];

export default function MobileTabBar() {
  const theme = useTheme();
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/' || pathname === '';
    return pathname.startsWith(path);
  };

  return (
    <View
      style={[
        styles.tabBar,
        {
          backgroundColor: theme.isDark ? '#121215' : '#ffffff',
          borderTopColor: theme.cardBorder,
        },
      ]}
      accessible={true}
      accessibilityRole="tablist"
    >
      {MOBILE_TABS.map((tab) => {
        const active = isActive(tab.path);
        return (
          <TouchableOpacity
            key={tab.path}
            style={styles.tabItem}
            onPress={() => router.push(tab.path as unknown as never)}
            activeOpacity={0.7}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            accessibilityLabel={`Navigasi ke ${tab.label}`}
          >
            <Text style={[styles.tabIcon, active && styles.tabIconActive]}>
              {tab.icon}
            </Text>
            <Text
              style={[
                styles.tabLabel,
                { color: active ? theme.text : theme.textMuted },
                active && styles.tabLabelActive,
              ]}
              numberOfLines={1}
            >
              {tab.label}
            </Text>
            {active && (
              <View
                style={[
                  styles.activeDot,
                  { backgroundColor: theme.text },
                ]}
              />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 8,
    paddingBottom: 14,
    borderTopWidth: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  tabIcon: {
    fontSize: 18,
    marginBottom: 2,
    opacity: 0.7,
  },
  tabIconActive: {
    opacity: 1,
    transform: [{ scale: 1.15 }],
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  tabLabelActive: {
    fontWeight: '800',
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginTop: 3,
  },
});
