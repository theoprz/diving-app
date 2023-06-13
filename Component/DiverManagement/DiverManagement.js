import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, FlatList } from "react-native";
import ModifyModal from "./ModalModify/ModifyModal";

async function getDiversDatas(setDivers) {
  try {
    const response = await fetch("http://93.104.215.68:5000/api/divers/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      // Handle the data
      setDivers(data);
      return data;
    } else {
      // Handle the error
      throw new Error("Request failed with status: " + response.status);
    }
  } catch (error) {
    // Handle any other errors
    console.error(error);
  }
}

function DiverManagement(props) {
  const [divers, setDivers] = useState([]);
  const [search, setSearch] = useState({
    firstname: "",
    lastname: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 10;
  const [pagesNumber, setPagesNumber] = useState(1);

  useEffect(() => {
    getDiversDatas(setDivers).then((data) => {
      setPagesNumber(Math.ceil(data.length / dataPerPage));
      console.log(data);
    });
  }, []);

  return (
      <View>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
          Diver Management
        </Text>

        <View style={{ marginBottom: 10 }}>
          <Text>First Name:</Text>
          <TextInput
              style={{ borderWidth: 1, padding: 5 }}
              onChangeText={(value) => {
                setSearch({ ...search, firstname: value });
                setPagesNumber(
                    Math.ceil(
                        divers.filter((diver) =>
                            diver.first_name.toLowerCase().includes(value.toLowerCase())
                        ).length / dataPerPage
                    )
                );
              }}
          />

          <Text>Last Name:</Text>
          <TextInput
              style={{ borderWidth: 1, padding: 5 }}
              onChangeText={(value) => {
                setSearch({ ...search, lastname: value });
                setPagesNumber(
                    Math.ceil(
                        divers.filter((diver) =>
                            diver.last_name.toLowerCase().includes(value.toLowerCase())
                        ).length / dataPerPage
                    )
                );
              }}
          />
        </View>

        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Button
              title="Previous"
              disabled={currentPage === 1}
              onPress={() => setCurrentPage(currentPage - 1)}
          />

          <Button
              title={currentPage - 2 > 0 ? String(currentPage - 2) : ""}
              disabled={currentPage <= 2}
              onPress={() => setCurrentPage(currentPage - 2)}
          />

          <Button
              title={currentPage - 1 > 0 ? String(currentPage - 1) : ""}
              disabled={currentPage <= 1}
              onPress={() => setCurrentPage(currentPage - 1)}
          />

          <Button title={String(currentPage)} disabled={true} />

          <Button
              title={
                currentPage + 1 < pagesNumber + 1 ? String(currentPage + 1) : ""
              }
              disabled={currentPage >= pagesNumber}
              onPress={() => setCurrentPage(currentPage + 1)}
          />

          <Button
              title={
                currentPage + 2 < pagesNumber + 1 ? String(currentPage + 2) : ""
              }
              disabled={currentPage >= pagesNumber - 1}
              onPress={() => setCurrentPage(currentPage + 2)}
          />

          <Button
              title="Next"
              disabled={currentPage >= pagesNumber}
              onPress={() => setCurrentPage(currentPage + 1)}
          />
        </View>

        <FlatList
            data={divers
                .filter((diver) =>
                    diver.first_name.toLowerCase().includes(search.firstname.toLowerCase())
                )
                .filter((diver) =>
                    diver.last_name.toLowerCase().includes(search.lastname.toLowerCase())
                )
                .slice((currentPage - 1) * dataPerPage, currentPage * dataPerPage)}
            renderItem={({ item }) => (
                <View style={{ marginBottom: 10 }}>
                  <Text>{item.first_name}</Text>
                  <Text>{item.last_name}</Text>
                  <ModifyModal diver={item} />
                </View>
            )}
            keyExtractor={(item) => {
                console.log(item)
                item.id.toString()
            }}
        />
      </View>
  );
}

export default DiverManagement;
