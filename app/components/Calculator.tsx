import { StyleSheet, View } from "react-native";
import Colors from "../constants/colors";
import { CONTAINER_PADDING } from "../constants/ScreenConfig";
import Monitor from "./Monitor";
import Keyboard from "./Keyboard";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Calculator() {
    return (
        <SafeAreaView style={styles.container}>
            <Monitor/>
            <Keyboard/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.lightGray,
        padding: CONTAINER_PADDING,
    },
})