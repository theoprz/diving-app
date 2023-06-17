import React, { useState, useEffect } from "react";
import {BottomMenu, Item} from "react-native-bottom-menu";
import { View, Text, Pressable, StyleSheet, Switch, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from "@react-native-async-storage/async-storage";


async function getToken(){
    return await AsyncStorage.getItem('token');
}

async function setToken(token){
    await AsyncStorage.setItem('token', token);
}


function Diver() {
    const navigation = useNavigation();
    const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);
    console.log('Dtest ' + isDarkModeEnabled);


    useEffect(() => {
        // Load dark mode state from storage or use default value
        const loadDarkModeState = async () => {
            const darkModeState = await AsyncStorage.getItem('isDarkModeEnabled');
            setIsDarkModeEnabled(darkModeState === 'true');
            console.log('Dload ' + isDarkModeEnabled);

        };

        loadDarkModeState();
        console.log('Dload2 ' + isDarkModeEnabled);

    }, []);

    const toggleDarkMode = async (value) => {
        setIsDarkModeEnabled(value);
        console.log('Dtoggle ' + isDarkModeEnabled);
        await AsyncStorage.setItem('isDarkModeEnabled', value.toString());
        console.log('Dtoggle2 ' + isDarkModeEnabled);

    };

    return (
        <View style={[styles.container, isDarkModeEnabled && styles.darkContainer]}>
            <Text style={styles.title}>Diver</Text>
            <View style={styles.content}>
                <View style={styles.row}>
                    <View style={styles.menuItem}>
                        <Pressable
                            style={[
                                styles.menuButton,
                            ]}
                            onPress={() => {navigation.navigate('Diver Information')}}
                        >
                            <Text style={styles.menuText}>View My Informations</Text>
                        </Pressable>
                    </View>

                    <View style={styles.menuItem}>
                        <Pressable
                            style={[
                                styles.menuButton,
                            ]}
                            onPress={() => {navigation.navigate('Diver')}}
                        >
                            <Text style={styles.menuText}>Plongées prévues</Text>
                        </Pressable>
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={styles.menuItem}>
                        <Pressable
                            style={[
                                styles.menuButton,
                            ]}
                            onPress={() => {navigation.navigate('Diver')}}
                        >
                            <Text style={styles.menuText}>Plongées disponibles</Text>
                        </Pressable>
                    </View>

                    <View style={styles.menuItem}>
                        <Pressable
                            style={[
                                styles.menuButton,
                            ]}
                            onPress={() => {navigation.navigate('Instructor')}}
                        >
                            <Text style={styles.menuText}>Historiques des Plongées</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
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
                    name="person-fill"
                    text="Diver"
                    type="Octicons"
                    onPress={() => {navigation.navigate('Diver')}}
                />
                <Item
                    size={22}
                    name="key"
                    text="Dive Director"
                    type="Octicons"
                    onPress={() => {navigation.navigate('Instructor')}}
                />
                <Item
                    size={22}
                    name="settings"
                    text="Settings"
                    type="gala"
                    onPress={() => {navigation.navigate('Settings')}}
                />
            </BottomMenu>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    darkContainer: {
        backgroundColor: "#000",
    },
    content: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    row: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    menuItem: {
        flex: 1,
        margin: 10,
    },
    menuButton: {
        backgroundColor: "white",
        padding: 16,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        height: 100,
    },
    selectedMenuButton: {
        backgroundColor: "#005a8d",
    },
    menuText: {
        fontSize: 16,
        textAlign: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: hp("5%"),
        textAlign: "center",
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default Diver;
