import { ReactNode } from "react";
import { StyleSheet, Switch, Text, View, ViewProps } from "react-native";
import Colors from "../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { WindowWidth } from "../constants/ScreenConfig";
import CalcButton from "./CalcButton";

interface SwitcherProps extends ViewProps {
    children?: ReactNode,
    param: boolean,
    func: Function,
    title: string,
}

export default function Switcher({children, param, func, title} : SwitcherProps) {
    return (
            <CalcButton
                color={param ? Colors.numberButtonText : Colors.monitor}
                width={WindowWidth * 0.75}
                height={70}
                text={title}
                textColor={Colors.monitorText}
                onPress={() => func(!param)}
            >
            {children}
            </CalcButton>
    )
}