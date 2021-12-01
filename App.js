import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { I18nManager, View, Text } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { AntDesign, Octicons } from '@expo/vector-icons';
import rootReducer from './src/reducers';
import RootStackNavigator from './src/components';
import InsertionScreen from './src/components/Insertion Screen';
import SettingsScreen from './src/components/Settings Screen';
import { getTheme } from './src/utils/AsyncStorageHandler';
import { ThemeProvider } from './src/utils/ThemeManager';

I18nManager.forceRTL(true);
const store = createStore(rootReducer);
const Tab = createBottomTabNavigator();

const App = () => {

    // useEffect(() => {
    //     getTheme().then((value) => console.log('Value:', value));
    // }, []);

    return (
        <Provider store={store}>
            <ThemeProvider>
                <NavigationContainer>
                    <Tab.Navigator
                        screenOptions={{
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
                                        <AntDesign name="home" size={24} color={focused ? "white" : "#ffffff99"} />
                                        <Text style={[focused ? { color: 'white' } : { color: '#ffffff99' }, { fontSize: 12 }]}>בית</Text>
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
            </ThemeProvider>
        </Provider>
    )
}

export default App;
