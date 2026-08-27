import { Pressable, PressableProps, StyleSheet, Text, Dimensions, View } from 'react-native';
import Colors from '../constants/colors';

interface CalcButtonProps extends PressableProps {
    children?: React.ReactNode,
    color?: string,
    text: string,
    flex?: number,
    width: number,
    height: number,
    textColor: string,
    //добавить реф на скрин с результатом
}

const CalcButton = ({ children, style, color, textColor, width, height, text, ...props }: CalcButtonProps) => {
    const buttonClick = () => {
        switch (text) {
            case "+": ; break;
            case "-": ; break;
            case "/": ; break;
            case "*": ; break;
            case "ac": ; break;
            case "+-": ; break;
            case "%": ; break;
            case "=": ; break;
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
                <Text style={[styles.text, {color: textColor}]}>{text}</Text>
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
        fontSize: 32
    },
})

export default CalcButton