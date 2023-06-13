import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const [token, setToken] = useState();

    useEffect(async() => {
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

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <View style={styles.form}>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email :</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="email-address"
                        onChangeText={setEmail}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Password :</Text>
                    <TextInput
                        style={styles.input}
                        secureTextEntry
                        onChangeText={setPassword}
                    />
                </View>
                <Button
                    title="Login"
                    onPress={handleSubmit}
                    style={styles.button}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 24
    },
    form: {
        width: '80%'
    },
    inputContainer: {
        marginBottom: 16
    },
    label: {
        fontSize: 16,
        marginBottom: 8
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10
    },
    button: {
        marginTop: 16
    }
});
