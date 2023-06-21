import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DownloadButton from "../DownloadButton/DownloadButton";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";


function DiveModification({ route, navigation }) {
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
    const [isEditing, setIsEditing] = useState(false);
    const originalDive = { ...dives }; // Copy of original dive object
    const [diveSitesList, setDiveSitesList] = useState([]); // State for dive sites list

    function formatDate(date) {
        const options = {
            year: "2-digit",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        };
        const formattedDate = date.toLocaleDateString("en-US", options);
        console.log(formattedDate);
        return formattedDate;
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

    const handleSave = async () => {
        const updatedDive = {
            name,
            status,
            dive_site: diveSite, // Convert diveSite to number before saving
            comment,
            date_begin: beginDate.toISOString(),
            date_end: endDate.toISOString(),
            place_number: numOfPlaces,
            registered_place: placesRegistered,
            diver_price: diverPrice,
            instructor_price: instructorPrice,
            surface_security: surfaceSecurity,
            maxPPO2,
        };

        try {
            const token = await getToken();
            await axios.put(`http://93.104.215.68:5000/api/dives/${dives.id}`, updatedDive, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // Update successful, navigate back to Dive Modification
            await setIsEditing(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        // Reset the input fields to their original values
        setName(originalDive.name);
        setStatus(originalDive.status);
        setDiveSite(originalDive.dive_site);
        setComment(originalDive.comment);
        setBeginDate(new Date(originalDive.date_begin));
        setEndDate(new Date(originalDive.date_end));
        setNumOfPlaces(originalDive.place_number);
        setPlacesRegistered(originalDive.registered_place);
        setDiverPrice(originalDive.diver_price);
        setInstructorPrice(originalDive.instructor_price);
        setSurfaceSecurity(originalDive.surface_security);
        setMaxPPO2(originalDive.maxPPO2);
    };

    const getToken = async () => {
        return await AsyncStorage.getItem("token");
    };

    useEffect(() => {
        // Fetch dive sites list from the database
        fetchDiveSites();
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

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.formContainer}>
                    <Text style={styles.label}>Name:</Text>
                    <TextInput style={styles.input} value={name} onChangeText={setName} editable={isEditing} />
                    <Text style={styles.label}>Status:</Text>
                    <TextInput style={styles.input} value={status} onChangeText={setStatus} editable={isEditing} />
                    <Text style={styles.label}>Dive Site:</Text>
                    <RNPickerSelect
                        value={diveSite}
                        onValueChange={setDiveSite}
                        items={diveSitesList.map((site) => ({ label: site.name, value: site.id }))} // Use diveSitesList to populate the picker items
                        disabled={!isEditing}
                        style={pickerSelectStyles}
                        placeholder={{ label: "Select Dive Site", value: null }}
                    />
                    <Text style={styles.label}>Comment:</Text>
                    <TextInput style={styles.input} value={comment} onChangeText={setComment} editable={isEditing} />
                    <Text style={styles.label}>Begin Date:</Text>
                    {isEditing ? (
                        <DateTimePicker
                            value={beginDate}
                            mode="datetime"
                            display="default"
                            onChange={(event, selectedDate) => {
                                if (selectedDate) {
                                    setBeginDate(selectedDate); // Update with the selected date
                                }
                            }}
                        />
                    ) : (
                        <TextInput style={styles.input} value={formatDate(beginDate)} onChangeText={setBeginDate} editable={isEditing} />

                    )}
                    <Text style={styles.label}>End Date:</Text>
                    {isEditing ? (
                        <DateTimePicker
                            value={endDate}
                            mode="datetime"
                            display="default"
                            onChange={(event, selectedDate) => {
                                if (selectedDate) {
                                    setEndDate(selectedDate); // Update with the selected date
                                }
                            }}
                        />
                    ) : (
                        <TextInput style={styles.input} value={formatDate(endDate)} onChangeText={setEndDate} editable={isEditing} />

                    )}
                    <Text style={styles.label}>Number of Places:</Text>
                    <TextInput
                        style={styles.input}
                        value={numOfPlaces.toString()}
                        onChangeText={setNumOfPlaces}
                        editable={isEditing}
                        keyboardType="numeric"
                    />
                    <Text style={styles.label}>Places Registered:</Text>
                    <TextInput
                        style={styles.input}
                        value={registrationPlace(placesRegistered)}
                        onChangeText={setPlacesRegistered}
                        editable={false}
                    />
                    <Text style={styles.label}>Diver Price:</Text>
                    <TextInput style={styles.input} value={diverPrice.toString()} onChangeText={setDiverPrice} editable={isEditing} keyboardType="numeric"/>
                    <Text style={styles.label}>Instructor Price:</Text>
                    <TextInput
                        style={styles.input}
                        value={instructorPrice.toString()}
                        onChangeText={setInstructorPrice}
                        editable={isEditing}
                        keyboardType="numeric"
                    />
                    <Text style={styles.label}>Surface Security:</Text>
                    <TextInput
                        style={styles.input}
                        value={surfaceSecurity.toString()}
                        onChangeText={setSurfaceSecurity}
                        editable={false}
                    />
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
    formContainer: {
        marginBottom: 20,
    },
    label: {
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 4,
        color: "black",
        paddingRight: 30,
        backgroundColor: "#fff",
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    editButton: {
        flex: 1,
        backgroundColor: "#007AFF",
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginLeft: 10,
        alignItems: "center",
        marginBottom: "15%",
    },
    buttonsDandE: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    editButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
    saveButton: {
        backgroundColor: "#4CAF50",
        padding: 10,
        borderRadius: 20,
        flex: 1,
        alignItems: "center",
        marginRight: 10,
        marginBottom: "15%",
    },
    saveButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
    cancelButton: {
        backgroundColor: "#f44336",
        padding: 10,
        borderRadius: 20,
        flex: 1,
        alignItems: "center",
        marginLeft: 10,
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
        borderColor: "gray",
        borderRadius: 4,
        color: "black",
        paddingRight: 30,
        backgroundColor: "#fff",
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: "gray",
        borderRadius: 8,
        color: "black",
        paddingRight: 30,
        backgroundColor: "#fff",
    },
});

export default DiveModification;
