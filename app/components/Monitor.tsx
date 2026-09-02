import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../constants/colors";
import { CalcContext } from "../context/CalcContext";
import { CONTAINER_PADDING, MonitorHeight, WindowWidth } from "../constants/ScreenConfig";

export default function Monitor() {

    const BASIC_FONT_SIZE = 14
    const MIN_FONT_SIZE = 8
    const CHAR_WIDTH_RATIO = 0.6

    const { firstValue,
        secondValue,
        currentValue,
        lastOperationValue,
        resultValue,
        isPercented,
        isValue0Visible,
        isValue1Visible,
        isLastOperationVisible,
        isResultVisible,
    } = useContext(CalcContext)

    const getFontSize = (text: string | null, basicSize = BASIC_FONT_SIZE) => {
        if (text === null) return basicSize
        const availableWidth = WindowWidth - CONTAINER_PADDING * 2 - 150;
        const textLength = text.length;
        
        if (textLength <= 3) return basicSize;
        
        const neededSize = availableWidth / (textLength * CHAR_WIDTH_RATIO);
        
        const finalSize = Math.max(MIN_FONT_SIZE, Math.min(basicSize, neededSize));
        return finalSize
    }

    return (
        <View style={styles.monitor}>
            <View style={styles.monitorVariables}>
                <Text numberOfLines={1} style={[styles.monitorText, { opacity: isValue0Visible ? 1 : 0, fontSize: getFontSize(firstValue) }]}>value-0: {firstValue ?? 'no'}</Text>

                <Text numberOfLines={1} style={[styles.monitorText, { opacity: isLastOperationVisible ? 1 : 0}]}>operation: {lastOperationValue ?? 'no'}</Text>
            </View>
            <View style={styles.monitorCurrent}>
                <Text
                    numberOfLines={1}
                    style={[styles.monitorCurrentText, { fontSize: getFontSize(currentValue, 72) }]}
                >
                    {currentValue}
                </Text>
            </View>
            <View style={styles.monitorVariables}>
                <Text numberOfLines={1} style={[styles.monitorText, { opacity: isValue1Visible ? 1 : 0, fontSize: getFontSize(secondValue) }]}>value-1: {secondValue ?? 'no'}</Text>
                {isPercented && <Text numberOfLines={1} style={styles.monitorText}>%</Text>}
                <Text numberOfLines={1} style={[styles.monitorText, { opacity: isResultVisible ? 1 : 0, fontSize: getFontSize(resultValue) }]}>result: {resultValue ?? 'no'}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    monitor: {
        width: WindowWidth - 2 * CONTAINER_PADDING,
        height: MonitorHeight,
        boxShadow: `inset 0px 0px 15px 7px ${Colors.buttonBottomShadow}`,
        backgroundColor: Colors.monitor,
        borderRadius: 12,
        justifyContent: "space-between",
        flexDirection: "column",
        overflow: "hidden"
    },
    monitorVariables: {
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        paddingHorizontal: 12,
        paddingVertical: 6
    },
    monitorText: {
        color: Colors.monitorText,
        fontFamily: "RobotoMono-Medium",
    },
    monitorCurrent: {
        justifyContent: "center",
        alignItems: "flex-end",
    },
    monitorCurrentText: {
        color: Colors.monitorText,
        fontFamily: 'Orbitron-Regular',
        paddingHorizontal: 9,
        textAlign: "right"
    },
})