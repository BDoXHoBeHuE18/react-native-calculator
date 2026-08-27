import { StatusBar, StyleSheet, View } from "react-native";
import Colors from "../constants/colors";
import { CONTAINER_PADDING } from "../constants/ScreenConfig";
import Monitor from "./Monitor";
import Keyboard from "./Keyboard";


export default function Calculator() {
    return (
        <View style={styles.container}>
            <Monitor/>
            <Keyboard/>
            <StatusBar barStyle="dark-content" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: Colors.lightGray,
        paddingHorizontal: CONTAINER_PADDING,
    },
})