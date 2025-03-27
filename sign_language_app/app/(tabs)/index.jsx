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
  SafeAreaView,
} from "react-native";
import { data } from "@/context/signlangVocab";
import React from "react";
import { HelloWave } from "@/components/HelloWave";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useState, useEffect } from "react";
import { Colors } from "@/constants/Colors";
import SearchScreen from "../../components/SearchScreen";

export default function HomeScreen() {
  // different rendering for web
  const isWeb = Platform.OS === "web";
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  const handleSearch = (text) => {
    setShowSearch(true);
    setQuery(text);
    const filtered = text
      ? data.filter((item) =>
          item.word.toLowerCase().includes(text.toLowerCase())
        )
      : data;
    setFilteredData(filtered);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.titleContainer}>
        <ThemedText type="title">Words</ThemedText>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search"
          placeholderTextColor="gray"
          value={query}
          onChangeText={handleSearch}
          clearButtonMode="always"
        />
      </View>

      {showSearch ? (
        <SearchNativeGridLayout filteredData={filteredData} />
      ) : (
        <NativeGridLayout />
      )}
      {/* <SearchNativeGridLayout filteredData={filteredData}/> */}

      {/* { isWeb ? (
        <WebGridLayout />
      ) : (
        <NativeGridLayout />
      )} */}

      {/* <NativeGridLayout /> */}
    </SafeAreaView>
  );
}

function SearchNativeGridLayout({ filteredData }) {
  return (
    <FlatList
      data={[
        ...filteredData,
        ...Array(filteredData.length % 3 ? 3 - (data.length % 3) : 0).fill({
          id: "spacer",
          word: "",
          empty: true,
        }),
      ]}
      renderItem={({ item }) => {
        if (item.empty) {
          return (
            <View
              style={[
                styles.card,
                {
                  backgroundColor: "transparent",
                  shadowOpacity: 0,
                  elevation: 0,
                },
              ]}
            />
          );
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
      numColumns={3}
      contentContainerStyle={styles.listContainer}
      columnWrapperStyle={styles.row}
      ListEmptyComponent={<Text style={styles.noResult}>No results found</Text>}
    />
  );
}

//layout for web that uses CSS grid
// function WebGridLayout() {
//   return (
//     <ScrollView>
//       <View style={webStyles.gridContainer}>
//         {data.map((item) => (
//           <View key={item.id} style={styles.card}>
//             <HelloWave />
//             <Text style={styles.word}>{item.word}</Text>
//           </View>
//         ))}
//       </View>
//     </ScrollView>
//   );
// }

// Native implementation using FlatList with numColumns
function NativeGridLayout() {
  const numColumns = 3;
  const extraSpaces = (numColumns - (data.length % numColumns)) % numColumns;
  const paddedData = [
    ...data,
    ...Array(extraSpaces).fill({ id: "spacer", empty: true }),
  ];

  return (
    <FlatList
      data={paddedData}
      renderItem={({ item }) =>
        item.empty ? (
          <View style={[styles.card, styles.spacerCard]} />
        ) : (
          <View style={styles.card}>
            <HelloWave />
            <Text style={styles.word}>{item.word}</Text>
          </View>
        )
      }
      keyExtractor={(item, index) =>
        item.id ? item.id.toString() : `spacer-${index}`
      }
      numColumns={numColumns}
      contentContainerStyle={styles.listContainer}
      columnWrapperStyle={styles.row}
    />
  );
}

// Web-specific styles using CSS grid
const webStyles = StyleSheet.create({
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 10,
    padding: 10,
    // paddingBottom: 90,
    width: "100%",
    maxWidth: 500,
    marginHorizontal: "auto",
  },
});

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
    paddingTop: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
    margin: 10,
    backgroundColor: "white",
    borderRadius: 10,
    width: "95%",
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
