import { StyleSheet, View } from "react-native";
import Colors from "../constants/colors";
import {
    ButtonWidth,
    ButtonHeight,
    CONTAINER_PADDING,
    KeyboardHeight,
    ROW_GAP,
    ROW_PADDING,
} from '../constants/ScreenConfig'
import { memo } from "react";
import CalcButton from "./CalcButton";

const keyboardRows = [
    ['SETTINGS', '√', 'C', '⌫'],
    ['AC', '±', '%', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '='],
];

function Keyboard() {
    return (
        <View style={styles.keyboard}>
            {keyboardRows.map((row, index) => (
                <View style={styles.row} key={index}>
                    {row.map((button) => (
                        <CalcButton
                            key={button}
                            text={button}
                            color={!['+', '-', '×', '÷', '='].includes(button) ? Colors.commonButtonColor : Colors.operationButtonColor}
                            textColor={!['+', '-', '×', '÷', '='].includes(button) ? Colors.numberButtonText : Colors.operationButtonText}
                            width={ !['0'].includes(button) ? ButtonWidth : 2 * ButtonWidth + ROW_GAP}
                            height={ButtonHeight}  
                        />
                    ))}
                </View>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    keyboard: {
        paddingVertical: CONTAINER_PADDING,
        height: KeyboardHeight,
    },
    row: {
        flexDirection: "row",
        gap: ROW_GAP,
        paddingVertical: 2.5 * ROW_PADDING
    },
})

export default memo(Keyboard)