import React, { useState, useEffect } from "react";
import {View, Text, TouchableOpacity, Alert, StyleSheet, FlatList} from "react-native";
import DiverManagement from "../../Component/DiverManagement/DiverManagement";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function getDatas (setDivers) {
    await axios.get("http://93.104.215.68:5000/api/divers/all").then((response) => {
        console.log(response.data[0]);
        setDivers(response.data)
    }).catch((error) => {
        console.log(error);
    });
}


function Instructor(props) {
    const [divers, setDivers] = useState([]);
    const navigation = useNavigation();

    useEffect( async () => {
        await getDatas(setDivers);
        const findToken = await AsyncStorage.getItem("token");
        if (findToken !== null) {
            fetch("http://93.104.215.68:5000/api/users/verify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": findToken,
                },
                body: JSON.stringify({ token: findToken }),
            })
                .then((response) => {
                    if (!response.ok) {
                        navigation.navigate("Login");
                    }
                })
                .then(async (data) => {
                    if (data.decoded.rank !== 2) {
                        await navigation.replace("/");
                        Alert.alert("You are not an instructor");
                    }
                })
                .catch((error) => {
                    console.log(error); // Handle any errors
                });
        } else {
            navigation.navigate("Login");
        }
    }, []);

    const [pageSelected, setPageSelected] = useState(6);
    const data = [];

    for (let i = 0; i < divers.length; i++) {
        data.push({ id: divers[i].id, name: divers[i].last_name + " " + divers[i].first_name });
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.item}
            onPress={() => handleItemClick(item)}
        >
            <Text style={styles.itemText}>{item.name}</Text>
        </TouchableOpacity>
    );

    const handleItemClick = (item) => {
        // Votre logique à exécuter lorsque vous cliquez sur un élément
        console.log("Clicked item:", item);
        navigation.navigate("Profil", { item });
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                numColumns={1}
                onClick={() => {
                    navigation.navigate("Home");
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5F5F5',
        paddingTop: '15%', // Centrer verticalement
        justifyContent: 'center', // Centrer verticalement
    },
    listContent: {
        justifyContent: 'center',
    },
    item: {
        flex: 1,
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
        margin: 8,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    itemText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333333',
    },
});

export default Instructor;
