import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row-reverse'
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    slide1: {
        backgroundColor: '#009A9A'
    },
    slide2: {
        backgroundColor: '#5292C0'
    },
    slide3: {
        backgroundColor: '#B10E12'
    },
    slide4: {
        backgroundColor: '#FE3691'
    },
    half: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    top: {
        justifyContent: 'center'
    },
    bottom: {
        justifyContent: 'flex-start'
    },
    text: {
        fontFamily: 'VarelaRound',
        color: '#ffffff',
        textAlign: 'center',
    },
    title: {
        fontSize: 30,
        marginBottom: 5
    },
    caption: {
        fontSize: 20
    },
    image: {
        width: 150,
        height: 150,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 50,
        padding: 10,
        width: 150,
        marginTop: 15
    },
    buttonText: {
        fontSize: 15
    }
});