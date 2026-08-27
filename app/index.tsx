import React from 'react';
import { useFonts } from 'expo-font';
import Calculator from './components/Calculator';
import { CalcProvider } from './context/CalcContext';

export default function CalculatorKeyboard() {
  const [fontsLoaded] = useFonts({
    'Orbitron-Regular': require('@/assets/fonts/Orbitron/Orbitron-Regular.ttf'),
    'Orbitron-Bold': require('@/assets/fonts/Orbitron/Orbitron-Bold.ttf'),
    'RobotoMono-Medium': require('@/assets/fonts/Roboto_Mono/RobotoMono-Medium.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <CalcProvider>
      <Calculator />
    </CalcProvider>
  );
}
