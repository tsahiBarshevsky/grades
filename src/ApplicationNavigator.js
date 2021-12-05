import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, StatusBar } from "react-native";
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, Octicons, FontAwesome } from '@expo/vector-icons';
import RootStackNavigator from './components';
import InsertionScreen from './components/Insertion Screen';
import SettingsScreen from './components/Settings Screen';
import { getCourses, getFailure } from './utils/AsyncStorageHandler';
import { useDispatch } from 'react-redux';
import { SkypeIndicator } from 'react-native-indicators';
import { ThemeContext } from '../src/utils/ThemeManager';
import { darkTheme, lightTheme } from "../src/utils/Themes";

const Tab = createBottomTabNavigator();

const ApplicationNavigator = () => {

    const [isLoaded, setIsLoaded] = useState(false);
    const { theme } = React.useContext(ThemeContext);
    const dispatch = useDispatch();

    useEffect(() => {
        // Fetching data from AsyncStorage
        Promise.all([
            getCourses(),
            getFailure()
        ])
            .then(([courses, failure]) => {
                dispatch({ type: 'SET_COURSES', courses: courses });
                if (failure !== null)
                    dispatch({ type: 'SET_SCORE', score: failure });
                setTimeout(() => {
                    setIsLoaded(true);
                }, 1500);
            });
    }, [dispatch]);

    return isLoaded ? (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    tabBarHideOnKeyboard: true,
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        backgroundColor: 'black',
                        borderTopColor: 'black',
                        height: 55
                    }
                }}
            >
                <Tab.Screen
                    name="StackNavigator"
                    component={RootStackNavigator}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <FontAwesome name="graduation-cap" size={24} color={focused ? "white" : "#ffffff99"} />
                                <Text style={[focused ? { color: 'white' } : { color: '#ffffff99' }, { fontSize: 12 }]}>הקורסים שלי</Text>
                            </View>
                        )
                    }}
                />
                <Tab.Screen
                    name="Insertion"
                    component={InsertionScreen}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <AntDesign name="pluscircleo" size={24} color={focused ? "white" : "#ffffff99"} />
                                <Text style={[focused ? { color: 'white' } : { color: '#ffffff99' }, { fontSize: 12 }]}>הוספת קורס</Text>
                            </View>
                        )
                    }}
                />
                <Tab.Screen
                    name="Settings"
                    component={SettingsScreen}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <Octicons name="settings" size={24} color={focused ? "white" : "#ffffff99"} />
                                <Text style={[focused ? { color: 'white' } : { color: '#ffffff99' }, { fontSize: 12 }]}>העדפות</Text>
                            </View>
                        )
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    ) : (
        <SafeAreaView style={[styles.container, styles[`container${theme}`]]}>
            <ExpoStatusBar style={theme === 'light' ? 'dark' : 'light'} />
            <SkypeIndicator color={theme === 'light' ? 'black' : 'white'} />
        </SafeAreaView>
    )
}

export default ApplicationNavigator;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        padding: 10
    },
    containerlight: {
        backgroundColor: lightTheme.background
    },
    containerdark: {
        backgroundColor: darkTheme.background
    }
});
