import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Dimensions } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DownloadButton from "../DownloadButton/DownloadButton";
import { ThemeContext } from "../../../Component/Theme/SwitchTheme";

function DiveInformation({ route, navigation }) {
    const { dives } = route.params;
    const [name] = useState(dives?.name || "");
    const [status] = useState(dives?.status || "");
    const [diveSite] = useState(dives?.dive_site || "");
    const [comment] = useState(dives?.comment || "");
    const [director] = useState(dives?.director || "No Director");
    const [beginDate] = useState(new Date(dives?.date_begin) || new Date());
    const [endDate] = useState(new Date(dives?.date_end) || new Date());
    const [numOfPlaces] = useState(dives?.place_number || 0);
    const [placesRegistered] = useState(dives?.registered_place || 0);
    const [diverPrice] = useState(dives?.diver_price || 0);
    const [instructorPrice] = useState(dives?.instructor_price || 0);
    const [surfaceSecurity] = useState(dives?.surface_security || 0);
    const [maxPPO2] = useState(dives?.maxPPO2 || 0);
    const { isDarkModeEnabled } = React.useContext(ThemeContext);
    const getToken = async () => {
        return await AsyncStorage.getItem("token");
    };

    const windowWidth = Dimensions.get("window").width;

    const isSmallScreen = windowWidth < 500;

    return (
        <View style={[styles.container, isDarkModeEnabled && styles.darkContainer]}>
            <View style={[styles.table, isSmallScreen && styles.tableSmallScreen, isDarkModeEnabled && styles.darkTable]}>
                <Text style={[styles.title, isDarkModeEnabled && styles.darkText]}>Informations</Text>
                <View style={styles.row}>
                    <Text style={[styles.label, isDarkModeEnabled && styles.darkText]}>Name:</Text>
                    <Text style={[styles.info, isDarkModeEnabled && styles.darkText]}>{name}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.label, isDarkModeEnabled && styles.darkText]}>Dive Site:</Text>
                    <Text style={[styles.info, isDarkModeEnabled && styles.darkText]}>{diveSite}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.label, isDarkModeEnabled && styles.darkText]}>Status:</Text>
                    <Text style={[styles.info, isDarkModeEnabled && styles.darkText]}>{status}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.label, isDarkModeEnabled && styles.darkText]}>Comment:</Text>
                    <Text style={[styles.info, isDarkModeEnabled && styles.darkText]}>{comment}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={[styles.label, isDarkModeEnabled && styles.darkText]}>Dive Director:</Text>
                    <Text style={[styles.info, isDarkModeEnabled && styles.darkText]}>{director}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.label, isDarkModeEnabled && styles.darkText]}>Begin Date:</Text>
                    <Text style={[styles.info, isDarkModeEnabled && styles.darkText]}>{moment(beginDate).format("YYYY-MM-DD HH:mm")}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.label, isDarkModeEnabled && styles.darkText]}>End Date:</Text>
                    <Text style={[styles.info, isDarkModeEnabled && styles.darkText]}>{moment(endDate).format("YYYY-MM-DD HH:mm")}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.label, isDarkModeEnabled && styles.darkText]}>Number Of places:</Text>
                    <Text style={[styles.info, isDarkModeEnabled && styles.darkText]}>{numOfPlaces.toString()}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.label, isDarkModeEnabled && styles.darkText]}>Number of Registration:</Text>
                    <Text style={[styles.info, isDarkModeEnabled && styles.darkText]}>{placesRegistered.toString()}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.label, isDarkModeEnabled && styles.darkText]}>Diver Price:</Text>
                    <Text style={[styles.info, isDarkModeEnabled && styles.darkText]}>{diverPrice.toString() + '€'}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.label, isDarkModeEnabled && styles.darkText]}>Instructor Price:</Text>
                    <Text style={[styles.info, isDarkModeEnabled && styles.darkText]}>{instructorPrice.toString() + '€'}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.label, isDarkModeEnabled && styles.darkText]}>Surface Security:</Text>
                    <Text style={[styles.info, isDarkModeEnabled && styles.darkText]}>{surfaceSecurity.toString()}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.label, isDarkModeEnabled && styles.darkText]}>Max PP02:</Text>
                    <Text style={[styles.info, isDarkModeEnabled && styles.darkText]}>{maxPPO2.toString()}</Text>
                </View>
                <DownloadButton diveId={dives.id}/>
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
    darkText: {
        color: "#fff",
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
