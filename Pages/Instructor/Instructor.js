import React, {useState, useEffect, useContext} from "react";
import {View, Text, TouchableOpacity, Alert, StyleSheet, FlatList, Switch, Pressable} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BottomMenu, Item } from "react-native-bottom-menu";
import { ThemeContext } from '../../Component/Theme/SwitchTheme';

async function getDatas(setDivers) {
    try {
        const response = await axios.get("http://93.104.215.68:5000/api/divers/all");
        setDivers(response.data);
    } catch (error) {
        console.log(error);
    }
}

async function getToken(){
    return await AsyncStorage.getItem('token');
}

async function setToken(token){
    await AsyncStorage.setItem('token', token);
}

function Instructor(props) {
    const {isDarkModeEnabled} = useContext(ThemeContext);
    const navigation = useNavigation();


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Admin</Text>
            <View style={styles.content}>
                <View style={styles.row}>
                    <View style={styles.menuItem}>
                        <Pressable
                            style={[
                                styles.menuButton,
                            ]}
                            onPress={() => {navigation.navigate('Diver List')}}
                        >
                            <Text style={styles.menuText}>View The Diver List</Text>
                        </Pressable>
                    </View>

                    <View style={styles.menuItem}>
                        <Pressable
                            style={[
                                styles.menuButton,
                            ]}
                            onPress={() => {navigation.navigate('Dive Management')}}
                        >
                            <Text style={styles.menuText}>Dive Management</Text>
                        </Pressable>
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={styles.menuItem}>
                        <Pressable
                            style={[
                                styles.menuButton,
                            ]}
                            onPress={() => {navigation.navigate('Dives History')}}
                        >
                            <Text style={styles.menuText}>Dives History</Text>
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
                    name="person"
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
});

export default Instructor;
