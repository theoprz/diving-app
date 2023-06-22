import React, {useContext, useEffect, useState} from "react";
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeContext } from "../../../Component/Theme/SwitchTheme";

async function getDatas(setDives) {
    axios
        .get("http://93.104.215.68:5000/api/dives/open")
        .then((response) => {
            setDives(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
}

async function getToken() {
    return await AsyncStorage.getItem("token");
}

async function setToken(token) {
    await AsyncStorage.setItem("token", token);
}

function DiveManagement(props) {
    const [search, setSearch] = useState("");
    const [dives, setDives] = useState([]);
    const {isDarkModeEnabled} = useContext(ThemeContext);

    const [filteredDives, setFilteredDives] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchData = async () => {
            await getDatas(setDives);
        };

        fetchData();
    }, []);

    useEffect(() => {
        const filteredResults = dives.filter((dive) =>
            dive.name.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredDives(filteredResults);
    }, [dives, search]);

    return (
        <View style={[styles.container, isDarkModeEnabled && styles.darkContainer]}>
            <Text style={[styles.title, isDarkModeEnabled && styles.darkTitle]}>Dive Management</Text>
            <View style={styles.searchContainer}>
                <View style={styles.inputContainer}>
                    <Text style={[styles.label, isDarkModeEnabled && styles.darkText]}>Name :</Text>
                    <TextInput
                        style={[styles.input, isDarkModeEnabled && styles.darkInput]}
                        onChangeText={(text) => setSearch(text)}
                    />
                </View>
            </View>
            {dives.length === 0 ? (
                <Text>Loading ...</Text>
            ) : (
                <ScrollView>
                    <View>
                        <View style={ [styles.tableRow, isDarkModeEnabled && styles.darkHeader]}>
                            <Text style={[styles.tableHeader, styles.flex1, isDarkModeEnabled && styles.darkText]}>Name</Text>
                            <Text style={[styles.tableHeader, styles.flex1, isDarkModeEnabled && styles.darkText]}>Begin Date</Text>
                            <Text style={[styles.tableHeader, styles.flex1, isDarkModeEnabled && styles.darkText]}>Modify</Text>
                        </View>
                        {filteredDives.map((dive, index) => (
                            <View
                                style={[
                                    styles.tableRow,
                                    index % 2 === 0 && styles.evenRow,
                                ]}
                                key={index}
                            >
                                <Text style={styles.tableData}>
                                    {dive.name}
                                </Text>
                                <Text style={styles.tableData}>
                                    {new Date(dive.date_begin).toISOString().slice(0, 10)}
                                </Text>
                                <View style={styles.tableData}>
                                    <TouchableOpacity
                                        style={{
                                            backgroundColor: "#20BDFF",
                                            borderRadius: 20,
                                            paddingHorizontal: 20,
                                            paddingVertical: 10,
                                            alignSelf: "center",
                                        }}
                                        onPress={() => {
                                            navigation.navigate("Dive Modification", {dives: dive});
                                        }}
                                    >
                                        <Text style={{ color: "#FFFFFF", fontWeight: "bold" }}>Modify</Text>

                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1,
        padding: 15,
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
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 6,
        color: "#000",
    },
    darkTitle: {
      color: "#fff",
    },
    searchContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: "4%",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        height: "100%",
        marginRight: 10,
    },
    label: {
        fontWeight: "bold",
        marginRight: 2,
        fontSize: 14,
        color: "#000",
    },
    darkText: {
      color: "#fff",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 14,
        width: 150,
        color: "#000",
    },
    darkInput: {
      backgroundColor: "#555",
        color: "#fff",
        borderColor: "#555",
        shadowColor: '#20BDFF',
        shadowOpacity: 1,
        shadowOffset: {
            width: 2,
            height: 2,
        }
    },
    tableRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: "#ccc",
        backgroundColor: "#fff",
    },
    darkHeader: {
        backgroundColor: "#20BDFF",
        borderColor: "#000",
    },
    evenRow: {
        backgroundColor: "#f7f7f7",
    },
    tableHeader: {
        flex: 1,
        textAlign: "center",
        paddingVertical: 8,
        paddingHorizontal: 4,
        fontSize: 14,
        fontWeight: "bold",
        color: "#000",
    },
    tableData: {
        flex: 1,
        textAlign: "center",
        paddingVertical: 8,
        paddingHorizontal: 4,
        fontSize: 14,
        color: "#000",
    },
    flex1: {
        flex: 1,
    },
});

export default DiveManagement;
