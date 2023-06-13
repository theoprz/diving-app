import React, {useEffect, useState} from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";

function getDatas(id, setDiver) {
    axios.get('http://93.104.215.68:5000/api/divers/all').then((response) => {
        let elem = response.data.find((element) => {
            if (element.id === id) {
                return element;
            }
        })
        console.log(elem)
        setDiver(elem)
    }).catch((error) => {
        console.log(error);
    });
}

function Profil() {
    const [diver, setDiver] = useState();
    const route = useRoute();
    const { item } = route.params;
    useEffect(async () => {
        await getDatas(item.id, setDiver);
    } , []);
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text>Element Info:</Text>
            <Text>{diver.first_name} {diver.last_name}</Text>
        </View>
    );
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
});

export default Profil;
