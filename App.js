import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './Pages/Home/Home';
import LoginScreen from './Pages/Login/Login';
import InstructorScreen from './Pages/Instructor/Instructor';
import ProfilScreen from './Pages/DiverInfo/Profil';

const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const App = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
            <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
            <Stack.Screen name="Instructor" options={{ headerShown: false }} component={InstructorScreen} />
            <Stack.Screen name="Profil" options={{ headerShown: true }} component={ProfilScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;