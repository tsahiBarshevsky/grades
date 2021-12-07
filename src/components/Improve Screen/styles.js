import { StyleSheet, Platform, StatusBar, Dimensions } from "react-native";
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
    form: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textInputContainer: {
        width: '100%',
        // height: 35,
        flex: 1,
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 10,
        marginRight: 5,
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
    error: {
        color: '#eb5030',
        marginBottom: 5
    },
    text: {
        fontFamily: 'VarelaRound',
    },
    textlight: {
        color: lightTheme.text
    },
    textdark: {
        color: darkTheme.text,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        height: 38,
        width: 80,
        elevation: 2,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 50,
        marginLeft: 10
    },
    buttonlight: {
        backgroundColor: lightTheme.boxes,
    },
    buttondark: {
        backgroundColor: darkTheme.boxes,
    },
    results: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    course: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginBottom: 10,
        marginHorizontal: 1,
        borderRadius: 10,
        elevation: 2,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
    courselight: {
        backgroundColor: lightTheme.boxes
    },
    coursedark: {
        backgroundColor: darkTheme.boxes
    }
});