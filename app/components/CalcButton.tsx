import { Pressable, PressableProps, StyleSheet, Text, Dimensions, View } from 'react-native';
import Colors from '../constants/colors';
import { useContext, useState } from 'react';
import { CalcContext } from '../context/CalcContext';
import { MAX_CURRENT_VALUE_LENGTH } from '../constants/ScreenConfig';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface CalcButtonProps extends PressableProps {
    children?: React.ReactNode,
    color?: string,
    text: string,
    width: number,
    height: number,
    textColor: string,
}

const CalcButton = ({ children, style, color, textColor, width, height, text, onPress, ...props }: CalcButtonProps) => {
    const router = useRouter()

    const getResultOperation = (val1: number, val2: number) => {
        let result = 0
        if (lastOperationValue === '+') {
            result = val1 + val2
        } else if (lastOperationValue === '-') {
            result = val1 - val2
        } else if (lastOperationValue === '÷') {
            result = val1 / val2
        } else if (lastOperationValue === '×') {
            result = val1 * val2
        }
        let cleanStr = parseFloat(result.toFixed(MAX_CURRENT_VALUE_LENGTH)).toString();
        return cleanStr;
    }

    const { firstValue, setFirstValue,
        secondValue, setSecondValue,
        resultValue, setResultValue,
        currentValue, setCurrentValue,
        lastOperationValue, setLastOperationValue,
        isPercented, setIsPercented,
        isFinalResult, setIsFinalResult,
        isInterimResult, setIsInterimResult,
    } = useContext(CalcContext)

    const clearAllStates = () => {
        setCurrentValue('0')
        setFirstValue(null)
        setLastOperationValue(null)
        setResultValue(null)
        setSecondValue(null)
    }

    const buttonClick = () => {
        if (text === 'SETTINGS')
            router.push('./settings')

        if (isPercented)
            setIsPercented(false)

        if (text === 'AC') {
            clearAllStates()
            return
        } else if (text === 'C') {
            if (!isInterimResult && !isFinalResult) setCurrentValue('0')
            else clearAllStates()
            return
        }

        const value: string = currentValue

        if (text === '⌫') {
            if (isInterimResult || isFinalResult) {
                clearAllStates()
                setIsInterimResult(false)
                setIsFinalResult(false)
                return
            }

            let newValue = value.slice(0, value.length - 1)
            if (['', '-'].includes(newValue))
                newValue = '0'
            setCurrentValue(newValue)
        }

        else if (text === '±') {
            if (value[0] !== '-')
                setCurrentValue('-' + value)
            else setCurrentValue(value.slice(1))
        }


        else if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(text)) {
            if (isFinalResult) {
                clearAllStates()
                setCurrentValue(text)
                setIsFinalResult(false)
                return
            }


            if (isInterimResult) {
                setCurrentValue(text)
                setIsInterimResult(false)
                return
            }

            if (value === '0')
                setCurrentValue(text)
            else if (value.length <= MAX_CURRENT_VALUE_LENGTH)
                setCurrentValue(value + text)
        }


        else if (text === '.' && !value.includes('.') && value.length < MAX_CURRENT_VALUE_LENGTH) {
            setCurrentValue(value + '.')
            if (isInterimResult || isFinalResult) {
                clearAllStates()
                setIsInterimResult(false)
                setIsFinalResult(false)
            }
        }

        else if (['+', '-', '÷', '×'].includes(text)) {
            const originallyWasFinal = isFinalResult;

            if (!isInterimResult) {
                if (firstValue === null) {
                    setFirstValue(value);
                    setCurrentValue('0');
                } else if (value !== '0' && !originallyWasFinal) {
                    let val1 = resultValue !== null ? parseFloat(resultValue) : parseFloat(firstValue);
                    let val2 = parseFloat(value);
                    let result = getResultOperation(val1, val2);
                    setCurrentValue(result);
                    setResultValue(result);
                    setFirstValue(val1);
                    setSecondValue(val2);
                    setIsInterimResult(true);
                }

                if (originallyWasFinal) {
                    setIsInterimResult(true);
                    setIsFinalResult(false);
                }
                setLastOperationValue(text);
                return;
            }

            if (isFinalResult) {
                setIsInterimResult(true)
                setIsFinalResult(false)
            }
            setLastOperationValue(text)

        }

        else if (text === '=' && firstValue !== null) {
            let val1 = 0, val2 = 0, result = '0'
            if (isInterimResult || isFinalResult) {
                val1 = parseFloat(value)
                val2 = parseFloat(secondValue)
                result = getResultOperation(val1, val2)
                setIsInterimResult(false)
                setIsFinalResult(false)
            } else {
                val1 = resultValue !== null ? parseFloat(resultValue) : parseFloat(firstValue)
                val2 = parseFloat(value)
                result = getResultOperation(val1, val2)
            }
            setCurrentValue(result)
            setResultValue(result)
            setFirstValue(val1)
            setSecondValue(val2)
            setIsFinalResult(true)
        }

        else if (text === '%' && firstValue !== null) {
            if (isInterimResult)
                setIsInterimResult(false)

            let val1 = resultValue ? parseFloat(resultValue) : parseFloat(firstValue)
            let val2 = parseFloat(value)
            let result = 0
            if (lastOperationValue === '+')
                result = val1 + val2 / 100 * val1
            else if (lastOperationValue === '-')
                result = val1 - val2 / 100 * val1
            else if (lastOperationValue === '×')
                result = val2 / 100 * val1
            else if (lastOperationValue === '÷')
                result = val1 / val2 * 100
            setCurrentValue(result)
            setResultValue(result)
            setFirstValue(val1)
            setSecondValue(val2)
            setIsInterimResult(true)
            setIsPercented(true)
        }

        else if (text === '√') {
            setIsFinalResult(false);
            setIsInterimResult(false);
            const num = parseFloat(value);
            if (num >= 0) {
                const rootResult = Math.sqrt(num);
                const cleanStr = parseFloat(rootResult.toFixed(MAX_CURRENT_VALUE_LENGTH - 1)).toString();
                setCurrentValue(cleanStr);
            } else {
                setCurrentValue('0'); // Защита от отрицательного корня
            }
        }
    }

    return (

        <Pressable
            onPress={onPress ?? buttonClick}
            style={({ pressed }) => {
                return (
                    [styles.button,
                    {
                        backgroundColor: color,
                        width: width,
                        height: height
                    },
                    typeof style === "object" ? style : {},
                    pressed ? styles.buttonPressed : styles.buttonNotPressed])
            }}
            {...props}>
            {text !== 'SETTINGS' && (
                <Text numberOfLines={1}
                    adjustsFontSizeToFit
                    minimumFontScale={0.9}
                    style={[styles.text, { color: textColor }]}>{text}</Text>)}
            {text === 'SETTINGS' && (
                <View  style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Ionicons name="settings-sharp" size={32} color={Colors.numberButtonText} />
                </View>)}
            {children}
        </Pressable >

    )
}

const styles = StyleSheet.create({
    button: {
        justifyContent: "center",
        borderRadius: 12,

        borderColor: Colors.buttonBottomShadow,
        paddingHorizontal: 2
    },
    buttonNotPressed: {
        boxShadow: `inset 0px -8px 0px ${Colors.buttonBottomShadow}`,
        borderTopWidth: 0,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderBottomWidth: 1,
        paddingBottom: 8,
    },
    buttonPressed: {
        boxShadow: ``,
        borderLeftWidth: 3,
        borderRightWidth: 3,
        borderTopWidth: 3,
        borderBottomWidth: 3,
        paddingBottom: 2,
    },
    text: {
        fontFamily: "Orbitron-Regular",
        textAlign: "center",
        fontSize: 32,
    },
})

export default CalcButton