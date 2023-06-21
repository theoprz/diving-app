import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Switch, StyleSheet, Pressable, TextInput, ScrollView } from 'react-native';
import { BottomMenu, Item } from "react-native-bottom-menu";
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from "axios";
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '../../Component/Theme/SwitchTheme';

function Settings(props) {
    const navigation = useNavigation();
    const [personalInformation, setPersonalInformation] = useState({});
    const [modifyInfo, setModifyInfo] = useState(false);
    const [valuesModified, setValuesModified] = useState({});
    const [showCancelButton, setShowCancelButton] = useState(false);
    const [birthDate, setBirthDate] = useState(personalInformation.birth_date ? personalInformation.birth_date.slice(0, 10) : '');
    const { isDarkModeEnabled, toggleDarkMode } = useContext(ThemeContext);

    const handleToggleDarkMode = () => {
        toggleDarkMode(!isDarkModeEnabled);
    };

    const handleLogout = () => {
        AsyncStorage.removeItem('token');
        navigation.navigate('Login');
    };

    useEffect(() => {
        if (props.userId) {
            axios
                .get('/api/users/personal/' + props.userId)
                .then((response) => {
                    setPersonalInformation(response.data[0]);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [props.userId]);

    const handleSubmit = () => {
        const updatedValues = { ...valuesModified, birth_date: birthDate };
        axios
            .put('/api/users/personal/' + props.userId, updatedValues)
            .then((response) => {
                console.log(response);
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

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.formContainer}>
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>Personal Information</Text>
                        <View style={styles.row}>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>First Name</Text>
                                <TextInput
                                    style={styles.input}
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
                                <Text style={styles.label}>Last Name</Text>
                                <TextInput
                                    style={styles.input}
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
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Email</Text>
                                <TextInput
                                    style={styles.input}
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
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Birth Date:</Text>
                                {modifyInfo ? (
                                    <DateTimePicker
                                        value={birthDate ? new Date(birthDate) : new Date()}
                                        mode="date"
                                        display="default"
                                        onChange={(event, selectedDate) => {
                                            if (selectedDate) {
                                                setBirthDate(selectedDate.toISOString().slice(0, 10)); // Mettre à jour avec la valeur formatée
                                            }
                                        }}
                                    />
                                ) : (
                                    <TextInput
                                        style={styles.input}
                                        value={birthDate} // Use the 'value' prop instead of 'defaultValue'
                                        editable={modifyInfo}
                                        onChangeText={(text) =>
                                            setValuesModified({
                                                ...valuesModified,
                                                birth_date: text,
                                            })
                                        }
                                    />
                                )}
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Password</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="********"
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
                        <View style={styles.buttonContainer}>
                            {modifyInfo ? (
                                <View style={styles.buttonRow}>
                                    <Pressable style={styles.cancelButton} onPress={handleCancel}>
                                        <Text style={styles.buttonText}>Cancel</Text>
                                    </Pressable>
                                    <Pressable style={styles.button} onPress={handleSubmit}>
                                        <Text style={styles.buttonText}>Submit</Text>
                                    </Pressable>
                                </View>
                            ) : (
                                <Pressable
                                    style={[styles.button, showCancelButton && styles.modifyButtonActive]}
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
                                    <Text style={styles.buttonText}>Modify</Text>
                                </Pressable>
                            )}
                        </View>
                    </View>
                    <Text style={styles.title}>Settings</Text>
                    <View style={styles.settingContainer}>
                        <View style={styles.darkContainer}>
                            <View style={styles.darkTextContainer}>
                                <Text style={styles.settingText}>Dark Mode</Text>
                            </View>
                            <Switch
                                value={isDarkModeEnabled}
                                onValueChange={handleToggleDarkMode}
                                trackColor={{ false: '#111', true: '#7dd3fc' }}
                                thumbColor={isDarkModeEnabled ? '#333333' : '#666666'}
                            />
                        </View>
                        <Pressable style={styles.logoutButton} onPress={handleLogout}>
                            <Text style={styles.logoutButtonText}>Logout</Text>
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
                    onPress={() => {navigation.navigate('Instructor')}}
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
        backgroundColor: '#8F908D',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 0,
            height: -4,
        },
        shadowRadius: 4,
        elevation: 4,
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
        marginTop: hp('10%'),
    },
    sectionContainer: {
        marginBottom: hp('2%'),
    },
    sectionTitle: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: hp('2%'),
        marginTop: hp('10%'),
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
    },
    input: {
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 5,
        shadowRadius: 5,
        shadowOpacity: 0.5,
        shadowOffset: { width: 1, height: 2 },
        backgroundColor: '#fff',
        padding: 10,
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
        backgroundColor: '#33abff',
        paddingVertical: hp('1%'),
        paddingHorizontal: wp('3%'),
        borderRadius: 5,
        marginHorizontal: wp('1%'),
    },
    modifyButtonActive: {
        backgroundColor: '#7dd3fc',
    },
    cancelButton: {
        backgroundColor: '#0078cc',
        paddingVertical: hp('1%'),
        paddingHorizontal: wp('3%'),
        borderRadius: 5,
        marginHorizontal: wp('1%'),
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
    darkContainer: {
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
        backgroundColor: '#f44336',
        paddingVertical: hp('1%'),
        paddingHorizontal: wp('3%'),
        borderRadius: 5,
    },
    logoutButtonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default Settings;
