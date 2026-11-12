import { Stack } from 'expo-router';
import { ThemeProvider } from '../context/ThemeContext';
import { CVProvider } from '../context/CVContext';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <CVProvider>
        <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="about" />
          <Stack.Screen name="skills" />
          <Stack.Screen name="portfolio" />
          <Stack.Screen name="score" />
          <Stack.Screen name="contact" />
        </Stack>
      </CVProvider>
    </ThemeProvider>
  );
}
