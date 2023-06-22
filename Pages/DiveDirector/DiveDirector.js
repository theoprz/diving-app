import React, {useContext} from "react";
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

function DiveDirector(props) {
    const {isDarkModeEnabled} = useContext(ThemeContext);
    const navigation = useNavigation();


    return (
        <View style={[styles.container, isDarkModeEnabled && styles.darkContainer]}>
            <Text style={[styles.title, isDarkModeEnabled && styles.darkText]}>Admin</Text>
            <View style={styles.content}>
                <View style={styles.row}>
                    <View style={styles.menuItem}>
                        <Pressable
                            style={[
                                styles.menuButton, isDarkModeEnabled && styles.darkButton
                            ]}
                            onPress={() => {navigation.navigate('Diver List')}}
                        >
                            <Text style={[styles.menuText, isDarkModeEnabled && styles.darkText]}>View The Diver List</Text>
                        </Pressable>
                    </View>

                    <View style={styles.menuItem}>
                        <Pressable
                            style={[
                                styles.menuButton, isDarkModeEnabled && styles.darkButton
                            ]}
                            onPress={() => {navigation.navigate('Dive Management')}}
                        >
                            <Text style={[styles.menuText, isDarkModeEnabled && styles.darkText]}>Dive Management</Text>
                        </Pressable>
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={styles.menuItem}>
                        <Pressable
                            style={[
                                styles.menuButton, isDarkModeEnabled && styles.darkButton
                            ]}
                            onPress={() => {navigation.navigate('Dives History')}}
                        >
                            <Text style={[styles.menuText, isDarkModeEnabled && styles.darkText]}>Dives History</Text>
                        </Pressable>
                    </View>

                    <View style={styles.menuItem}>
                        <Pressable
                            style={[
                                styles.menuButton, isDarkModeEnabled && styles.darkButton
                            ]}
                            onPress={() => {navigation.navigate('Create a Dive')}}
                        >
                            <Text style={[styles.menuText, isDarkModeEnabled && styles.darkText]}>Create a Dive</Text>
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
                    name="key"
                    text="Dive Director"
                    type="Octicons"
                    onPress={() => {navigation.navigate('Dive Director')}}
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
        backgroundColor:"#fff",
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 0,
            height: -4,
        },
        shadowRadius: 4,
        elevation: 4,
    },
    darkContainer: {
        backgroundColor: "#333",
    },
    darkButton: {
        backgroundColor: "#20BDFF",
        shadowColor: "#5433FF",
        shadowOpacity: 1,

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
        shadowOffset: { width: 1, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
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
        marginTop: hp("3%"),
        textAlign: "center",
    },
    darkText: {
      color: "white",
    },
});

export default DiveDirector;
