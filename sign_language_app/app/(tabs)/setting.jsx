import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import { ThemedText } from "../../components/ThemedText";
import { ThemedView } from "../../components/ThemedView";

export default function TabTwoScreen() {
  const [selectedPage, setSelectedPage] = useState('home');

  useEffect(() => {
    (async () => {
      const savedPage = await AsyncStorage.getItem('defaultStartPage');
      if (savedPage) {
        setSelectedPage(savedPage);
      }
    })();
  }, []);

  const handlePageChange = async (value) => {
    setSelectedPage(value);
    await AsyncStorage.setItem('defaultStartPage', value);
  };

  return (
    <ThemedView style={styles.titleContainer}>
      <ThemedText type="title" style={{ color: 'black' }}>Settings</ThemedText>

      <ThemedText style={{ marginTop: 20 , color: 'black'}}>Select default start page:</ThemedText>
      <Picker
        selectedValue={selectedPage}
        onValueChange={handlePageChange}
        style={{ width: 200, marginTop: 10 ,color: 'black'}}
      >
        <Picker.Item label="Home" value="homeScreen" />
        <Picker.Item label="Translate" value="translate" />
        <Picker.Item label="Word" value="" />
        <Picker.Item label="Camera" value="camera" />
      </Picker>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    justifyContent: 'center',
    paddingTop: 80,
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'white',
    color: 'black',
  },
  }
  );
