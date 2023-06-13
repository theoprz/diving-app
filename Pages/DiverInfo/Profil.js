import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Dimensions } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import moment from "moment";


function getDatas(id, setDiver) {
    axios
        .get("http://93.104.215.68:5000/api/divers/all")
        .then((response) => {
            let elem = response.data.find((element) => {
                if (element.id === id) {
                    return element;
                }
            });
            console.log(elem);
            setDiver(elem);
        })
        .catch((error) => {
            console.log(error);
        });
}

function Profil() {
    const [diver, setDiver] = useState();
    const route = useRoute();
    const { item } = route.params;
    useEffect(() => {
        getDatas(item.id, setDiver);
    }, []);
    const formattedLicenseExpirationDate = diver && moment(diver.license_expiration_date).format("YYYY-MM-DD        ");
    const formattedMedicalExpirationDate = diver && moment(diver.medical_expiration_date).format("YYYY-MM-DD");

    const navigation = useNavigation();

    const windowWidth = Dimensions.get("window").width;

    const isSmallScreen = windowWidth < 500;

    return (
        <View style={styles.container}>
            <View style={[styles.table, isSmallScreen && styles.tableSmallScreen]}>
                <Text style={styles.title}>Informations</Text>
                <View style={styles.row}>
                    <Text style={styles.label}>Name:</Text>
                    <Text style={styles.info}>{diver && `${diver.first_name} ${diver.last_name}`}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Birthdate:</Text>
                    <Text style={styles.info}>{diver && `${diver.birthdate}`}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Email:</Text>
                    <Text style={styles.info}>{diver && `${diver.email}`}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Diver Qualifications:</Text>
                    <Text style={styles.info}>{diver && `${diver.diver_qualification}`}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Instructor Qualifications:</Text>
                    <Text style={styles.info}>{diver && `${diver.instructor_qualification}`}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Nitrox Qualifications:</Text>
                    <Text style={styles.info}>{diver && `${diver.nitrox_qualification}`}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Additional Qualifications:</Text>
                    <Text style={styles.info}>{diver && `${diver.additional_qualification}`}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>License number:</Text>
                    <Text style={styles.info}>{diver && `${diver.license_number}`}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>License Expiration Date:</Text>
                    <Text style={styles.info}>{diver && formattedLicenseExpirationDate}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Medical Expiration Date:</Text>
                    <Text style={styles.info}>{diver && formattedMedicalExpirationDate}</Text>
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

export default Profil;
