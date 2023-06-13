import React from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BottomMenu, Item } from "react-native-bottom-menu";
import { useNavigation } from '@react-navigation/native';

async function getToken(){
    return await AsyncStorage.getItem('token');
}

async function setToken(token){
    await AsyncStorage.setItem('token', token);
}

const Home = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Home</Text>
            <BottomMenu>
                <Item
                    size={22}
                    name="home"
                    text="Home"
                    type="Octicons"
                    onPress={() => {Alert.alert('Home')}}
                />
                <Item
                    size={22}
                    name="alert"
                    text="Test"
                    type="Octicons"
                    onPress={() => {navigation.navigate('Instructor')}}
                />
            </BottomMenu>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default Home;
