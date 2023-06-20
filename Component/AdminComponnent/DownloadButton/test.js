import React from "react";
import { TouchableOpacity, Text } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";

function DownloadButton({ dive }) {
    const downloadFile = async () => {
        try {
            const response = await axios({
                url: "http://93.104.215.68:5000/api/pdf/download/" + dive,
                method: "GET",
                responseType: "blob",
            });

            const contentDisposition = response.headers["content-disposition"];
            const filename = contentDisposition
                .split("filename=")[1]
                .replace('"', "")
                .replace('"', "");

            const fileUri = FileSystem.cacheDirectory + filename;
            await FileSystem.writeAsStringAsync(fileUri, response.data, {
                encoding: FileSystem.EncodingType.Base64,
            });

            await FileSystem.downloadAsync(
                fileUri,
                FileSystem.documentDirectory + filename
            );

            // Open the downloaded file (optional)
            await FileSystem.openAsync(FileSystem.documentDirectory + filename);
        } catch (error) {
            console.error("Error downloading file:", error);
        }
    };

    return (
        <TouchableOpacity
            style={{
                backgroundColor: "#007AFF",
                borderRadius: 20,
                paddingHorizontal: 20,
                paddingVertical: 10,
                marginRight: 10,
                flex: 1,
                alignItems: "center",
                marginBottom: "15%",
            }}
            onPress={downloadFile}
        >
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
                Download
            </Text>
        </TouchableOpacity>
    );
}

export default DownloadButton;
