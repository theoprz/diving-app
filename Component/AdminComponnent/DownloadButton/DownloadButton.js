import React, {useState} from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { useNavigation } from '@react-navigation/native';

function DownloadButton(props) {
    const [pdfUri, setPdfUri] = useState(null);
    const pdfUrl = "http://93.104.215.68:5000/api/pdf/download/" + props.diveId;
    const navigation = useNavigation();

    const loadPdf = () => {
        navigation.navigate('PDF', { pdfUrl });
    };

    return (
        <View>
            <TouchableOpacity
                style={{
                    backgroundColor: "#5433FF",
                    borderRadius: 20,
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    alignItems: "center",
                    marginHorizontal: "5%",
                    marginBottom: "10%",
                }}
                onPress={loadPdf}
            >
                <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
                    View PDF
                </Text>
            </TouchableOpacity>
        </View>
    );
}

export default DownloadButton;
