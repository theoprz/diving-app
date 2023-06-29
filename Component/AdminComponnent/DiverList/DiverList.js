import React, {useState, useEffect, useContext} from "react";
import {View, Text, TouchableOpacity, Alert, StyleSheet, FlatList, Switch} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BottomMenu, Item } from "react-native-bottom-menu";
import { ThemeContext } from '../../Theme/SwitchTheme';

async function getDatas(setDivers) {
    try {
        const response = await axios.get("http://93.104.215.68:5000/api/divers/all");
        setDivers(response.data);
    } catch (error) {
        console.log(error);
    }
}

async function getToken(){
    return await AsyncStorage.getItem('token');
}

async function setToken(token){
    await AsyncStorage.setItem('token', token);
}

function DiverList(props) {
    const [divers, setDivers] = useState([]);
    const {isDarkModeEnabled} = useContext(ThemeContext);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchData = async () => {
            await getDatas(setDivers);
        };

        fetchData();
    }, []);


    const data = divers.map((diver) => ({
        id: diver.id,
        name: `${diver.last_name} ${diver.first_name}`,
    }));
    const containerStyle = isDarkModeEnabled ? styles.containerDark : styles.containerLight;
    const titleStyle = isDarkModeEnabled ? styles.titleDark : styles.titleLight;
    const flatStyle = isDarkModeEnabled ? styles.flatDark : styles.flatLight;
    const itemStyle = isDarkModeEnabled ? styles.itemDark : styles.itemLight;
    const textStyle = isDarkModeEnabled ? styles.textDark : styles.textLight;
    const containerListStyle = isDarkModeEnabled ? styles.containerListDark : styles.containerListLight;

    const handleItemClick = (item) => {
        navigation.navigate("Diver Information", { item });
    };


    const renderItem = ({ item }) => (
        <TouchableOpacity style={[itemStyle, styles.item]} onPress={() => handleItemClick(item)}>
            <Text style={[textStyle, styles.itemText]}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={[containerStyle, styles.container]}>
            <FlatList
                style={[containerListStyle, styles.containerList]}
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={[flatStyle, styles.listContent]}
                numColumns={1}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: hp('4%'),
        justifyContent: "center",
    },
    containerLight: {
        backgroundColor: '#fff',
    },
    containerDark: {
        backgroundColor: '#333',
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        justifyContent: "center",
        textAlign: "center",
        paddingBottom: "5%",
    },
    titleLight: {
        color: '#000',
    },
    titleDark: {
        color: '#fff',
    },
    containerList: {
        marginBottom: hp('10%'),  // 2% of height device screen
    },
    containerListLight: {
        backgroundColor: '#fff',
    },
    containerListDark: {
        backgroundColor: '#333',
    },
    itemLight: {
        backgroundColor: '#20BDFF',
    },
    itemDark: {
        backgroundColor: '#20BDFF',
    },
    flatLight: {
        backgroundColor: '#fff',
    },
    flatDark: {
        backgroundColor: '#333',
    },
    listContent: {
        justifyContent: "center",
    },
    item: {
        flex: 1,
        borderRadius: 8,
        margin: 8,
        padding: 16,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#5433FF",
        shadowOffset: { width: 1, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5,
        marginHorizontal: "5%",
    },
    itemText: {
        fontSize: 16,
        fontWeight: "bold",
    },
    textLight: {
        color: '#000',
    },
    textDark: {
        color: '#fff',
    },


});

export default DiverList;
