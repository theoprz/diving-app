import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Picker, Pressable } from 'react-native';
import axios from 'axios';

function DiverInfo(props) {
    const [personalInformation, setPersonalInformation] = useState({});
    const [modifyInfo, setModifyInfo] = useState(false);
    const [valuesModified, setValuesModified] = useState({});

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
        axios
            .put('/api/users/personal/' + props.userId, valuesModified)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });

        setModifyInfo(false);
        setValuesModified({});
    };

    return (
        <View>
            {Object.keys(personalInformation).length === 0 ? (
                <Text>Loading...</Text>
            ) : (
                <View>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 6 }}>
                        Personal Information
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1, marginBottom: 4 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                                First Name
                            </Text>
                            <TextInput
                                style={{
                                    width: '100%',
                                    padding: 8,
                                    borderColor: 'gray',
                                    borderWidth: 1,
                                    borderRadius: 5,
                                }}
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
                        <View style={{ flex: 1, marginBottom: 4 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                                Last Name
                            </Text>
                            <TextInput
                                style={{
                                    width: '100%',
                                    padding: 8,
                                    borderColor: 'gray',
                                    borderWidth: 1,
                                    borderRadius: 5,
                                }}
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
                        <View style={{ flex: 1, marginBottom: 4 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Email</Text>
                            <TextInput
                                style={{
                                    width: '100%',
                                    padding: 8,
                                    borderColor: 'gray',
                                    borderWidth: 1,
                                    borderRadius: 5,
                                }}
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
                        <View style={{ flex: 1, marginBottom: 4 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                                Birth Date:
                            </Text>
                            <TextInput
                                style={{
                                    width: '100%',
                                    padding: 8,
                                    borderColor: 'gray',
                                    borderWidth: 1,
                                    borderRadius: 5,
                                }}
                                defaultValue={personalInformation.birth_date.slice(0, 10)}
                                editable={modifyInfo}
                                onChangeText={(text) =>
                                    setValuesModified({
                                        ...valuesModified,
                                        birth_date: text,
                                    })
                                }
                            />
                        </View>
                        <View style={{ flex: 1, marginBottom: 4 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                                Password
                            </Text>
                            <TextInput
                                style={{
                                    width: '100%',
                                    padding: 8,
                                    borderColor: 'gray',
                                    borderWidth: 1,
                                    borderRadius: 5,
                                }}
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
                        <View style={{ flex: 1, marginBottom: 4 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Theme</Text>
                            <Picker
                                style={{
                                    width: '100%',
                                    padding: 8,
                                    borderColor: 'gray',
                                    borderWidth: 1,
                                    borderRadius: 5,
                                }}
                                selectedValue={personalInformation.theme}
                                enabled={modifyInfo}
                                onValueChange={(itemValue) =>
                                    setValuesModified({
                                        ...valuesModified,
                                        theme: itemValue,
                                    })
                                }>
                                <Picker.Item label="test" value="" />
                                <Picker.Item label="Light" value="light" />
                                <Picker.Item label="Dark" value="dark" />
                            </Picker>
                        </View>
                    </View>

                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 6 }}>
                        Diving Information
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1, marginBottom: 4 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                                Diver Qualification
                            </Text>
                            <TextInput
                                style={{
                                    width: '100%',
                                    padding: 8,
                                    borderColor: 'gray',
                                    borderWidth: 1,
                                    borderRadius: 5,
                                }}
                                defaultValue={personalInformation.diver_qualification}
                                editable={false}
                            />
                        </View>
                        <View style={{ flex: 1, marginBottom: 4 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                                Instructor Qualification
                            </Text>
                            <TextInput
                                style={{
                                    width: '100%',
                                    padding: 8,
                                    borderColor: 'gray',
                                    borderWidth: 1,
                                    borderRadius: 5,
                                }}
                                defaultValue={personalInformation.instructor_qualification}
                                editable={false}
                            />
                        </View>
                        <View style={{ flex: 1, marginBottom: 4 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                                Nitrox Qualification
                            </Text>
                            <TextInput
                                style={{
                                    width: '100%',
                                    padding: 8,
                                    borderColor: 'gray',
                                    borderWidth: 1,
                                    borderRadius: 5,
                                }}
                                defaultValue={personalInformation.nitrox_qualification}
                                editable={false}
                            />
                        </View>
                        <View style={{ flex: 1, marginBottom: 4 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                                Additional Qualification
                            </Text>
                            <TextInput
                                style={{
                                    width: '100%',
                                    padding: 8,
                                    borderColor: 'gray',
                                    borderWidth: 1,
                                    borderRadius: 5,
                                }}
                                defaultValue={personalInformation.additional_qualification}
                                editable={false}
                            />
                        </View>
                        <View style={{ flex: 1, marginBottom: 4 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                                License Number
                            </Text>
                            <TextInput
                                style={{
                                    width: '100%',
                                    padding: 8,
                                    borderColor: 'gray',
                                    borderWidth: 1,
                                    borderRadius: 5,
                                }}
                                defaultValue={personalInformation.license_number}
                                editable={false}
                            />
                        </View>
                        <View style={{ flex: 1, marginBottom: 4 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                                License Expiration Date
                            </Text>
                            <TextInput
                                style={{
                                    width: '100%',
                                    padding: 8,
                                    borderColor: 'gray',
                                    borderWidth: 1,
                                    borderRadius: 5,
                                }}
                                defaultValue={personalInformation.license_expiration_date.slice(
                                    0,
                                    10
                                )}
                                editable={false}
                            />
                        </View>
                        <View style={{ flex: 1, marginBottom: 4 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                                Medical Certificate Expiration Date
                            </Text>
                            <TextInput
                                style={{
                                    width: '100%',
                                    padding: 8,
                                    borderColor: 'gray',
                                    borderWidth: 1,
                                    borderRadius: 5,
                                }}
                                defaultValue={personalInformation.medical_expiration_date.slice(
                                    0,
                                    10
                                )}
                                editable={false}
                            />
                        </View>
                    </View>

                    <View style={{ flex: 1, justifyContent: 'center', marginTop: 16 }}>
                        <Pressable
                            style={{
                                backgroundColor: '#3498db',
                                alignItems: 'center',
                                borderRadius: 25,
                                padding: 10,
                            }}
                            onPress={() => {
                                if (modifyInfo) {
                                    handleSubmit();
                                } else {
                                    setModifyInfo(!modifyInfo);
                                }
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    color: 'white',
                                    textTransform: 'uppercase',
                                }}>
                                {modifyInfo ? 'Submit' : 'Modify'}
                            </Text>
                        </Pressable>
                    </View>
                </View>
            )}
        </View>
    );
}

export default DiverInfo;
