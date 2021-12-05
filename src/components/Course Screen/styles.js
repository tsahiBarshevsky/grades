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
    textInputContainer: {
        width: '100%',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 10,
        marginTop: 5,
        // marginBottom: 10
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
        marginTop: 10,
        elevation: 2,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 50,
        marginBottom: 10,
        marginHorizontal: 5
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
    back: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 10
    },
    mainTitle: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    mainTitlelight: {
        color: '#000000'
    },
    mainTitledark: {
        color: '#ffffff'
    },
    backButton: {
        width: 25,
        height: 25,
        borderRadius: 12.5,
        marginRight: 5,
        transform: [{ translateY: -2 }],
        justifyContent: 'center',
        alignItems: 'center'
    },
    error: {
        color: '#eb5030',
        marginTop: 5,
        marginBottom: 10
    },
    label: {
        marginTop: 5
    },
    labellight: {
        color: '#9e9e9e'
    },
    labeldark: {
        color: '#ffffff80'
    }
});