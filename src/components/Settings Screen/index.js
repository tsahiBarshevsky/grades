import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { ThemeContext } from '../../utils/ThemeManager';
import { setFailure as updateFailure } from '../../utils/AsyncStorageHandler';
import { styles } from './styles';

import SwitchToggle from "react-native-switch-toggle";
import { darkTheme, lightTheme } from '../../utils/Themes';

const SettingsScreen = () => {

    const [failure, setFailure] = useState('');
    const { toggleTheme } = React.useContext(ThemeContext);
    const { theme } = React.useContext(ThemeContext);
    const dispatch = useDispatch();

    const onUpdateScore = () => {
        updateFailure(failure);
        dispatch({ type: 'SET_SCORE', score: failure });
    }

    return (
        <SafeAreaView style={[styles.container, styles[`container${theme}`]]}>
            <Text style={[styles.mainTitle, styles[`mainTitle${theme}`]]}>
                העדפות אישיות
            </Text>
            <Text style={[styles.title, styles[`title${theme}`]]}>
                נראות האפליקציה
            </Text>
            <View style={styles.toggle}>
                <Text style={styles[`text${theme}`]}>ערכת נושא (מצב מואר/מצב חשוך)</Text>
                <SwitchToggle
                    RTL
                    switchOn={theme === 'light' ? false : true}
                    onPress={toggleTheme}
                    buttonText={theme === 'light' ? <Text>🌞</Text> : <Text>🌜</Text>}
                    circleColorOff={lightTheme.title}
                    circleColorOn={darkTheme.title}
                    backgroundColorOff='#C4C4C4'
                    backgroundColorOn={darkTheme.boxes}
                    buttonContainerStyle={buttonContainerStyle}
                    containerStyle={containerStyle}
                    circleStyle={circleStyle}
                />
            </View>
            <View style={[styles.divider, styles[`divider${theme}`]]} />
            <Text style={[styles.title, styles[`title${theme}`]]}>
                ציון עובר
            </Text>
            <View style={[styles.textInputContainer, styles[`textInputContainer${theme}`]]}>
                <TextInput
                    value={failure}
                    onChangeText={setFailure}
                    keyboardType="number-pad"
                    placeholder="ערך"
                    placeholderTextColor={theme === 'light' ? '#9e9e9e' : '#ffffff80'}
                    selectionColor={theme === 'light' ? '#9e9e9e' : '#ffffff80'}
                    style={[styles.textInput, styles[`textInput${theme}`]]}
                />
            </View>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => onUpdateScore()}
                style={[styles.button, styles[`button${theme}`]]}
            >
                <Text style={styles[`text${theme}`]}>עדכון</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const containerStyle = {
    width: 60,
    height: 32,
    borderRadius: 25,
    padding: 5
};

const circleStyle = {
    width: 25,
    height: 25,
    borderRadius: 12.5
};

const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateY: 2 }]
};

export default SettingsScreen;
