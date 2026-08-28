import { Stack } from 'expo-router';
import CalcProvider from './context/CalcContext';

export default function RootLayout() {

  return (
    <CalcProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="settings" options={{ headerShown: false }} />
      </Stack>
    </CalcProvider>
  );
}
