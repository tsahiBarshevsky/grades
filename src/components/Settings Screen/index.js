import React, { useState } from 'react';
import { SafeAreaView, Text, Switch } from 'react-native';
import { styles } from './styles';

import { ThemeContext } from '../../utils/ThemeManager';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getTheme, setTheme } from '../../utils/AsyncStorageHandler';


const SettingsScreen = () => {

    const { toggleTheme } = React.useContext(ThemeContext);
    const { theme } = React.useContext(ThemeContext);

    return (
        <SafeAreaView style={styles.container}>
            <Text>הגדרות</Text>
            <TouchableOpacity onPress={() => setTheme('light')}><Text>שנה</Text></TouchableOpacity>
            <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                // thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleTheme}
                value={theme === 'light' ? false : true}
            />
            <Text>{theme}</Text>
            <TouchableOpacity onPress={() => toggleTheme()}><Text>Toggle</Text></TouchableOpacity>
        </SafeAreaView>
    )
}

export default SettingsScreen;
