import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Home Screen';
import CourseScreen from './Course Screen';

const Stack = createStackNavigator();

const RootStackNavigator = () => {
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Course" component={CourseScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootStackNavigator;

