import { StyleSheet, Platform, StatusBar, I18nManager } from "react-native";
import { darkTheme, lightTheme } from "../../utils/Themes";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        paddingBottom: 10
    },
    containerlight: {
        backgroundColor: lightTheme.background
    },
    containerdark: {
        backgroundColor: darkTheme.background
    },
    messageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        paddingHorizontal: 35,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
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
        marginBottom: 25,
        paddingHorizontal: 15
    },
    statBox: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '30%',
        height: 85,
        borderRadius: 10,
        padding: 4
    },
    statBoxlight: {
        backgroundColor: lightTheme.boxes,
    },
    statBoxdark: {
        backgroundColor: darkTheme.boxes
    },
    statValue: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    statValuelight: {
        color: lightTheme.title
    },
    statValuedark: {
        color: darkTheme.title
    },
    statCaption: {
        fontWeight: 'bold'
    },
    yearContainer: {
        paddingHorizontal: 5
    },
    titleBox: {
        width: 90,
        height: 35,
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 40,
        padding: 5,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleBoxlight: {
        backgroundColor: lightTheme.boxes
    },
    titleBoxdark: {
        backgroundColor: darkTheme.boxes
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        letterSpacing: 1.5
    },
    titlelight: {
        color: lightTheme.title
    },
    titledark: {
        color: darkTheme.title
    },
    image: {
        width: '100%',
        height: 200,
    }
});