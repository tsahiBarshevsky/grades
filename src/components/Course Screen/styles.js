import { StyleSheet, Platform, StatusBar } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#181818',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    }
});