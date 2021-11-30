import { StyleSheet, Platform, StatusBar, Dimensions } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#181818',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        paddingHorizontal: 10,
        paddingBottom: 10
    },
    text: {
        color: 'white'
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
        backgroundColor: '#373737'
    },
    yearContainer: {
        paddingHorizontal: 5
    },
    titleBox: {
        width: 80,
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#373737',
        borderRadius: 40,
        padding: 5,
        marginBottom: 10
    },
    title: {
        color: '#e4d566',
        fontWeight: 'bold',
        fontSize: 15,
        letterSpacing: 1.5
    }
});