import { StyleSheet, Platform, StatusBar } from "react-native";
import { darkTheme, lightTheme } from "../../utils/Themes";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        paddingHorizontal: 10,
        paddingBottom: 10
    },
    containerlight: {
        backgroundColor: lightTheme.background
    },
    containerdark: {
        backgroundColor: darkTheme.background
    },
    textlight: {
        color: lightTheme.text
    },
    textdark: {
        color: darkTheme.text
    },
    header: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 15,
        marginBottom: 20,
        paddingHorizontal: 5
    },
    statBox: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '30%',
        height: 85,
        borderRadius: 5,
    },
    statBoxlight: {
        backgroundColor: lightTheme.boxes,
    },
    statBoxdark: {
        backgroundColor: darkTheme.boxes
    },
    yearContainer: {
        paddingHorizontal: 5
    },
    titleBox: {
        width: 80,
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 40,
        padding: 5,
        marginBottom: 10
    },
    titleBoxlight: {
        backgroundColor: lightTheme.boxes
    },
    titleBoxdark: {
        backgroundColor: darkTheme.boxes
    },
    title: {
        fontWeight: 'bold',
        fontSize: 15,
        letterSpacing: 1.5
    },
    titlelight: {
        color: lightTheme.title
    },
    titledark: {
        color: darkTheme.title
    }
});