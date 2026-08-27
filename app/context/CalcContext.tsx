import { createContext, ReactNode, useMemo, useState } from "react";

export const CalcContext = createContext<any>(null)

interface CalcProviderProps {
    children: ReactNode;
}

export const CalcProvider = ({ children } : CalcProviderProps) => {
    const [firstValue, setFirstValue] = useState(null)
    const [secondValue, setSecondValue] = useState(null)
    const [resultValue, setResultValue] = useState(null)
    const [currentValue, setCurrentValue] = useState('0')
    const [lastOperationValue, setLastOperationValue] = useState(null)
    const [isResult, setIsResult] = useState(false)
    const [isPercented, setIsPercented] = useState(false)

    const contextValue = useMemo(() => ({
        firstValue, setFirstValue,
        secondValue, setSecondValue,
        resultValue, setResultValue,
        currentValue, setCurrentValue,
        lastOperationValue, setLastOperationValue,
        isResult, setIsResult,
        isPercented, setIsPercented,
    }), [firstValue, secondValue, resultValue, currentValue, lastOperationValue, isResult, isPercented]);

    return (
        <CalcContext.Provider value={contextValue}>
            {children}
        </CalcContext.Provider>
    )
}