import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Button, Modal, TouchableHighlight } from "react-native";

const ModifyModal = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [modifyInfo, setModifyInfo] = useState(false);
    const [valuesModified, setValuesModified] = useState(props.info);

    const invertModifyInfo = () => {
        setModifyInfo(!modifyInfo);
    };

    const handleSubmit = () => {
        if (modifyInfo) {
            console.log(valuesModified);
        } else {
            invertModifyInfo();
        }
    };

    return (
        <>
            <Button
                title="Modify"
                onPress={() => {
                    setShowModal(true);
                    console.log(props.info);
                }}
            />

            <Modal visible={showModal} animationType="slide">
                <View style={styles.container}>
                    <Text style={styles.title}>Modify</Text>

                    <View style={styles.inputContainer}>
                        <Text>First Name:</Text>
                        <TextInput
                            style={styles.input}
                            defaultValue={props.info.first_name}
                            editable={modifyInfo}
                            onChangeText={(value) => {
                                setValuesModified({ ...valuesModified, firstname: value });
                            }}
                        />

                        <Text>Last Name:</Text>
                        <TextInput
                            style={styles.input}
                            defaultValue={props.info.last_name}
                            editable={modifyInfo}
                            onChangeText={(value) => {
                                setValuesModified({ ...valuesModified, lastname: value });
                            }}
                        />

                        <Text>Diver Qualification:</Text>
                        <TextInput
                            style={styles.input}
                            defaultValue={props.info.diver_qualification}
                            editable={modifyInfo}
                            onChangeText={(value) => {
                                setValuesModified({ ...valuesModified, diver_qualification: value });
                            }}
                        />

                        <Text>Instructor Qualification:</Text>
                        <TextInput
                            style={styles.input}
                            defaultValue={props.info.instructor_qualification}
                            editable={modifyInfo}
                            onChangeText={(value) => {
                                setValuesModified({ ...valuesModified, instructor_qualification: value });
                            }}
                        />

                        <Text>Nox Qualification:</Text>
                        <TextInput
                            style={styles.input}
                            defaultValue={props.info.nox_qualification}
                            editable={modifyInfo}
                            onChangeText={(value) => {
                                setValuesModified({ ...valuesModified, nox_qualification: value });
                            }}
                        />

                        <Text>License Number:</Text>
                        <TextInput
                            style={styles.input}
                            defaultValue={props.info.license_number}
                            editable={modifyInfo}
                            onChangeText={(value) => {
                                setValuesModified({ ...valuesModified, license_number: value });
                            }}
                        />

                        <Text>License Expiration Date:</Text>
                        <TextInput
                            style={styles.input}
                            defaultValue={props.info.license_expiration_date}
                            editable={modifyInfo}
                            onChangeText={(value) => {
                                setValuesModified({ ...valuesModified, license_expiration_date: value });
                            }}
                        />

                        <Text>Medical Certificate Expiration Date:</Text>
                        <TextInput
                            style={styles.input}
                            defaultValue={props.info.medical_expiration_date}
                            editable={modifyInfo}
                            onChangeText={(value) => {
                                setValuesModified({ ...valuesModified, medical_expiration_date: value });
                            }}
                        />
                    </View>

                    <Button
                            title={modifyInfo ? "Save Changes" : "Modify"}
                            onPress={handleSubmit}
                        />

                        <Button
                            title="Close"
                            onPress={() => {
                                setShowModal(false);
                                setModifyInfo(false);
                            }}
                        />
                    </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    inputContainer: {
        width: "80%",
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        padding: 5,
        marginBottom: 10,
    },
});

export default ModifyModal;
