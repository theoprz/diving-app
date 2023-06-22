import React, {useContext, useEffect, useState} from "react";
import {View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DownloadButton from "../DownloadButton/DownloadButton";
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import { ThemeContext } from "../../../Component/Theme/SwitchTheme";



function DiveModification({ route, navigation }) {
    const { dives } = route.params;
    const [name, setName] = useState(dives?.name || "");
    const [status, setStatus] = useState(dives?.status || 1);
    const [diveSite, setDiveSite] = useState(dives?.dive_site || "");
    const [comment, setComment] = useState(dives?.comment || "");
    const [beginDate, setBeginDate] = useState(formatDate(dives?.date_begin) ?? formatDate(new Date()));
    const [endDate, setEndDate] = useState(formatDate(dives?.date_end) ?? formatDate(new Date()));
    const [numOfPlaces, setNumOfPlaces] = useState(dives?.place_number || 0);
    const [placesRegistered, setPlacesRegistered] = useState(dives?.registered_place || 0);
    const [diverPrice, setDiverPrice] = useState(dives?.diver_price || 0);
    const [instructorPrice, setInstructorPrice] = useState(dives?.instructor_price || 0);
    const [surfaceSecurity, setSurfaceSecurity] = useState(dives?.surface_security || 0);
    const [maxPPO2, setMaxPPO2] = useState(dives?.max_ppo2 || 0);
    const [director, setDirector] = useState(dives?.director || "");
    const [isEditing, setIsEditing] = useState(false);
    const originalDive = { ...dives }; // Copy of original dive object
    const [diveSitesList, setDiveSitesList] = useState([]); // State for dive sites list
    const [adminList, setAdminList] = useState([]); // State for admin list
    const {isDarkModeEnabled} = useContext(ThemeContext); // DarkMode

    function formatDate(date) {
        if (date instanceof Date) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            const hours = String(date.getHours()).padStart(2, "0");
            const minutes = String(date.getMinutes()).padStart(2, "0");
            return `${year}-${month}-${day} ${hours}:${minutes}`;
        } else if (typeof date === "string") {
            // Assuming the input is already in the desired format
            return date;
        } else {
            return "";
        }
    }
    function registrationPlace(placesRegistered) {
        if (placesRegistered === 0) {
            return "No registration";
        } else if (placesRegistered === 1) {
            return "1 registration";
        } else {
            return `${placesRegistered} registrations`;
        }
    }

    const handleEdit = () => {
        setIsEditing(true);
    };
    const validateFields = async () => {
        if (name === "") {
            Alert.alert("Error", "Invalid date range.");
            return false;
        }
        if (beginDate > endDate) {
            Alert.alert("Error", "Invalid date range.");
            return false;
        }
        if (numOfPlaces <= placesRegistered) {
            Alert.alert("Error", "Invalid number of places.");
            return false;
        }
        if (diverPrice < 0 || instructorPrice < 0) {
            Alert.alert("Error", "Invalid price.");
            return false;
        }
        if (maxPPO2 < 0.16 || maxPPO2 > 1.6) {
            Alert.alert("Error", "Invalid PPO2.");
            return false;
        }

        return true;
    }

    const handleSave = async () => {
        if (!validateFields()) {
            return;
        }
        const updatedDive = {
            name: name,
            dive_site: diveSite, // Convert diveSite to number before saving
            comment: comment,
            date_begin: formatDate(beginDate),
            date_end: formatDate(endDate),
            place_number: numOfPlaces,
            registered_place: placesRegistered,
            diver_price: diverPrice,
            instructor_price: instructorPrice,
            surface_security: surfaceSecurity,
            max_ppo2: maxPPO2,
            director: director,
        };

        const token = await getToken();
        await axios.put(`http://93.104.215.68:5000/api/dives/update/${originalDive.id}`, updatedDive, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            console.log(response.status);
        });
        // Update successful, navigate back to Dive Modification
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
        // Reset the input fields to their original values
        setName(originalDive.name);
        setStatus(originalDive.status);
        setDiveSite(originalDive.dive_site);
        setComment(originalDive.comment);
        setBeginDate(formatDate(originalDive.date_begin));
        setEndDate(formatDate(originalDive.date_end));
        setNumOfPlaces(originalDive.place_number);
        setPlacesRegistered(originalDive.registered_place);
        setDiverPrice(originalDive.diver_price);
        setInstructorPrice(originalDive.instructor_price);
        setSurfaceSecurity(originalDive.surface_security);
        setMaxPPO2(originalDive.maxPPO2);
        setDirector(originalDive.director);
    };

    const getToken = async () => {
        return await AsyncStorage.getItem("token");
    };

    useEffect(() => {
        // Fetch dive sites list from the database
        fetchDiveSites();
        fetchAdmin();
    }, []);

    async function fetchDiveSites() {
        try {
            const response = await axios.get("http://93.104.215.68:5000/api/sites/all");
            const sites = response.data;
            setDiveSitesList(sites);
        } catch (error) {
            console.log(error);
        }
    }

    async function fetchAdmin() {
        try {
            const response = await axios.get("http://93.104.215.68:5000/api/users/admin");
            const admins = response.data;
            setAdminList(admins);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={[styles.container, isDarkModeEnabled && styles.darkContainer]}>
            <ScrollView>
                <View style={styles.formContainer}>
                    <Text style={[styles.label, isDarkModeEnabled && styles.darkLabel]}>Name:</Text>
                    <TextInput style={[styles.input, isDarkModeEnabled && styles.darkInput]} value={name} onChangeText={setName} editable={isEditing} />
                    <Text style={[styles.label, isDarkModeEnabled && styles.darkLabel]}>Status:</Text>
                    <TextInput style={[styles.input, isDarkModeEnabled && styles.darkInput]} value={status} onChangeText={setStatus} editable={isEditing} />
                    <Text style={[styles.label, isDarkModeEnabled && styles.darkLabel]}>Dive Site:</Text>
                    {isEditing ? (
                        <RNPickerSelect
                            onValueChange={(value) => setDiveSite(value)}
                            style={pickerSelectStyles}
                            items={diveSitesList.map((diveSite) => { return { label: diveSite.name, value: diveSite.id } })}
                            disabled={!isEditing}
                            placeholder={{ label: "Select a dive site", value: null }}
                        />
                    ) : (
                        <TextInput style={[styles.input, isDarkModeEnabled && styles.darkInput]} value={diveSite} editable={false} />
                    )}
                    <Text style={[styles.label, isDarkModeEnabled && styles.darkLabel]}>Comment:</Text>
                    <TextInput style={[styles.input, isDarkModeEnabled && styles.darkInput]} value={comment} onChangeText={setComment} editable={isEditing} />
                    <Text style={[styles.label, isDarkModeEnabled && styles.darkLabel]}>Begin Date:</Text>
                    {isEditing ? (
                        <DateTimePicker
                            value={beginDate ? new Date(beginDate) : new Date()}
                            mode="datetime"
                            display="default"
                            onChange={(event, selectedDate) => {
                                if (selectedDate) {
                                    setBeginDate(formatDate(selectedDate)); // Update with the selected date
                                }
                            }}
                        />
                    ) : (
                        <TextInput style={[styles.input, isDarkModeEnabled && styles.darkInput]} value={beginDate ? formatDate(new Date(beginDate)) : formatDate(new Date())} onChangeText={setBeginDate} editable={isEditing} />

                    )}
                    <Text style={[styles.label, isDarkModeEnabled && styles.darkLabel]}>End Date:</Text>
                    {isEditing ? (
                        <DateTimePicker
                            value={endDate ? new Date(endDate) : new Date()}
                            mode="datetime"
                            display="default"
                            onChange={(event, selectedDate) => {
                                if (selectedDate && event.nativeEvent.target) {
                                    setEndDate(formatDate(selectedDate)); // Update with the selected date
                                }
                            }}
                        />
                    ) : (
                        <TextInput style={[styles.input, isDarkModeEnabled && styles.darkInput]} value={endDate ? formatDate(new Date(endDate)) : formatDate(new Date())} onChangeText={setEndDate} editable={isEditing} />
                    )}
                    <Text style={[styles.label, isDarkModeEnabled && styles.darkLabel]}>Number of Places:</Text>
                    <TextInput
                        style={[styles.input, isDarkModeEnabled && styles.darkInput]}
                        value={numOfPlaces.toString()}
                        onChangeText={setNumOfPlaces}
                        editable={isEditing}
                        keyboardType="numeric"
                    />
                    <Text style={[styles.label, isDarkModeEnabled && styles.darkLabel]}>Places Registered:</Text>
                    <TextInput
                        style={[styles.input, isDarkModeEnabled && styles.darkInput]}
                        value={registrationPlace(placesRegistered)}
                        onChangeText={setPlacesRegistered}
                        editable={false}
                    />
                    <Text style={[styles.label, isDarkModeEnabled && styles.darkLabel]}>Diver Price:</Text>
                    <TextInput style={[styles.input, isDarkModeEnabled && styles.darkInput]} value={diverPrice.toString()} onChangeText={setDiverPrice} editable={isEditing} keyboardType="numeric"/>
                    <Text style={[styles.label, isDarkModeEnabled && styles.darkLabel]}>Instructor Price:</Text>
                    <TextInput
                        style={[styles.input, isDarkModeEnabled && styles.darkInput]}
                        value={instructorPrice.toString()}
                        onChangeText={setInstructorPrice}
                        editable={isEditing}
                        keyboardType="numeric"
                    />
                    <Text style={[styles.label, isDarkModeEnabled && styles.darkLabel]}>Surface Security:</Text>
                    <TextInput
                        style={[styles.input, isDarkModeEnabled && styles.darkInput]}
                        value={surfaceSecurity.toString()}
                        onChangeText={setSurfaceSecurity}
                        editable={false}
                    />
                    <Text style={[styles.label, isDarkModeEnabled && styles.darkLabel]}>Max PPO2:</Text>
                    <TextInput
                        style={[styles.input, isDarkModeEnabled && styles.darkInput]}
                        value={maxPPO2 ? maxPPO2.toString().replace('.', ',') : ""}
                        onChangeText={(text) => setMaxPPO2(text.replace(',', '.'))}
                        editable={isEditing}
                        keyboardType="numeric"
                    />
                    <Text style={[styles.label, isDarkModeEnabled && styles.darkLabel]}>Dive Director:</Text>
                    {isEditing ? (
                        <RNPickerSelect
                            onValueChange={(value) => setDirector(value)}
                            style={pickerSelectStyles}
                            items={adminList.map((director) => { return { label:`${director.last_name} ${director.first_name}`, value: director.id } })}
                            placeholder={{ label: "Select a Dive Director", value: null }}
                        />
                    ) : (
                        <TextInput style={[styles.input, isDarkModeEnabled && styles.darkInput]} value={director} editable={false} />
                    )}
                </View>
                {!isEditing ? (
                        <View style={styles.buttonsDandE}>
                            <DownloadButton diveId={dives.id}/>
                            <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
                                <Text style={styles.editButtonText}>Edit</Text>
                            </TouchableOpacity>
                        </View>




                    ) : (
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                            <Text style={styles.saveButtonText}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                )}

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
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
    formContainer: {
        marginBottom: 20,
    },
    label: {
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 5,
        marginTop: 10,
        marginHorizontal: "5%",
    },
    darkLabel: {
        color: "#fff",
    },
    darkInput: {
        backgroundColor: "#20BDFF",
        color: "#fff",
        shadowColor: '#5433FF',
        shadowOpacity: 0.5,
        shadowOffset: {
            width: 1,
            height: 5,
        },
        shadowRadius: 4,
    },
    input: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 15,
        color: "black",
        backgroundColor: "#20BDFF",
        marginHorizontal: "5%",
        shadowColor: '#5433FF',
        shadowOpacity: 0.3,
        shadowOffset: {
            width: 1,
            height: 5,
        },
        shadowRadius: 4,
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonsDandE: {
        flexDirection: "row",
        justifyContent: "center",
    },
    editButton: {
        backgroundColor: "#20BDFF",
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: "center",
        marginBottom: "10%",
        width: "40%",
    },
    editButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
    saveButton: {
        backgroundColor: "#A5FECB",
        padding: 10,
        borderRadius: 20,
        flex: 1,
        alignItems: "center",
        marginLeft: "5%",
        marginBottom: "15%",

    },
    saveButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
    cancelButton: {
        backgroundColor: "#5433FF",
        padding: 10,
        borderRadius: 20,
        flex: 1,
        alignItems: "center",
        marginLeft: 10,
        marginRight: "5%",
        marginBottom: "15%",
    },
    cancelButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 15,
        color: "black",
        marginHorizontal: "5%",
        backgroundColor: "#20BDFF",
        shadowColor: '#5433FF',
        shadowOpacity: 0.3,
        shadowOffset: {
            width: 1,
            height: 5,
        },
        shadowRadius: 4,
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: "black",
        borderRadius: 15,
        color: "black",
        marginHorizontal: "5%",
        backgroundColor: "#20BDFF",
        shadowColor: '#5433FF',
        shadowOpacity: 0.3,
        shadowOffset: {
            width: 1,
            height: 5,
        },
        shadowRadius: 4,
    },
});

export default DiveModification;
