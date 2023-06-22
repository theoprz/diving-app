import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Switch, StyleSheet, Pressable, TextInput, ScrollView } from 'react-native';
import { BottomMenu, Item } from "react-native-bottom-menu";
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from "axios";
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '../../Component/Theme/SwitchTheme';

async function getToken(){
    return await AsyncStorage.getItem('token');
}

async function setToken(token){
    await AsyncStorage.setItem('token', token);
}

function Settings() {
    const navigation = useNavigation();
    const [personalInformation, setPersonalInformation] = useState({});
    const [modifyInfo, setModifyInfo] = useState(false);
    const [valuesModified, setValuesModified] = useState({});
    const [showCancelButton, setShowCancelButton] = useState(false);
    const { isDarkModeEnabled, toggleDarkMode } = useContext(ThemeContext);
    const [userId, setUserId] = useState();
    async function getData () {
        await axios.post("http://93.104.215.68:5000/api/users/verify", {token: await getToken()}).then(async (response) => {
            if (response.data.success) {
                setUserId(response.data.decoded.id);
            }
        })
    }

    const handleToggleDarkMode = () => {
        toggleDarkMode(!isDarkModeEnabled);
    };

    const handleLogout = () => {
        AsyncStorage.removeItem('token');
        navigation.navigate('Login');
    };
    useEffect(() => {
        getData()
        if (userId) {
            axios
                .get('http://93.104.215.68:5000/api/users/personal/' + userId)
                .then((response) => {
                    setPersonalInformation(response.data[0]);

                })
                .catch((error) => {
                    console.log(error);
                });
        }

    }, [userId]);

    const handleSubmit = () => {
        const updatedValues = { ...valuesModified};
        axios
            .put('http://93.104.215.68:5000/api/users/personal/' + userId, updatedValues)
            .then((response) => {
            })
            .catch((error) => {
                console.log(error);
            });

        setModifyInfo(false);
        setValuesModified({});
        setShowCancelButton(false);
    };

    const handleCancel = () => {
        setModifyInfo(false);
        setValuesModified({});
        setShowCancelButton(false);
    };
    function formatDate(date) {
        if (date) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        } else {
            return "";
        }
    }

    return (
        <View style={[styles.container, isDarkModeEnabled && styles.darkContainer]}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.formContainer}>
                    <View style={styles.sectionContainer}>
                        <Text style={[styles.sectionTitle, isDarkModeEnabled && styles.darkText]}>Personal Information</Text>
                        <View style={styles.row}>
                            <View style={styles.inputContainer}>
                            <Text style={[styles.label, isDarkModeEnabled && styles.darkText]}>First Name</Text>
                                <TextInput
                                    style={[styles.input, isDarkModeEnabled && styles.darkInput]}
                                    defaultValue={personalInformation.first_name}
                                    editable={modifyInfo}
                                    onChangeText={(text) =>
                                        setValuesModified({
                                            ...valuesModified,
                                            first_name: text,
                                        })
                                    }
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={[styles.label, isDarkModeEnabled && styles.darkText]}>Last Name</Text>
                                <TextInput
                                    style={[styles.input, isDarkModeEnabled && styles.darkInput]}
                                    defaultValue={personalInformation.last_name}
                                    editable={modifyInfo}
                                    onChangeText={(text) =>
                                        setValuesModified({
                                            ...valuesModified,
                                            last_name: text,
                                        })
                                    }
                                />
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.inputContainer}>
                                <Text style={[styles.label, isDarkModeEnabled && styles.darkText]}>Birth Date:</Text>
                                {modifyInfo ? (
                                    <DateTimePicker
                                        value={personalInformation.birth_date ? new Date(personalInformation.birth_date) : new Date()}
                                        mode="date"
                                        display="default"
                                        onChange={(event, selectedDate) => {
                                            if (selectedDate && event.nativeEvent.target) {
                                                setValuesModified({ birth_date: formatDate(selectedDate) }); // Mettre à jour la valeur modifiée
                                            }
                                        }}

                                    />
                                ) : (
                                    <TextInput
                                        style={[styles.input, isDarkModeEnabled && styles.darkInput]}
                                        value={personalInformation.birth_date ? formatDate(new Date(personalInformation.birth_date)) : formatDate(new Date())}
                                        editable={false}
                                    />
                                )}
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={[styles.label, isDarkModeEnabled && styles.darkText]}>Password</Text>
                                <TextInput
                                    style={[styles.input, isDarkModeEnabled && styles.darkInput]}
                                    placeholder="********"
                                    value={personalInformation.password}
                                    secureTextEntry
                                    editable={modifyInfo}
                                    onChangeText={(text) =>
                                        setValuesModified({
                                            ...valuesModified,
                                            password: text,
                                        })
                                    }
                                />
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.inputMailContainer}>
                                <Text style={[styles.label, isDarkModeEnabled && styles.darkText]}>Email</Text>
                                <TextInput
                                    style={[styles.input, isDarkModeEnabled && styles.darkInput]}
                                    defaultValue={personalInformation.email}
                                    editable={modifyInfo}
                                    onChangeText={(text) =>
                                        setValuesModified({
                                            ...valuesModified,
                                            email: text,
                                        })
                                    }
                                />
                            </View>
                        </View>
                        <View style={styles.buttonContainer}>
                            {modifyInfo ? (
                                <View style={styles.buttonRow}>
                                    <Pressable style={[styles.cancelButton, isDarkModeEnabled && styles.darkButton]} onPress={handleCancel}>
                                        <Text style={[styles.buttonText, isDarkModeEnabled && styles.darkText]}>Cancel</Text>
                                    </Pressable>
                                    <Pressable style={[styles.submitButton, isDarkModeEnabled && styles.darkSubmitButton]} onPress={handleSubmit}>
                                        <Text style={[styles.buttonText, isDarkModeEnabled && styles.darkText]}>Submit</Text>
                                    </Pressable>
                                </View>
                            ) : (
                                <Pressable
                                    style={[styles.button, showCancelButton && styles.modifyButtonActive, isDarkModeEnabled && styles.darkButton]}
                                    onPress={() => {
                                        setModifyInfo(true);
                                        setShowCancelButton(true);
                                    }}
                                    onPressIn={() => {
                                        setShowCancelButton(true);
                                    }}
                                    onPressOut={() => {
                                        setShowCancelButton(false);
                                    }}
                                >
                                    <Text style={[styles.buttonText, isDarkModeEnabled && styles.darkText]}>Modify</Text>
                                </Pressable>
                            )}
                        </View>
                    </View>
                    <Text style={[styles.title, isDarkModeEnabled && styles.darkText]}>Settings</Text>
                    <View style={styles.settingContainer}>
                        <View style={styles.darkModeContainer}>
                            <View style={styles.darkTextContainer}>
                                <Text style={[styles.settingText, isDarkModeEnabled && styles.darkText]}>Dark Mode</Text>
                            </View>
                            <Switch
                                value={isDarkModeEnabled}
                                onValueChange={handleToggleDarkMode}
                                trackColor={{ false: '#A5FECB', true: '#000' }}
                                thumbColor={isDarkModeEnabled ? '#20BDFF' : '#20BDFF'}
                            />
                        </View>
                        <Pressable style={[styles.logoutButton, isDarkModeEnabled && styles.darkButton]} onPress={handleLogout}>
                            <Text style={[styles.logoutButtonText, isDarkModeEnabled && styles.darkText]}>Logout</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
            <BottomMenu style={styles.bottomMenu}>
                <Item
                    size={22}
                    name="home"
                    text="Home"
                    type="Octicons"
                    onPress={() => {navigation.navigate('Home')}}
                />
                <Item
                    size={22}
                    name="key"
                    text="Dive Director"
                    type="Octicons"
                    onPress={() => {navigation.navigate('Dive Director')}}
                />
                <Item
                    size={22}
                    name="settings"
                    text="Settings"
                    type="gala"
                    onPress={() => {navigation.navigate('Settings')}}
                />
            </BottomMenu>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: hp('100%'),
        backgroundColor: '#fff',
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
        backgroundColor: '#333',
    },
    darkText : {
        color: '#fff',
    },
    darkInput: {
        backgroundColor: '#20BDFF',
        borderColor: '#5433FF',
        shadowRadius: 5,
        shadowOpacity: 0.5,
        shadowColor: '#5433FF',
    },

    scrollContainer: {
        flexGrow: 1,
        paddingBottom: hp('5%'),
        background: 'linear-gradient(to bottom right, #7dd3fc, #a9c7fa)',
    },
    formContainer: {
        flex: 1,
        paddingHorizontal: wp('5%'),
        flexDirection: 'column',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: hp('4%'),
        marginTop: hp('3%'),
    },
    sectionContainer: {
        marginBottom: hp('2%'),
    },
    sectionTitle: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: hp('2%'),
        marginTop: hp('5%'),
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: hp('2%'),
    },
    inputContainer: {
        width: '48%',
        marginBottom: hp('2%'),
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: hp('1%'),
        textAlign: 'center',
    },
    input: {
        textAlign: 'center',
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 20,
        shadowRadius: 5,
        shadowOpacity: 0.5,
        shadowOffset: { width: 1, height: 2 },
        backgroundColor: '#fff',
        padding: 10,
    },
    inputMailContainer: {
        flex:1,
        width: '90%',
        justifyContent: 'center',
    },
    buttonContainer: {
        marginTop: hp('2%'),
        alignItems: 'center',
    },
    bottomMenu: {
        backgroundColor: 'blue', // Change the background color here
    },
    buttonRow: {
        flexDirection: 'row',
    },
    button: {
        backgroundColor: '#20BDFF',
        paddingVertical: hp('2%'),
        paddingHorizontal: wp('5%'),
        borderRadius: 15,
        marginHorizontal: wp('2%'),
    },
    submitButton: {
        backgroundColor: '#A5FECB',
        paddingVertical: hp('2%'),
        paddingHorizontal: wp('5%'),
        borderRadius: 15,
        marginHorizontal: wp('2%'),
    },
    darkSubmitButton: {
      backgroundColor: '#20BDFF',
    },
    modifyButtonActive: {
        backgroundColor: '#5433FF',
    },
    cancelButton: {
        backgroundColor: '#20BDFF',
        paddingVertical: hp('2%'),
        paddingHorizontal: wp('5%'),
        borderRadius: 15,
        marginHorizontal: wp('2%'),
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
    settingContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: hp('5%'),
        marginBottom: hp('10%'),
    },
    darkModeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: wp('5%'),
    },
    darkTextContainer: {
        marginRight: wp('2%'),
    },
    settingText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    logoutButton: {
        marginLeft: wp('5%'),
        backgroundColor: '#000',
        paddingVertical: hp('2%'),
        paddingHorizontal: wp('5%'),
        borderRadius: 20,
    },
    darkButton: {
        backgroundColor: '#20BDFF',
    },
    logoutButtonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default Settings;
