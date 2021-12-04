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
    },
    mainTitle: {
        marginVertical: 10,
        fontSize: 20,
        fontWeight: 'bold'
    },
    mainTitlelight: {
        color: '#000000'
    },
    mainTitledark: {
        color: '#ffffff'
    },
    textInputContainer: {
        width: '100%',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 10,
        marginTop: 10
    },
    textInputContainerlight: {
        backgroundColor: lightTheme.boxes
    },
    textInputContainerdark: {
        backgroundColor: darkTheme.boxes
    },
    textInput: {
        textAlign: 'right'
    },
    textInputlight: {
        color: lightTheme.text
    },
    textInputdark: {
        color: darkTheme.text
    },
    radioForm: {
        marginTop: 10,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        height: 35,
        marginTop: 10
    },
    buttonlight: {
        backgroundColor: lightTheme.boxes,
    },
    buttondark: {
        backgroundColor: darkTheme.boxes,
    },
    textlight: {
        color: lightTheme.text
    },
    textdark: {
        color: darkTheme.text
    },
    error: {
        color: '#eb5030'
    }
});