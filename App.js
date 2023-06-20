import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider, ThemeContext } from './Component/Theme/SwitchTheme';

import LoginScreen from './Pages/Login/Login';
import DiverScreen from './Pages/Diver/Diver';
import HomeScreen from './Pages/Home/Home';
import InstructorScreen from './Pages/Instructor/Instructor';
import SettingsScreen from './Pages/Settings/Settings';
import ProfilScreen from './Pages/DiverInfo/Profil';

//Diver Component
import DiverInfoScreen from "./Component/DiverComponent/DiverInfo/DiverInfo";

//Admin Component
import DiverListScreen from "./Component/AdminComponnent/DiverList/DiverList";
import DiveManagementScreen from "./Component/AdminComponnent/DiveManagement/DiveManagement";
import DivesHistory from "./Component/AdminComponnent/DivesHistory/DivesHistory";
import DiveModificationScreen from "./Component/AdminComponnent/DiveManagement/DiveModification";

const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    lightScreen: {
        backgroundColor: 'white',
    },
    darkScreen: {
        backgroundColor: 'black',
    },
});

const App = () => {
    return (
        <ThemeProvider>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
                    <Stack.Screen name="Settings" options={{ headerShown: false }} component={SettingsScreen} />
                    <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
                    <Stack.Screen name="Diver" options={{ headerShown: false }} component={DiverScreen} />
                    <Stack.Screen name="Instructor" options={{ headerShown: false }} component={InstructorScreen} />
                    <Stack.Screen name="Profil" options={{ headerShown: true }} component={ProfilScreen} />
                    <Stack.Screen name="Diver Information" options={{ headerShown: true }} component={DiverInfoScreen} />
                    <Stack.Screen name="Diver List" options={{ headerShown: true }} component={DiverListScreen} />
                    <Stack.Screen name="Dive Management" options={{ headerShown: true }} component={DiveManagementScreen} />
                    <Stack.Screen name="Dive Modification" options={{ headerShown: true }} component={DiveModificationScreen} />
                    <Stack.Screen name="Dives History" options={{ headerShown: true }} component={DivesHistory} />
                </Stack.Navigator>
            </NavigationContainer>
        </ThemeProvider>
    );
};

export default App;
