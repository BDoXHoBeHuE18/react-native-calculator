import { StyleSheet, View } from "react-native";
import CalcButton from "./CalcButton";
import Colors from "../constants/colors";
import { Ionicons } from '@expo/vector-icons';
import {
    ButtonWidthHeight,
    CONTAINER_PADDING,
    ROW_GAP,
    ROW_PADDING,
} from '../constants/ScreenConfig'

const keyboardRows = [
    ['SETTINGS', '√', 'C', '⌫'],
    ['AC', '±', '%', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '='],
];

export default function Keyboard() {
    return (
        <View style={styles.keyboard}>
            {keyboardRows.map((row, index) => (
                <View style={styles.row} key={index}>
                    {row.map((button) => (
                        <CalcButton
                            key={button}
                            text={button}
                            color={!['+', '-', '×', '÷', '='].includes(button) ? Colors.white : Colors.pink}
                            textColor={!['+', '-', '×', '÷', '='].includes(button) ? Colors.numberButtonText : Colors.operationButtonText}
                            width={ !['0'].includes(button) ? ButtonWidthHeight : 2 * ButtonWidthHeight + ROW_GAP}
                            height={ButtonWidthHeight} />
                    ))}
                </View>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    keyboard: {
        paddingVertical: CONTAINER_PADDING,
    },
    row: {
        flexDirection: "row",
        gap: ROW_GAP,
        paddingVertical: 2.5 * ROW_PADDING
    },
})