import { StyleSheet, Platform, StatusBar, Dimensions } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        paddingHorizontal: 10,
        paddingBottom: 10
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 10,
        marginBottom: 20,
        paddingHorizontal: 5
    },
    statBox: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 85,
        height: 85,
        borderRadius: 5,
        backgroundColor: 'lightgreen'
    },
    yearContainer: {
        paddingHorizontal: 5
    },
    yearTitle: {
        width: 80,
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: 'lightgreen',
        borderRadius: 40,
        padding: 5,
        marginBottom: 10
    }
});