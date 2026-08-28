import { useContext } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CalcContext, CalcProvider } from "./context/CalcContext";
import Switcher from "./components/Switcher";
import Colors from "./constants/colors";
import { WindowWidth } from "./constants/ScreenConfig";
import CalcButton from "./components/CalcButton";
import { useRouter } from "expo-router";

export default function SettingsScreen() {
    const router = useRouter()

    const { isValue0Visible, setIsValue0Visible,
        isValue1Visible, setIsValue1Visible,
        isLastOperationVisible, setIsLastOperationVisible,
        isResultVisible, setIsResultVisible
    } = useContext(CalcContext)

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.settngPanel}>
                <Text style={styles.title}>SETTINGS</Text>

                <Switcher title="value-0" param={isValue0Visible} func={setIsValue0Visible} />
                <Switcher title="value-1" param={isValue1Visible} func={setIsValue1Visible} />
                <Switcher title="operation" param={isLastOperationVisible} func={setIsLastOperationVisible} />
                <Switcher title="result" param={isResultVisible} func={setIsResultVisible} />
            </View>

            <CalcButton
                width={WindowWidth * 0.75}
                height={70}
                text="close"
                color={Colors.gray}
                textColor={Colors.lightGray}
                onPress={() => router.back()}
                style={{marginTop: 24}}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.lightGray,
    },
    settngPanel: {
        padding: WindowWidth * 0.075,
        backgroundColor: Colors.monitor,
        borderRadius: 6,
        gap: 24,
        boxShadow: `inset 0px 0px 15px 7px ${Colors.buttonBottomShadow}`,
    },
    title: {
        fontSize: 42,
        fontFamily: "Orbitron-Regular",
        textAlign: "center",
        color: Colors.monitorText
    }
})