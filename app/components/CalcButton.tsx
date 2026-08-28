import { Pressable, PressableProps, StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/colors';
import { useContext, memo, useCallback } from 'react';
import { CalcContext } from '../context/CalcContext';
import { Ionicons } from '@expo/vector-icons';

export interface CalcButtonProps extends PressableProps {
    children?: React.ReactNode,
    color?: string,
    text: string,
    width: number,
    height: number,
    textColor: string,
    onPress?: () => void
}

const CalcButton = ({ children, style, color, textColor, width, height, text, onPress, ...props }: CalcButtonProps) => {

    const { handleButtonClick } = useContext(CalcContext)

    const handlePress = useCallback(() => {
        if (onPress) {
            onPress(); // Если передан кастомный обработчик снаружи
        } else {
            handleButtonClick(text); // Поведение по умолчанию
        }
    }, [onPress, handleButtonClick, text]);

    return (


        <Pressable
            onPress={handlePress}
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
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
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

export default memo(CalcButton)