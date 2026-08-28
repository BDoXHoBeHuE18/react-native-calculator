import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CalcContext = createContext<any>(null)

interface CalcProviderProps {
    children: ReactNode;
}

const STORAGE_KEY = '@settings_states'
export const CalcProvider = ({ children }: CalcProviderProps) => {
    const [firstValue, setFirstValue] = useState(null)
    const [secondValue, setSecondValue] = useState(null)
    const [resultValue, setResultValue] = useState(null)
    const [currentValue, setCurrentValue] = useState('0')
    const [lastOperationValue, setLastOperationValue] = useState(null)
    const [isInterimResult, setIsInterimResult] = useState(false)
    const [isFinalResult, setIsFinalResult] = useState(false)
    const [isPercented, setIsPercented] = useState(false)

    const [isValue0Visible, setIsValue0Visible] = useState(true)
    const [isValue1Visible, setIsValue1Visible] = useState(true)
    const [isLastOperationVisible, setIsLastOperationVisible] = useState(true)
    const [isResultVisible, setIsResultVisible] = useState(true)

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
        isResultVisible, setIsResultVisible,
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