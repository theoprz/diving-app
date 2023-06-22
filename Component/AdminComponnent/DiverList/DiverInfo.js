import React, { useContext, useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Dimensions } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import moment from "moment";
import { ThemeContext } from "../../../Component/Theme/SwitchTheme";

function getDatas(id, setDiver) {
    axios
        .get("http://93.104.215.68:5000/api/divers/all")
        .then((response) => {
            let elem = response.data.find((element) => {
                if (element.id === id) {
                    return element;
                }
            });
            setDiver(elem);
        })
        .catch((error) => {
            console.log(error);
        });
}

function DiverInfo() {
    const { isDarkModeEnabled } = useContext(ThemeContext);
    const [diver, setDiver] = useState();
    const route = useRoute();
    const { item } = route.params;
    useEffect(() => {
        getDatas(item.id, setDiver);
    }, []);
    const formattedLicenseExpirationDate =
        diver && moment(diver.license_expiration_date).format("YYYY-MM-DD");
    const formattedMedicalExpirationDate =
        diver && moment(diver.medical_expiration_date).format("YYYY-MM-DD");

    const navigation = useNavigation();

    const windowWidth = Dimensions.get("window").width;

    const isSmallScreen = windowWidth < 500;

    return (
        <View style={[styles.container, isDarkModeEnabled && styles.darkContainer]}>
            <View style={[styles.table, isSmallScreen && styles.tableSmallScreen, isDarkModeEnabled && styles.darkTable]}>
                <Text style={[styles.title, isDarkModeEnabled && styles.darkInfo]}>Informations</Text>
                <View style={styles.row}>
                    <Text style={[styles.label, isDarkModeEnabled && styles.darkInfo]}>Name:</Text>
                    <Text style={[styles.info, isDarkModeEnabled && styles.darkInfo]}>
                        {diver ? `${diver.first_name} ${diver.last_name}` : "none"}
                    </Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.label, isDarkModeEnabled && styles.darkInfo]}>Birthdate:</Text>
                    <Text style={[styles.info, isDarkModeEnabled && styles.darkInfo]}>
                        {diver && diver.birthdate ? `${diver.birthdate}` : "none"}
                    </Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.label, isDarkModeEnabled && styles.darkInfo]}>Email:</Text>
                    <Text style={[styles.info, isDarkModeEnabled && styles.darkInfo]}>
                        {diver && diver.email ? `${diver.email}` : "none"}
                    </Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.label, isDarkModeEnabled && styles.darkInfo]}>Diver Qualifications:</Text>
                    <Text style={[styles.info, isDarkModeEnabled && styles.darkInfo]}>
                        {diver && diver.diver_qualification ? `${diver.diver_qualification}` : "none"}
                    </Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.label, isDarkModeEnabled && styles.darkInfo]}>Instructor Qualifications:</Text>
                    <Text style={[styles.info, isDarkModeEnabled && styles.darkInfo]}>
                        {diver && diver.instructor_qualification ? `${diver.instructor_qualification}` : "none"}
                    </Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.label, isDarkModeEnabled && styles.darkInfo]}>Nitrox Qualifications:</Text>
                    <Text style={[styles.info, isDarkModeEnabled && styles.darkInfo]}>
                        {diver && diver.nitrox_qualification ? `${diver.nitrox_qualification}` : "none"}
                    </Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.label, isDarkModeEnabled && styles.darkInfo]}>Additional Qualifications:</Text>
                    <Text style={[styles.info, isDarkModeEnabled && styles.darkInfo]}>
                        {diver && diver.additional_qualification ? `${diver.additional_qualification}` : "none"}
                    </Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.label, isDarkModeEnabled && styles.darkInfo]}>License number:</Text>
                    <Text style={[styles.info, isDarkModeEnabled && styles.darkInfo]}>
                        {diver && diver.license_number ? `${diver.license_number}` : "none"}
                    </Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.label, isDarkModeEnabled && styles.darkInfo]}>License Expiration Date:</Text>
                    <Text style={[styles.info, isDarkModeEnabled && styles.darkInfo]}>
                        {diver ? formattedLicenseExpirationDate : "none"}
                    </Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.label, isDarkModeEnabled && styles.darkInfo]}>Medical Expiration Date:</Text>
                    <Text style={[styles.info, isDarkModeEnabled && styles.darkInfo]}>
                        {diver ? formattedMedicalExpirationDate : "none"}
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#D3D3D3",
        alignItems: "center",
        shadowColor: "#000",
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
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        padding: 10,
        textAlign: "center",
    },
    table: {
        width: "80%",
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 20,
        padding: 20,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
            height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 5,
    },
    darkTable: {
      backgroundColor :"#20BDFF",
        shadowColor: "#5433FF",
        shadowOpacity: 1,
        shadowRadius: 5,

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
    darkInfo: {
      color: "#fff",
    },
});

export default DiverInfo;
