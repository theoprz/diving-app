import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DownloadButton from "../DownloadButton/DownloadButton";
import RNPickerSelect from 'react-native-picker-select';

function DiveModification({ route, navigation }) {
    const { dives } = route.params;
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(dives.name);
    const [status, setStatus] = useState(dives.status);
    const [diveSite, setDiveSite] = useState(dives.dive_site);
    const [comment, setComment] = useState(dives.comment);
    const [beginDate, setBeginDate] = useState(formatDate(dives.date_begin));
    const [endDate, setEndDate] = useState(formatDate(dives.date_end));
    const [numOfPlaces, setNumOfPlaces] = useState(dives.place_number);
    const [placesRegistered, setPlacesRegistered] = useState(dives.registered_place);
    const [diverPrice, setDiverPrice] = useState(dives.diver_price);
    const [instructorPrice, setInstructorPrice] = useState(dives.instructor_price);
    const [surfaceSecurity, setSurfaceSecurity] = useState(dives.surface_security);
    const [maxPPO2, setMaxPPO2] = useState(dives.maxPPO2);
    const originalDive = { ...dives }; // Copy of original dive object
    const [diveSitesList, setDiveSitesList] = useState([]); // State for dive sites list
    diveSitesList.forEach((diveSite) => {
        console.log(diveSite.name);
    })
    function formatDate(date) {
        const formattedDate = new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
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
        console.log(originalDive.dive_site)
        const updatedDive = {
            name: name,
            status: status,
            dive_site: diveSite, // Convert diveSite to number before saving
            comment: comment,
            date_begin: new Date(beginDate),
            date_end: new Date(endDate),
            place_number: numOfPlaces,
            registered_place: placesRegistered,
            diver_price: diverPrice,
            instructor_price: instructorPrice,
            surface_security: surfaceSecurity,
            max_ppo2: maxPPO2,
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
                <Text style={styles.label}>Dive Site: {diveSite}</Text>
                <RNPickerSelect
                    onValueChange={(value) => setDiveSite(value)}
                    style={pickerSelectStyles}
                    items={diveSitesList.map((diveSite) => { return { label: diveSite.name, value: diveSite.id } })}
                    disabled={!isEditing}
                    placeholder={{ label: "Select a dive site", value: null }}
                />
                <Text style={styles.label}>Comment:</Text>
                <TextInput style={styles.input} value={comment} onChangeText={setComment} editable={isEditing} />
                <Text style={styles.label}>Begin Date:</Text>
                <TextInput style={styles.input} value={beginDate} onChangeText={setBeginDate} editable={isEditing} />
                <Text style={styles.label}>End Date:</Text>
                <TextInput style={styles.input} value={endDate} onChangeText={setEndDate} editable={isEditing} />
                <Text style={styles.label}>Number of Places:</Text>
                <TextInput
                    style={styles.input}
                    value={numOfPlaces.toString()}
                    onChangeText={setNumOfPlaces}
                    editable={isEditing}
                />
                <Text style={styles.label}>Places Registered:</Text>
                <TextInput
                    style={styles.input}
                    value={registrationPlace(placesRegistered)}
                    onChangeText={setPlacesRegistered}
                    editable={false}
                />
                <Text style={styles.label}>Diver Price:</Text>
                <TextInput style={styles.input} value={diverPrice.toString()} onChangeText={setDiverPrice} editable={isEditing} />
                <Text style={styles.label}>Instructor Price:</Text>
                <TextInput
                    style={styles.input}
                    value={instructorPrice.toString()}
                    onChangeText={setInstructorPrice}
                    editable={isEditing}
                />
                <Text style={styles.label}>Surface Security:</Text>
                <TextInput
                    style={styles.input}
                    value={surfaceSecurity.toString()}
                    onChangeText={setSurfaceSecurity}
                    editable={false}
                />
                <Text style={styles.label}>Max PPO2:</Text>
                <TextInput style={styles.input} value={maxPPO2} onChangeText={setMaxPPO2} editable={isEditing} />
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
    buttonsDandE: {
        flexDirection: "row-reverse",
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
    }
});

export default DiveModification;
