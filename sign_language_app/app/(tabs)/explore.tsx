import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      {/* Camera Preview Section */}
      <View style={styles.cameraContainer}>
        <Ionicons name="camera-outline" size={24} color="#999" />
        <Text style={styles.cameraText}>Camera</Text>
      </View>

      {/* Translation Output */}
      <View style={styles.translationBox}>
        <Text style={styles.translationText}>Translation text</Text>
        <TouchableOpacity style={styles.soundButton}>
          <Ionicons name="volume-high-outline" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.closeButton}>
          <Ionicons name="close" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Bottom Tab Bar */}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
  },
  cameraContainer: {
    height: 250,
    backgroundColor: '#d3d3d3',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraText: {
    marginTop: 8,
    fontSize: 18,
    color: '#333',
  },
  translationBox: {
    backgroundColor: '#3f51b5',
    borderRadius: 10,
    padding: 16,
    marginVertical: 20,
    position: 'relative',
  },
  translationText: {
    color: 'white',
    fontSize: 16,
  },
  soundButton: {
    position: 'absolute',
    right: 40,
    top: 10,
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
});
