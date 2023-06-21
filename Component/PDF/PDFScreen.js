import {TouchableOpacity, View, Text} from "react-native";
import {WebView} from "react-native-webview";
import { useRoute, useNavigation } from '@react-navigation/native';

function PDFScreen(props) {
    const pdfUrl = props.route.params.pdfUrl;
    const navigation = useNavigation();
    const route = useRoute();

    return (
        <View style={{ flex: 1 }}>
            <WebView
                source={{ uri: pdfUrl }}
                style={{ flex: 1, width: '100%', height: '100%' }}
            />
        </View>
    );
}

export default PDFScreen;
