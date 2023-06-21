import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Dimensions } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";



function DiveInformation({ route, navigation }) {
    const { dives } = route.params;
    const [name, setName] = useState(dives?.name || "");
    const [status, setStatus] = useState(dives?.status || "");
    const [diveSite, setDiveSite] = useState(dives?.dive_site || "");
    const [comment, setComment] = useState(dives?.comment || "");
    const [beginDate, setBeginDate] = useState(new Date(dives?.date_begin) || new Date());
    const [endDate, setEndDate] = useState(new Date(dives?.date_end) || new Date());
    const [numOfPlaces, setNumOfPlaces] = useState(dives?.place_number || 0);
    const [placesRegistered, setPlacesRegistered] = useState(dives?.registered_place || 0);
    const [diverPrice, setDiverPrice] = useState(dives?.diver_price || 0);
    const [instructorPrice, setInstructorPrice] = useState(dives?.instructor_price || 0);
    const [surfaceSecurity, setSurfaceSecurity] = useState(dives?.surface_security || 0);
    const [maxPPO2, setMaxPPO2] = useState(dives?.maxPPO2 || 0);

    const getToken = async () => {
        return await AsyncStorage.getItem("token");
    };

    const windowWidth = Dimensions.get("window").width;

    const isSmallScreen = windowWidth < 500;

    return (
        <View style={styles.container}>
            <View style={[styles.table, isSmallScreen && styles.tableSmallScreen]}>
                <Text style={styles.title}>Informations</Text>
                <View style={styles.row}>
                    <Text style={styles.label}>Name:</Text>
                    <Text style={styles.info}>{name}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Dive Site:</Text>
                    <Text style={styles.info}>{diveSite}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Status:</Text>
                    <Text style={styles.info}>{status}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Begin Date:</Text>
                    <Text style={styles.info}>{moment(beginDate).format("YYYY-MM-DD HH:mm")}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>End Date:</Text>
                    <Text style={styles.info}>{moment(endDate).format("YYYY-MM-DD HH:mm")}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Number Of places:</Text>
                    <Text style={styles.info}>{numOfPlaces.toString()}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Number of Registration:</Text>
                    <Text style={styles.info}>{placesRegistered.toString()}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Diver Price:</Text>
                    <Text style={styles.info}>{diverPrice.toString() + '€'}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Instructor Price:</Text>
                    <Text style={styles.info}>{instructorPrice.toString() + '€'}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Surface Security:</Text>
                    <Text style={styles.info}>{surfaceSecurity.toString()}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Max PP02:</Text>
                    <Text style={styles.info}>{maxPPO2.toString()}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 0,
            height: -4,
        },
        shadowRadius: 4,
        elevation: 4,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        padding: 10,
        textAlign: "center",
    },
    table: {
        width: "80%",
        borderWidth: 3,
        borderColor: "#aaa",
        borderRadius: 20,
        padding: 20,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    tableSmallScreen: {
        width: "90%",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginBottom: 10,

    },
    label: {
        fontWeight: "bold",
        flex: 1,
        marginRight: 10,
    },
    info: {
        flex: 1,
        marginLeft: 10,
    },
});

export default DiveInformation;
