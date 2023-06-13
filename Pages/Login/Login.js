import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Pressable, Dimensions, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const [token, setToken] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const findToken = await AsyncStorage.getItem('token');
            if (findToken !== null) {
                fetch('http://93.104.215.68:5000/api/users/verify', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': findToken
                    },
                    body: JSON.stringify({ token: findToken })
                }).then((response) => {
                    if (response.ok) {
                        navigation.navigate('Home');
                    }
                });
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://93.104.215.68:5000/api/users/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const data = await response.json();
                setToken(data.token);
                await AsyncStorage.setItem('token', data.token);
                navigation.navigate('Home');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const windowDimensions = useWindowDimensions();


    return (
            <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <View style={styles.form}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        keyboardType="email-address"
                        onChangeText={setEmail}
                        placeholder="Your Email"
                        placeholderTextColor="#888"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        secureTextEntry
                        onChangeText={setPassword}
                        placeholder="Your Password"
                        placeholderTextColor="#888"
                    />
                </View>

                <Pressable style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.login}>Login</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: '100%',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
    },
    form: {
        width: '80%',
    },
    inputContainer: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 10,
        borderRadius: 8,
        color: '#000',
    },
    button: {
        marginTop: 16,
        marginLeft: '35%',
        marginRight: '35%',
        width: '30%',
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        backgroundColor: '#2811df',
    },
    login: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: '#fff',
    },

});
