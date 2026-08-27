import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar, Dimensions, ScrollView, useWindowDimensions } from 'react-native';
import Colors from './constants/colors';
import CalcButton from './components/CalcButton';
import { useFonts } from 'expo-font';

const CONTAINER_PADDING = 15
const ROW_PADDING = 5
const ROW_GAP = 10

export default function CalculatorKeyboard() {
  const { width, height } = useWindowDimensions();
  const [firstValue, setFirstValue] = useState(0)
  const [secondValue, setSecondValue] = useState(0)

  const [fontsLoaded] = useFonts({
    'Orbitron-Regular': require('@/assets/fonts/Orbitron/Orbitron-Regular.ttf'),
    'Orbitron-Bold': require('@/assets/fonts/Orbitron/Orbitron-Bold.ttf'),
  });

  // Если шрифты еще не готовы, возвращаем пустой экран, чтобы избежать ошибок рендеринга
  if (!fontsLoaded) {
    return null;
  }

  const ButtonWidthHeight = (width - 2 * CONTAINER_PADDING - 3 * ROW_GAP) / 4

  const keyboardRows = [
    ['AC', '+/-', '%', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '='],
  ];

  return (
    <View style={styles.container}>
      <View style={styles.monitor}>

      </View>
      <View style={styles.keyboard}>
        {keyboardRows.map((row, index) => (
          <View style={styles.row} key={index}>
            {row.map((button) => (
              <CalcButton
                key={button}
                text={button}
                color={!['+', '-', '×', '÷', '='].includes(button) ? Colors.white : Colors.pink}
                textColor={!['+', '-', '×', '÷', '='].includes(button) ? Colors.numberButtonText : Colors.operationButtonText}
                width={button !== '0' ? ButtonWidthHeight : 2 * ButtonWidthHeight + ROW_GAP}
                height={ButtonWidthHeight} />
            ))}
          </View>
        ))}
      </View>
      <StatusBar barStyle="dark-content" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: Colors.lightGray,
    paddingHorizontal: CONTAINER_PADDING,
  },
  row: {
    flexDirection: "row",
    gap: ROW_GAP,
    paddingVertical: 2.5*ROW_PADDING
  },
  monitor: {
    flex: 1,
    backgroundColor: Colors.monitor,
    borderRadius: 12
  },
  keyboard: {
    paddingVertical: CONTAINER_PADDING
  }
});
