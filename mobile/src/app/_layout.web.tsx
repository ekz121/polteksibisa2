import '../safe-area.css';

import { Stack } from 'expo-router';

import { colors } from '@/constants/theme';

export { ErrorBoundary } from 'expo-router';

export default function WebLayout() {
  return (
    <div className="polteksibisa-safe-area">
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}>
        <Stack.Screen name="index" options={{ title: 'Beranda | Polteksibisa' }} />
      </Stack>
    </div>
  );
}
