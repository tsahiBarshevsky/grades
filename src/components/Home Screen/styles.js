import { StyleSheet, Platform, StatusBar } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 10,
        paddingHorizontal: 15,
        marginBottom: 10
    },
    stat: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 85,
        height: 85,
        backgroundColor: 'lightgreen'
    },
    scrollView: {
        paddingVertical: 5,
        paddingHorizontal: 15
    }
});