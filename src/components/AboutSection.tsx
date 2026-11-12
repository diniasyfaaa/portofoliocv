import { Text, StyleSheet } from 'react-native';
import SectionCard from './SectionCard';
import { useTheme } from '../context/ThemeContext';

// ──────────────────────────────────────────────
//  PROPS
// ──────────────────────────────────────────────
type AboutSectionProps = {
  deskripsi: string;
};

// ──────────────────────────────────────────────
//  COMPONENT
// ──────────────────────────────────────────────
export default function AboutSection({ deskripsi }: AboutSectionProps) {
  const theme = useTheme();

  return (
    <SectionCard title="Tentang Saya">
      <Text style={[styles.body, { color: theme.text }]}>{deskripsi}</Text>
    </SectionCard>
  );
}

// ──────────────────────────────────────────────
//  STYLES
// ──────────────────────────────────────────────
const styles = StyleSheet.create({
  body: {
    fontSize: 14,
    lineHeight: 23,
    textAlign: 'left',
  },
});
