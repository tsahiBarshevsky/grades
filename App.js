import 'react-native-gesture-handler';
import React from 'react';
import { I18nManager } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './src/reducers';
import HomeScreen from './src/components/Home Screen';
import InsertionScreen from './src/components/Insertion Screen';
import CourseScreen from './src/components/Course Screen';

I18nManager.forceRTL(true);
const store = createStore(rootReducer);
const Stack = createStackNavigator();

const App = () => {

    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Insertion" component={InsertionScreen} />
                    <Stack.Screen name="Course" component={CourseScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    )
}

export default App;
