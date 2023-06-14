import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BottomMenu, Item } from "react-native-bottom-menu";
import { useNavigation } from '@react-navigation/native';

async function getToken(){
    return await AsyncStorage.getItem('token');
}

async function setToken(token){
    await AsyncStorage.setItem('token', token);
}
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
const Home = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const navigation = useNavigation();

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    const containerStyle = isDarkMode ? styles.containerDark : styles.containerLight;
    const textStyle = isDarkMode ? styles.textDark : styles.textLight;

    return (
        <View style={[containerStyle, styles.container]}>
            <Text style={[styles.text, textStyle]}>Home</Text>
            <BottomMenu>
                <Item
                    size={22}
                    name="home"
                    text="Home"
                    type="Octicons"
                    onPress={() => {navigation.navigate('Home')}}
                />
                <Item
                    size={22}
                    name="alert"
                    text="Test"
                    type="Octicons"
                    onPress={() => {navigation.navigate('Instructor')}}
                />
                <View style={styles.switchContainer}>
                    <Switch
                        value={isDarkMode}
                        onValueChange={toggleDarkMode}
                        trackColor={{ false: '#999', true: '#7dd3fc' }}
                        thumbColor={isDarkMode ? '#333333' : '#666666'}
                    />
                </View>
            </BottomMenu>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerLight: {
        backgroundColor: '#fff',
    },
    containerDark: {
        backgroundColor: '#121212',
    },
    textLight: {
        color: '#000',
    },
    textDark: {
        color: '#fff',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

});

export default Home;
