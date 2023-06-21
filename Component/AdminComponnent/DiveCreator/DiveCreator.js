import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";

function DiveCreator() {
    const navigation = useNavigation();
    const [name, setName] = useState("");
    const [status, setStatus] = useState("1");
    const [diveSite, setDiveSite] = useState("");
    const [comment, setComment] = useState("");
    const [beginDate, setBeginDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [numOfPlaces, setNumOfPlaces] = useState(null);
    const [diverPrice, setDiverPrice] = useState(null);
    const [instructorPrice, setInstructorPrice] = useState(null);
    const [surfaceSecurity, setSurfaceSecurity] = useState("");
    const [maxPPO2, setMaxPPO2] = useState(0);

    const formatDate = (date) => {
        const formattedDate = moment(date).format("YYYY-MM-DD HH:mm:ss");
        return formattedDate;
    };

    const validateDate = () => {
        const currentDate = new Date();
        if (beginDate <= currentDate || beginDate >= endDate) {
            return false;
        }
        return true;
    };

    const validateFields = () => {
        // Vérifier que begin date est avant end date et après la date d'aujourd'hui
        if (!validateDate()) {
            Alert.alert("Error", "Invalid date range.");
            return false;
        }
        if(!name) {
            Alert.alert("Error", "Invalid name.");
            return false;
        }
        // Vérifier que le nombre de places est supérieur à 1
        if (numOfPlaces < 2) {
            Alert.alert("Error", "Number of places must be greater than 1.");
            return false;
        }

        // Vérifier que surface security est vide
        if (surfaceSecurity.trim() !== "") {
            Alert.alert("Error", "Surface security must be empty.");
            return false;
        }

        // Vérifier que maxPPO2 est un nombre
        if (isNaN(maxPPO2)) {
            Alert.alert("Error", "Invalid maxPPO2 value.");
            return false;
        }
        console.log("done")

        return true;
    };

    const handleSave = async () => {
        if (!validateFields()) {
            return;
        }

        const newDive = {
            name,
            status: status,
            dive_site: diveSite,
            comment,
            date_begin: formatDate(beginDate),
            date_end: formatDate(endDate),
            place_number: numOfPlaces,
            diver_price: diverPrice,
            instructor_price: instructorPrice,
            surface_security: surfaceSecurity,
            maxPPO2,
        };

        try {
            const token = await AsyncStorage.getItem("token");
            await axios.post("http://93.104.215.68:5000/api/dives", newDive, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // La plongée a été créée avec succès
            // Rediriger vers une autre page ou effectuer une autre action
            navigation.navigate("Dive Management");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.formContainer}>
                    <Text style={styles.label}>Name:</Text>
                    <TextInput style={styles.input} value={name} onChangeText={setName} />
                    <Text style={styles.label}>Status:</Text>
                    <TextInput style={styles.input} value={status === "1" ? "Open" : ""} onChangeText={setStatus} editable={false}/>
                    <Text style={styles.label}>Dive Site:</Text>
                    <TextInput style={styles.input} value={diveSite} onChangeText={setDiveSite} />
                    <Text style={styles.label}>Comment:</Text>
                    <TextInput style={styles.input} value={comment} onChangeText={setComment} />
                    <Text style={styles.label}>Begin Date:</Text>
                    <DateTimePicker
                        value={beginDate}
                        mode="datetime"
                        display="default"
                        onChange={(event, selectedDate) => {
                            if (selectedDate) {
                                setBeginDate(selectedDate);
                            }
                        }}
                    />
                    <Text style={styles.label}>End Date:</Text>
                    <DateTimePicker
                        value={endDate}
                        mode="datetime"
                        display="default"
                        onChange={(event, selectedDate) => {
                            if (selectedDate) {
                                setEndDate(selectedDate);
                            }
                        }}
                    />
                    <Text style={styles.label}>Number of Places:</Text>
                    <TextInput
                        style={styles.input}
                        value={numOfPlaces ? numOfPlaces.toString() : ""}
                        onChangeText={(text) => setNumOfPlaces(parseInt(text))}
                        keyboardType="numeric"
                    />
                    <Text style={styles.label}>Diver Price:</Text>
                    <TextInput
                        style={styles.input}
                        value={diverPrice ? diverPrice.toString() : ""}
                        onChangeText={(text) => setDiverPrice(parseFloat(text))}
                        keyboardType="numeric"
                    />
                    <Text style={styles.label}>Instructor Price:</Text>
                    <TextInput
                        style={styles.input}
                        value={instructorPrice ? instructorPrice.toString() : ""}
                        onChangeText={(text) => setInstructorPrice(parseFloat(text))}
                        keyboardType="numeric"
                    />
                    <Text style={styles.label}>Surface Security:</Text>
                    <TextInput
                        style={styles.input}
                        value={surfaceSecurity.toString()}
                        onChangeText={(text) => setSurfaceSecurity(text)}
                    />
                    <Text style={styles.label}>Max PPO2:</Text>
                    <TextInput
                        style={styles.input}
                        value={maxPPO2.toString()}
                        onChangeText={(text) => setMaxPPO2(parseInt(text))}
                        keyboardType="numeric"
                    />
                </View>
                <TouchableOpacity style={styles.button} onPress={handleSave}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
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
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 4,
        padding: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: "blue",
        padding: 10,
        borderRadius: 4,
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default DiveCreator;
