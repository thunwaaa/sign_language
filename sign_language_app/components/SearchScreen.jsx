import React from "react";
import {
  Image,
  StyleSheet,
  Platform,
  TextInput,
  View,
  Text,
  ScrollView,
  Pressable,
  FlatList,
  BackHandler,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { data } from "@/context/signlangVocab";
import { HelloWave } from "@/components/HelloWave";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useState, useEffect } from "react";
import { Colors } from "@/constants/Colors";

function SearchScreen() {
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  const handleSearch = (text) => {
    setQuery(text);
    const filtered = text
      ? data.filter((item) => 
        item.word.toLowerCase().includes(text.toLowerCase())
    ) : data;
    setFilteredData(filtered);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search"
          placeholderTextColor="gray"
          value={query}
          onChangeText={handleSearch}
        />
        <Pressable>
          <FontAwesome5 name="search" size={14} color="black" />
        </Pressable>
      </View>

      
      <NativeGridLayout filteredData={filteredData}/>
      

      {/* <FlatList 
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
            <TouchableOpacity style={styles.item} onPress={() => console.log(item.word)}>
                <Text style={styles.item}>{item.word}</Text>
            </TouchableOpacity>
        )}
        ListFooterComponent={<Text style={styles.noResult}>No results found</Text>}
      /> */}
    </View>
  );
}

function NativeGridLayout({filteredData}) {
  const numColumns = 3;
  const extraSpaces = (numColumns - (filteredData.length % numColumns)) % numColumns;
  const paddedData = [...filteredData, ...Array(extraSpaces).fill({ id: "spacer", word: "", empty: true })];
  
  return (
    <FlatList
      data={paddedData}
      renderItem={({ item }) => {
        if (item.empty) {
          return <View style={[styles.card, styles.spacerCard]} />;
        }
        return (
          <View style={styles.card}>
            <HelloWave />
            <Text style={styles.word}>{item.word}</Text>
          </View>
        );
      }}
      keyExtractor={(item, index) =>
        item.id ? item.id.toString() : `spacer-${index}`
      }
      numColumns={numColumns}
      contentContainerStyle={styles.listContainer}
      columnWrapperStyle={styles.row}
      ListEmptyComponent={<Text style={styles.noResult}>No results found</Text>}
    />
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    titleContainer: {
      justifyContent: "center",
      padding: 10,
      alignItems: "center",
      flexDirection: "column",
      gap: 8,
      paddingTop: 60,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 5,
      backgroundColor: "white",
      borderRadius: 10,
      width: "100%",
      borderColor: "white",
      borderWidth: 1,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.2,
      shadowRadius: 1,
    },
    input: {
      flex: 1,
      backgroundColor: "white",
      color: "black",
      borderRadius: 20,
      paddingHorizontal: 10,
    },
    card: {
      backgroundColor: "white",
      height: 100,
  
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      marginVertical: 5,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.2,
      shadowRadius: 1,
      elevation: 1,
      // For native platforms only:
      ...Platform.select({
        ios: {
          width: "32%",
        },
        android: {
          width: "32%",
        },
      }),
    },
    word: {
      fontSize: 16,
      paddingTop: 10,
      fontWeight: "bold",
      textAlign: "center",
    },
    
    listContainer: {
      paddingHorizontal: 10,
      alignItems: "center",
      paddingBottom: 90,
    },
    row: {
      justifyContent: "space-between",
    },
    noResult: {
        textAlign: "center",
        fontSize: 16,
        marginTop: 20,
        color: "gray",
      },
  });
  

export default SearchScreen;
