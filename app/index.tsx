import React from 'react';
import { useFonts } from 'expo-font';
import Calculator from './components/Calculator';
import { ActivityIndicator, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CalculatorKeyboard() {
  const [fontsLoaded] = useFonts({
    'Orbitron-Regular': require('@/assets/fonts/Orbitron/Orbitron-Regular.ttf'),
    'Orbitron-Bold': require('@/assets/fonts/Orbitron/Orbitron-Bold.ttf'),
    'RobotoMono-Medium': require('@/assets/fonts/Roboto_Mono/RobotoMono-Medium.ttf'),
    ...Ionicons.font,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Calculator />
  );
}
