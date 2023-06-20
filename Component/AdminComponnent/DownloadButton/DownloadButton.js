import React, { useState } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { PDFDocument, PDFView } from "react-native-pdf-lib";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

function DownloadButton({ dive }) {
    const [pdfUrl, setPdfUrl] = useState(null);

    const loadPdf = async () => {
        try {
            const response = await axios({
                url: "http://93.104.215.68:5000/api/pdf/download/" + dive,
                method: "GET",
                responseType: "arraybuffer",
            });

            const pdfData = response.data;

            const pdfDoc = await PDFDocument.load(pdfData);
            const pdfUri = await pdfDoc.save();

            setPdfUrl(pdfUri);
        } catch (error) {
            console.error("Error loading PDF:", error);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            {pdfUrl ? (
                <PDFView
                    fadeInDuration={250}
                    style={{ flex: 1 }}
                    resource={pdfUrl}
                    resourceType="url"
                    onLoad={() => console.log("PDF loaded successfully")}
                    onError={(error) => console.error("Error loading PDF:", error)}
                />
            ) : null}
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
                onPress={loadPdf}
            >
                <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
                    Load PDF
                </Text>
            </TouchableOpacity>
        </View>
    );
}

export default DownloadButton;
