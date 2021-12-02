import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, Switch, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { ThemeContext } from '../../utils/ThemeManager';
import { getFailure, setFailure as updateFailure } from '../../utils/AsyncStorageHandler';
import { styles } from './styles';

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
                העדפות אפליקציה
            </Text>
            <Text style={[styles.title, styles[`title${theme}`]]}>
                נראות
            </Text>
            <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                // thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleTheme}
                value={theme === 'light' ? false : true}
            />
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

export default SettingsScreen;
