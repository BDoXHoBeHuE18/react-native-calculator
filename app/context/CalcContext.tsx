import { createContext, ReactNode, useEffect, useMemo, useReducer, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";
import { MAX_CURRENT_VALUE_LENGTH, ROUND_TO } from "../constants/ScreenConfig";
import { Big } from 'big.js'

export const CalcContext = createContext<any>(null)

interface CalcProviderProps {
    children: ReactNode;
}

const STORAGE_KEY = '@settings_states'
const CalcProvider = ({ children }: CalcProviderProps) => {

    const router = useRouter()

    const normalizeValue = (value: Big | number) => {
        const valueNum = typeof value === 'number' ? value : value.toNumber()
        const valueStr = valueNum.toString()
        if (valueStr.length > MAX_CURRENT_VALUE_LENGTH) {
            return valueNum.toExponential(ROUND_TO).toString()
        }
        return valueStr
    }

    const getResultOperation = (val1: Big, val2: Big, percentOperation = false) => {
        let result = new Big(0)

        if (percentOperation) {
            if (lastOperationValue === '+') {
                result = val1.plus(val1.mul(val2.div(100)))
            } else if (lastOperationValue === '-') {
                result = val1.minus(val1.mul(val2.div(100)))
            } else if (lastOperationValue === '÷') {
                result = val1.div(val2).mul(100)
            } else if (lastOperationValue === '×') {
                result = val2.div(100).mul(val1)
            }
        }

        else if (lastOperationValue === '+') {
            result = val1.plus(val2)
        } else if (lastOperationValue === '-') {
            result = val1.minus(val2)
        } else if (lastOperationValue === '÷') {
            result = val1.div(val2)
        } else if (lastOperationValue === '×') {
            result = val1.mul(val2)
        }
        return result
    }

    const clearAllStates = () => {
        setCurrentValue('0')
        setFirstValue(null)
        setLastOperationValue(null)
        setResultValue(null)
        setSecondValue(null)
    }

    const handleButtonClick = (text: string) => {
        if (text === 'SETTINGS')
            router.push('/settings')

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
            else if (value === '-0')
                setCurrentValue('-' + text)
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
                    let result = getResultOperation(Big(val1), Big(val2));
                    setCurrentValue(normalizeValue(Big(result)));
                    setResultValue(normalizeValue(result));
                    setFirstValue(normalizeValue(val1));
                    setSecondValue(normalizeValue(val2));
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
            let val1 = Big(0), val2 = Big(0), result = Big(0)
            if (isInterimResult || isFinalResult) {
                val1 = Big(value)
                val2 = Big(secondValue ?? '0')
                result = getResultOperation(Big(val1), Big(val2))
                setIsInterimResult(false)
                setIsFinalResult(false)
            } else {
                val1 = resultValue !== null ? Big(resultValue) : Big(firstValue)
                val2 = Big(value)
                result = getResultOperation(val1, val2)
            }
            setCurrentValue(normalizeValue(result))
            setResultValue(normalizeValue(result))
            setFirstValue(normalizeValue(val1))
            setSecondValue(normalizeValue(val2))
            setIsFinalResult(true)
        }

        else if (text === '%' && firstValue !== null) {
            if (isInterimResult)
                setIsInterimResult(false)

            let val1 = resultValue ? parseFloat(resultValue) : parseFloat(firstValue)
            let val2 = parseFloat(value)
            let result = getResultOperation(Big(val1), Big(val2), true)
            setCurrentValue(normalizeValue(result))
            setResultValue(normalizeValue(result))
            setFirstValue(normalizeValue(val1))
            setSecondValue(normalizeValue(val2))
            setIsInterimResult(true)
            setIsPercented(true)
        }

        else if (text === '√') {
            setIsFinalResult(false);
            setIsInterimResult(false);
            const num = parseFloat(value);
            if (num >= 0) {
                const rootResult = Math.sqrt(num);
                const cleanStr = normalizeValue(rootResult);
                setCurrentValue(cleanStr);
            } else {
                setCurrentValue('0');
            }
        }
    }

    const [firstValue, setFirstValue] = useState<string | null>(null)
    const [secondValue, setSecondValue] = useState<string | null>(null)
    const [resultValue, setResultValue] = useState<string | null>(null)
    const [currentValue, setCurrentValue] = useState('0')
    const [lastOperationValue, setLastOperationValue] = useState<string | null>(null)
    const [isInterimResult, setIsInterimResult] = useState<boolean>(false)
    const [isFinalResult, setIsFinalResult] = useState<boolean>(false)
    const [isPercented, setIsPercented] = useState<boolean>(false)

    const [isValue0Visible, setIsValue0Visible] = useState<boolean>(true)
    const [isValue1Visible, setIsValue1Visible] = useState<boolean>(true)
    const [isLastOperationVisible, setIsLastOperationVisible] = useState<boolean>(true)
    const [isResultVisible, setIsResultVisible] = useState<boolean>(true)

    const contextValue = useMemo(() => ({
        firstValue, setFirstValue,
        secondValue, setSecondValue,
        resultValue, setResultValue,
        currentValue, setCurrentValue,
        lastOperationValue, setLastOperationValue,
        isInterimResult, setIsInterimResult,
        isFinalResult, setIsFinalResult,
        isPercented, setIsPercented,
        isValue0Visible, setIsValue0Visible,
        isValue1Visible, setIsValue1Visible,
        isLastOperationVisible, setIsLastOperationVisible,
        isResultVisible, setIsResultVisible, handleButtonClick
    }),
        [firstValue, secondValue, resultValue, currentValue, lastOperationValue, isInterimResult, isFinalResult, isPercented,
            isValue0Visible, isValue1Visible, isLastOperationVisible, isResultVisible
        ]);


    useEffect(() => {
        const loadSettings = async () => {
            try {
                const savedSettings = await AsyncStorage.getItem(STORAGE_KEY);
                if (savedSettings !== null) {
                    const parsed = JSON.parse(savedSettings);

                    setIsValue0Visible(parsed.isValue0Visible ?? true);
                    setIsValue1Visible(parsed.isValue1Visible ?? true);
                    setIsLastOperationVisible(parsed.isLastOperationVisible ?? true);
                    setIsResultVisible(parsed.isResultVisible ?? true);
                }
            } catch (error) {
                console.error("Ошибка загрузки настроек калькулятора:", error);
            }
        };

        loadSettings();
    }, []);

    useEffect(() => {
        const saveSettings = async () => {
            try {
                const settingsToSave = {
                    isValue0Visible,
                    isValue1Visible,
                    isLastOperationVisible,
                    isResultVisible
                };
                await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(settingsToSave));
            } catch (error) {
                console.error("Ошибка сохранения настроек калькулятора:", error);
            }
        };

        saveSettings();
    }, [isValue0Visible, isValue1Visible, isLastOperationVisible, isResultVisible]);


    return (
        <CalcContext.Provider value={contextValue}>
            {children}
        </CalcContext.Provider>
    )
}

export default CalcProvider