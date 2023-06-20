import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import PropTypes from "prop-types";

function Pagination(props) {
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setCurrentPage(1);
    }, [props.pagesNumber]);

    useEffect(() => {
        props.currentPageSetter(currentPage);
    }, [currentPage, props]);

    return (
        <View style={styles.container}>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    onPress={() => {
                        if (currentPage > 1) {
                            setCurrentPage(currentPage - 1);
                        }
                    }}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Previous</Text>
                </TouchableOpacity>
                {/* ...render other buttons here */}
                <TouchableOpacity
                    disabled={currentPage === props.pagesNumber}
                    onPress={() => {
                        if (currentPage < props.pagesNumber) {
                            setCurrentPage(currentPage + 1);
                        }
                    }}
                    style={[
                        styles.button,
                        { opacity: currentPage === props.pagesNumber ? 0.5 : 1 },
                    ]}
                >
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        marginHorizontal: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    buttonText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#000",
    },
});

Pagination.propTypes = {
    pagesNumber: PropTypes.number.isRequired,
    currentPageSetter: PropTypes.func.isRequired,
};

export default Pagination;
