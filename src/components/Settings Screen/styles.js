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
        fontFamily: 'VarelaRound',
        marginVertical: 10,
        fontSize: 20,
    },
    mainTitlelight: {
        color: '#000000'
    },
    mainTitledark: {
        color: '#ffffff'
    },
    title: {
        fontSize: 17,
        marginBottom: 10,
    },
    titlelight: {
        color: lightTheme.title
    },
    titledark: {
        color: darkTheme.title
    },
    toggle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 10
    },
    divider: {
        width: '100%',
        height: 1,
        marginTop: 5,
        marginBottom: 15,
        borderRadius: 0.5
    },
    dividerlight: {
        backgroundColor: '#9e9e9e'
    },
    dividerdark: {
        backgroundColor: '#ffffff80'
    },
    textInputContainer: {
        width: '100%',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 10,
        marginTop: 15,
        marginBottom: 10
    },
    textInputContainerlight: {
        backgroundColor: lightTheme.boxes
    },
    textInputContainerdark: {
        backgroundColor: darkTheme.boxes
    },
    textInput: {
        fontFamily: 'VarelaRound',
        textAlign: 'right'
    },
    textInputlight: {
        color: lightTheme.text
    },
    textInputdark: {
        color: darkTheme.text
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        height: 35,
        marginBottom: 15
    },
    buttonlight: {
        backgroundColor: lightTheme.boxes,
    },
    buttondark: {
        backgroundColor: darkTheme.boxes,
    },
    textlight: {
        fontFamily: 'VarelaRound',
        color: lightTheme.text
    },
    textdark: {
        fontFamily: 'VarelaRound',
        color: darkTheme.text
    },
    contentContainerlight: {
        backgroundColor: lightTheme.background
    },
    contentContainerdark: {
        backgroundColor: darkTheme.background
    },
    titleStyle: {
        width: '100%',
        padding: 0,
        transform: [{ translateX: 15 }]
    },
    titleStylelight: {
        color: 'black'
    },
    titleStyledark: {
        color: 'white'
    },
    messageStylelight: {
        color: 'black'
    },
    messageStyledark: {
        color: 'white'
    },
    actionContainerStyle: {
        justifyContent: 'flex-end'
    }
});