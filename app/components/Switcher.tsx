import { ReactNode } from "react";
import { ViewProps } from "react-native";
import Colors from "../constants/colors";
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
                color={param ? Colors.commonButtonColor : Colors.monitor}
                width={WindowWidth * 0.75}
                height={70}
                text={title}
                textColor={param ? Colors.settingsActiveButtonText : Colors.monitorText}
                onPress={() => func(!param)}
            >
            {children}
            </CalcButton>
    )
}