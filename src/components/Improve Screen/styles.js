import { StyleSheet, Platform, StatusBar } from "react-native";
import { darkTheme, lightTheme } from "../../utils/Themes";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        paddingHorizontal: 15,
        paddingBottom: 10
    },
    containerlight: {
        backgroundColor: lightTheme.background
    },
    containerdark: {
        backgroundColor: darkTheme.background
    }
});