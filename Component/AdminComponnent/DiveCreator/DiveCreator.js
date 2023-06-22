import React, { useState, useEffect, useContext } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";
import { ThemeContext } from "../.././Theme/SwitchTheme";

function DiveCreator() {
    const navigation = useNavigation();
    const [name, setName] = useState("");
    const [status, setStatus] = useState("1");
    const [diveSite, setDiveSite] = useState("");
    const [comment, setComment] = useState("");
    const [beginDate, setBeginDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [numOfPlaces, setNumOfPlaces] = useState(null);
    const [placesRegistered] = useState(0);
    const [diverPrice, setDiverPrice] = useState(null);
    const [instructorPrice, setInstructorPrice] = useState(null);
    const [surfaceSecurity] = useState("");
    const [maxPPO2, setMaxPPO2] = useState(null);
    const [director, setDirector] = useState("");
    const [diveSitesList, setDiveSitesList] = useState([]); // State for dive sites list
    const [adminList, setAdminList] = useState([]); // State for dive sites list
    const { isDarkModeEnabled } = useContext(ThemeContext); // Dark Mode

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
        if (!name) {
            Alert.alert("Error", "Invalid name.");
            return false;
        }
        // Vérifier que le nombre de places est supérieur à 1
        if (numOfPlaces < 2) {
            Alert.alert("Error", "Number of places must be greater than 1.");
            return false;
        }

        //Vérifier que max PPO2 est supérieur à 0,16 et inférieur ou égal à 1,6
        if (maxPPO2 < 0.16 || maxPPO2 > 1.6) {
            Alert.alert("Error", "Max PPO2 must be between 0.16 and 1.6.");
            return false;
        }
        const selectedDirector = adminList.find((director) => director.id === director);
        if (!selectedDirector) {
            Alert.alert("Error", "Invalid Dive Director.");
            return;
        }
        return true;
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
            registered_place: placesRegistered,
            diver_price: diverPrice,
            instructor_price: instructorPrice,
            surface_security: surfaceSecurity,
            max_ppo2: maxPPO2,
            director: director,
        };
        console.log(newDive);
        try {
            const token = await AsyncStorage.getItem("token");
            await axios.post("http://93.104.215.68:5000/api/dives/add", newDive, {});
            // La plongée a été créée avec succès
            // Rediriger vers une autre page ou effectuer une autre action
            navigation.navigate("Dive Management");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={[styles.container, isDarkModeEnabled && styles.darkContainer]}>
            <ScrollView>
                <View style={styles.formContainer}>
                    <Text style={[styles.label, isDarkModeEnabled && styles.darkText]}>Name:</Text>
                    <TextInput style={[styles.input, isDarkModeEnabled && styles.darkText]} value={name} onChangeText={setName} />
                    <Text style={[styles.label, isDarkModeEnabled && styles.darkText]}>Status:</Text>
                    <TextInput style={[styles.input, isDarkModeEnabled && styles.darkText]} value={status === "1" ? "Open" : ""} onChangeText={setStatus} editable={false}/>
                    <Text style={[styles.label, isDarkModeEnabled && styles.darkText]}>Dive Site:</Text>
                    <RNPickerSelect
                        onValueChange={(value) => setDiveSite(value)}
                        style={pickerSelectStyles}
                        items={diveSitesList.map((diveSite) => { return { label: diveSite.name, value: diveSite.id } })}
                        placeholder={{ label: "Select a dive site", value: null }}
                    />
                    <Text style={[styles.label, isDarkModeEnabled && styles.darkText]}>Comment:</Text>
                    <TextInput style={[styles.input, isDarkModeEnabled && styles.darkText]} value={comment} onChangeText={setComment} />
                    <Text style={[styles.label, isDarkModeEnabled && styles.darkText]}>Begin Date:</Text>
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
                    <Text style={[styles.label, isDarkModeEnabled && styles.darkText]}>End Date:</Text>
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
                    <Text style={[styles.label, isDarkModeEnabled && styles.darkText]}>Number of Places:</Text>
                    <TextInput
                        style={[styles.input, isDarkModeEnabled && styles.darkText]}
                        value={numOfPlaces ? numOfPlaces.toString() : ""}
                        onChangeText={(text) => setNumOfPlaces(parseInt(text))}
                        keyboardType="numeric"
                        shadowColor="#000"
                        shadowOpacity={0.2}
                        shadowOffset={{
                            width: 0,
                            height: 2,
                        }}
                        shadowRadius={2}
                    />
                    <Text style={[styles.label, isDarkModeEnabled && styles.darkText]}>Diver Price:</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[styles.input, isDarkModeEnabled && styles.darkText]}
                            value={diverPrice ? diverPrice.toString() : ""}
                            onChangeText={(text) => setDiverPrice(parseFloat(text))}
                            keyboardType="numeric"
                            shadowColor="#000"
                            shadowOpacity={0.2}
                            shadowOffset={{
                                width: 0,
                                height: 2,
                            }}
                            shadowRadius={2}
                        />
                    </View>
                    <Text style={[styles.label, isDarkModeEnabled && styles.darkText]}>Instructor Price:</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[styles.input, isDarkModeEnabled && styles.darkText]}
                            value={instructorPrice ? instructorPrice.toString() : ""}
                            onChangeText={(text) => setInstructorPrice(parseFloat(text))}
                            keyboardType="numeric"
                            shadowColor="#000"
                            shadowOpacity={0.2}
                            shadowOffset={{
                                width: 0,
                                height: 2,
                            }}
                            shadowRadius={2}
                        />
                    </View>
                    <Text style={[styles.label, isDarkModeEnabled && styles.darkText]}>Max PPO2:</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[styles.input, isDarkModeEnabled && styles.darkText]}
                            value={maxPPO2 ? maxPPO2.toString().replace('.', ',') : ""}
                            onChangeText={(text) => setMaxPPO2(text.replace(',', '.'))}
                            keyboardType="numeric"
                            shadowColor="#000"
                            shadowOpacity={0.2}
                            shadowOffset={{
                                width: 0,
                                height: 2,
                            }}
                            shadowRadius={2}
                        />
                    </View>
                    <Text style={[styles.label, isDarkModeEnabled && styles.darkText]}>Dive Director:</Text>
                    <RNPickerSelect
                        onValueChange={(value) => setDirector(value)}
                        style={pickerSelectStyles}
                        items={adminList.map((director) => { return { label:`${director.last_name} ${director.first_name}`, value: director.id } })}
                        placeholder={{ label: "Select a Dive Director", value: null }}
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
        backgroundColor: "#fff",
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowRadius: 4,
        elevation: 4,
    },
    darkContainer: {
        backgroundColor: "#333",
    },
    formContainer: {
        marginBottom: "10%",
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
        marginTop: 10,
        marginHorizontal: "5%",
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
    darkText: {
        color: "#fff",
    },
    priceInputContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    priceInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#ccc",
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 10,
        marginBottom: 10,
    },
    button: {
        flex:1,
        alignSelf: "center",
        backgroundColor: "#20BDFF",
        padding: 10,
        borderRadius: 20,
        alignItems: "center",
        marginBottom: "10%",
        width: "50%",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
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

export default DiveCreator;
