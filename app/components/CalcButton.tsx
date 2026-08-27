import { Pressable, PressableProps, StyleSheet, Text, Dimensions, View } from 'react-native';
import Colors from '../constants/colors';
import { useContext } from 'react';
import { CalcContext } from '../context/CalcContext';
import { MAX_CURRENT_VALUE_LENGTH } from '../constants/ScreenConfig';
import { useFonts } from 'expo-font';

interface CalcButtonProps extends PressableProps {
    children?: React.ReactNode,
    color?: string,
    text: string,
    flex?: number,
    width: number,
    height: number,
    textColor: string,
}

const CalcButton = ({ children, style, color, textColor, width, height, text, ...props }: CalcButtonProps) => {
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

        if (cleanStr.length > MAX_CURRENT_VALUE_LENGTH) {
            cleanStr = result.toExponential(MAX_CURRENT_VALUE_LENGTH - 6);
        }
        return cleanStr;
    }


    const { firstValue, setFirstValue,
        secondValue, setSecondValue,
        resultValue, setResultValue,
        currentValue, setCurrentValue,
        lastOperationValue, setLastOperationValue,
        isResult, setIsResult,
        isPercented, setIsPercented
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
            return

        if (isPercented)
            setIsPercented(false)
        
        if (text === 'AC') {
            clearAllStates()
        } else if (text === 'C')
            setCurrentValue('0')

        const value: string = currentValue

        if (text === '⌫') {
            if (isResult)
            {
                clearAllStates()
                setIsResult(false)
                return
            }

            let newValue = value.slice(0, value.length - 1)
            if (['', '-'].includes(newValue))
                newValue = '0'
            setCurrentValue(newValue)
        }

        if (text === '±') {
            if (value[0] !== '-')
                setCurrentValue('-' + value)
            else setCurrentValue(value.slice(1))
        }


        if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].includes(text)) {
            if (isResult) {
                setCurrentValue(text)
                setIsResult(false)
                return
            }

            if (value === '0')
                setCurrentValue(text)
            else if (value.length <= MAX_CURRENT_VALUE_LENGTH)
                setCurrentValue(value + text)
        }


        else if (text === '.' && !value.includes('.') && value.length < MAX_CURRENT_VALUE_LENGTH) {
            setCurrentValue(value + '.')
            if (isResult) {
                clearAllStates()
                setIsResult(false)
            }
        }

        else if (['+', '-', '÷', '×'].includes(text)) {
            if (!isResult) {
                if (firstValue === null) {
                    setFirstValue(value)
                    setCurrentValue('0')
                }
                else if (value !== '0'){
                    let val1 = resultValue !== null ? parseFloat(resultValue) : parseFloat(firstValue)
                    let val2 = parseFloat(value)
                    let result = getResultOperation(val1, val2)
                    setCurrentValue(result.slice(0, MAX_CURRENT_VALUE_LENGTH - 1))
                    setResultValue(result.slice(0, MAX_CURRENT_VALUE_LENGTH - 1))
                    setFirstValue(val1)
                    setSecondValue(val2)
                    setIsResult(true)
                }
            }
            setLastOperationValue(text)
        } else if (text === '=' && firstValue !== null) {
            let val1 = 0, val2 = 0, result = '0'
            if (isResult) {
                val1 = parseFloat(value)
                val2 = parseFloat(secondValue)
                result = getResultOperation(val1, val2)
            } else {
                val1 = resultValue !== null ? parseFloat(resultValue) : parseFloat(firstValue)
                val2 = parseFloat(value)
                result = getResultOperation(val1, val2)
            }
            setCurrentValue(result)
            setResultValue(result)
            setFirstValue(val1)
            setSecondValue(val2)
            setIsResult(true)
        }

        else if (text === '%' && firstValue !== null) {
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
            setIsResult(true)
            setIsPercented(true)
        }
    }

    return (

        <Pressable
            onPress={buttonClick}
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
            <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.1}
                style={[styles.text, { color: textColor }]}>{text}</Text>
            {children}
        </Pressable >

    )
}

const styles = StyleSheet.create({
    button: {
        justifyContent: "center",
        borderRadius: 12,
        borderLeftWidth: 1,
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderColor: Colors.gray,
        paddingHorizontal: 2
    },
    buttonNotPressed: {
        boxShadow: `inset 0px -8px 0px ${Colors.buttonBottomShadow}, inset 0px 6px 0px ${Colors.buttonTopShadow}`,
        paddingTop: 6,
        paddingBottom: 8,
    },
    buttonPressed: {
        boxShadow: `inset 0px -5px 0px ${Colors.buttonBottomShadow}, inset 0px 4px 0px ${Colors.buttonTopShadow}`,
        paddingTop: 5,
        paddingBottom: 4,
    },
    text: {
        fontFamily: "Orbitron-Regular",
        textAlign: "center",
        fontSize: 32,
    },
})

export default CalcButton