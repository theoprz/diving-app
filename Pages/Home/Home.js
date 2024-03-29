import React, { useContext } from 'react';
import { BottomMenu, Item } from "react-native-bottom-menu";
import { View, Text, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import plongeeImage from '../../Component/ImgHome/plongee.png';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeContext } from '../../Component/Theme/SwitchTheme';

async function getToken(){
    return await AsyncStorage.getItem('token');
}

async function setToken(token){
    await AsyncStorage.setItem('token', token);
}

function Home() {
    const navigation = useNavigation();
    const { isDarkModeEnabled } = useContext(ThemeContext);

    return (
        <View style={[styles.container, isDarkModeEnabled && styles.darkContainer]}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <View style={[styles.card, isDarkModeEnabled && styles.darkContainer]}>
                    <Text style={[styles.title, isDarkModeEnabled && styles.darkText]}>Home to the Sub Aquatic Group Wattignies!</Text>
                    <View style={styles.imageContainer}>
                        <Image source={plongeeImage} style={styles.image} resizeMode="contain" />
                    </View>
                    <Text style={[styles.text, isDarkModeEnabled && styles.darkText]}>
                        The Sub Aquatic Group Wattignies is a passionate and dynamic diving club located in the beautiful city of Wattignies. Whether you are a beginner or an experienced diver, our club offers you the opportunity to discover the hidden wonders of the depths.
                    </Text>
                    <Text style={[styles.text, isDarkModeEnabled && styles.darkText]}>
                        Our club consists of a team of enthusiastic and qualified divers, all driven by the same passion for underwater exploration. We believe in safety and place great importance on the training of our members. Our experienced instructors are certified and will ensure that you acquire the necessary skills to dive with confidence.
                    </Text>
                    <Text style={[styles.text, isDarkModeEnabled && styles.darkText]}>
                        As a member of the Sub Aquatic Group Wattignies, you will have access to a variety of exciting activities. Whether you want to dive in local waters or explore exotic destinations, our club regularly organizes thrilling diving trips. From colorful marine life to mysterious wrecks, each dive is a unique adventure that will broaden your horizons.
                    </Text>
                    <Text style={[styles.text, isDarkModeEnabled && styles.darkText]}>
                        We take pride in creating a friendly and welcoming atmosphere where divers of all levels can come together, share their experiences, and build lasting connections. Whether you're looking for a relaxing leisure activity or an opportunity to push your limits, the Sub Aquatic Group Wattignies is the perfect place for you.
                    </Text>
                    <Text style={[styles.text, isDarkModeEnabled && styles.darkText]}>
                        Join us now and discover the fascinating world of scuba diving with the Sub Aquatic Group Wattignies. Dive into adventure and create unforgettable memories with our club.
                    </Text>
                </View>
            </ScrollView>
            <BottomMenu>
                <Item
                    size={22}
                    name="home"
                    text="Home"
                    type="Octicons"
                    onPress={() => { navigation.navigate('Home') }}
                />
                <Item
                    size={22}
                    name="key"
                    text="Dive Director"
                    type="Octicons"
                    onPress={() => { navigation.navigate('Dive Director') }}
                />
                <Item
                    size={22}
                    name="settings"
                    text="Settings"
                    type="gala"
                    onPress={() => { navigation.navigate('Settings') }}
                />
            </BottomMenu>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 8,
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
    darkText: {
        color: '#fff',
    },
    contentContainer: {
        flexGrow: 1,
        paddingBottom: 16,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        marginBottom: 60,
        marginTop: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 30,
        marginBottom: 16,
        textAlign: 'center',
        color: '#333',
    },
    imageContainer: {
        marginBottom: 12,
        alignItems: 'center',
    },
    image: {
        width: '100%',
        maxWidth: Dimensions.get('window').width - 32,
        height: Dimensions.get('window').width * 0.5,
    },
    text: {
        fontSize: 16,
        color: '#555',
        marginBottom: 12,
        textAlign: 'justify',
    },
});

export default Home;
