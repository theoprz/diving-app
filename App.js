import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider, ThemeContext } from './Component/Theme/SwitchTheme';
import { LinearGradient } from 'expo-linear-gradient';

import LoginScreen from './Pages/Login/Login';
import HomeScreen from './Pages/Home/Home';
import InstructorScreen from './Pages/Instructor/Instructor';
import SettingsScreen from './Pages/Settings/Settings';
import ProfilScreen from './Pages/DiverInfo/Profil';

// Admin Component
import DiverListScreen from "./Component/AdminComponnent/DiverList/DiverList";
import DiveManagementScreen from "./Component/AdminComponnent/DiveManagement/DiveManagement";
import DivesHistoryScreen from "./Component/AdminComponnent/DivesHistory/DivesHistory";
import DivesInformationScreen from "./Component/AdminComponnent/DivesHistory/DiveInformation";
import DiveModificationScreen from "./Component/AdminComponnent/DiveManagement/DiveModification";
import DiveCreatorScreen from "./Component/AdminComponnent/DiveCreator/DiveCreator";

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <ThemeProvider>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{

                        headerBackground: () => (
                            <View style={styles.headerBackground}>
                                <LinearGradient
                                    colors={['#A5FECB', '#20BDFF', '#5433FF']} // Couleurs du dégradé
                                    start={{ x: 0, y: 0 }} // Point de départ du dégradé (en haut à gauche)
                                    end={{ x: 1, y: 0 }} // Point d'arrivée du dégradé (en haut à droite)
                                    style={StyleSheet.absoluteFill} // Utiliser toute la taille de l'écran
                                />
                            </View>
                        ),
                        headerTintColor: 'white', // Couleur du texte du header
                    }}
                >
                    <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
                    <Stack.Screen name="Settings" options={{ headerShown: false }} component={SettingsScreen} />
                    <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
                    <Stack.Screen name="Instructor" options={{ headerShown: false }} component={InstructorScreen} />
                    <Stack.Screen name="Profil" options={{ headerShown: true }} component={ProfilScreen} />
                    <Stack.Screen name="Diver List" options={{ headerShown: true }} component={DiverListScreen} />

                    <Stack.Screen name="Dive Management" options={{ headerShown: true }} component={DiveManagementScreen} />
                    <Stack.Screen name="Dive Modification" options={{ headerShown: true }} component={DiveModificationScreen} />
                    <Stack.Screen name="Dives History" options={{ headerShown: true }} component={DivesHistoryScreen} />
                    <Stack.Screen name="Dive Information" options={{ headerShown: true }} component={DivesInformationScreen} />
                    <Stack.Screen name="Create a Dive" options={{ headerShown: true }} component={DiveCreatorScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </ThemeProvider>
    );
};

const styles = StyleSheet.create({
    headerBackground: {
        flex: 1,
        elevation: 4, // Ajouter une ombre sous le header
        shadowColor: 'black', // Couleur de l'ombre (noir)
        shadowOpacity: 1, // Opacité de l'ombre (0.5)
        shadowOffset: { width: 0, height: -2 }, // Décalage de l'ombre (vertical: 2)
        shadowRadius: 4, // Rayon de l'ombre
    },
});

export default App;
