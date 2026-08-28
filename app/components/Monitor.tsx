import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../constants/colors";
import { CalcContext } from "../context/CalcContext";

export default function Monitor() {

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

    return (
        <View style={styles.monitor}>
            <View style={styles.monitorVariables}>
                <Text numberOfLines={1}
                    adjustsFontSizeToFit
                    minimumFontScale={0.9} style={[styles.monitorText, { opacity: isValue0Visible ? 1 : 0 }]}>value-0: {firstValue ?? 'no'}</Text>

                <Text numberOfLines={1}
                    adjustsFontSizeToFit
                    minimumFontScale={0.9} style={[styles.monitorText, { opacity: isLastOperationVisible ? 1 : 0 }]}>operation: {lastOperationValue ?? 'no'}</Text>
            </View>
            <View style={styles.monitorCurrent}>
                <Text
                    numberOfLines={1}
                    adjustsFontSizeToFit
                    minimumFontScale={0.9}
                    style={styles.monitorCurrentText}
                >
                    {currentValue}
                </Text>
            </View>
            <View style={styles.monitorVariables}>
                <Text numberOfLines={1}
                    adjustsFontSizeToFit
                    minimumFontScale={0.9} style={[styles.monitorText, { opacity: isValue1Visible ? 1 : 0 }]}>value-1: {secondValue ?? 'no'}</Text>
                {isPercented && <Text numberOfLines={1}
                    adjustsFontSizeToFit
                    minimumFontScale={0.9} style={styles.monitorText}>%</Text>}
                <Text numberOfLines={1}
                    adjustsFontSizeToFit
                    minimumFontScale={0.9} style={[styles.monitorText, { opacity: isResultVisible ? 1 : 0 }]}>result: {resultValue ?? 'no'}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    monitor: {
        flex: 1,
        boxShadow: `inset 0px 0px 15px 7px ${Colors.buttonBottomShadow}`,
        backgroundColor: Colors.monitor,
        borderRadius: 12,
        justifyContent: "space-between",
        flexDirection: "column",
    },
    monitorVariables: {
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        padding: 12,
    },
    monitorText: {
        color: Colors.monitorText,
        fontFamily: "RobotoMono-Medium",
        fontSize: 14,
        maxWidth: "45%"
    },
    monitorCurrent: {
        justifyContent: "center",
        alignItems: "flex-end",
    },
    monitorCurrentText: {
        color: Colors.monitorText,
        fontFamily: 'Orbitron-Regular',
        paddingHorizontal: 9,
        fontSize: 72,
        textAlign: "right"
    },
})