import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Import Camera conditionally only if available
let Camera = null;
try {
  Camera = require('expo-camera').Camera;
} catch (e) {
  console.error("Camera import failed:", e);
}

export default function TranslateScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [translatedText, setTranslatedText] = useState("Translation text");
  
  useEffect(() => {
    if (Camera) {
      (async () => {
        try {
          const { status } = await Camera.requestCameraPermissionsAsync();
          setHasPermission(status === 'granted');
        } catch (error) {
          console.error("Error requesting camera permission:", error);
          setHasPermission(false);
        }
      })();
    } else {
      setHasPermission(false);
    }
  }, []);

  // Function to speak the translated text
  const speakText = () => {
    Alert.alert("Speaking", "This would use text-to-speech to read the translation");
  };

  // Function to clear translation
  const clearTranslation = () => {
    setTranslatedText("Translation text");
  };

  // The original layout without camera functionality
  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <View style={styles.cameraPlaceholder}>
          <Text>Camera functionality unavailable</Text>
          <Text>Please check your expo-camera installation</Text>
        </View>
      </View>

      <View style={styles.translationBox}>
        <Text style={styles.translationText}>{translatedText}</Text>
        <TouchableOpacity style={styles.soundButton} onPress={speakText}>
          <Ionicons name="volume-high-outline" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.closeButton} onPress={clearTranslation}>
          <Ionicons name="close" size={20} color="white" />
        </TouchableOpacity>
      </View>
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
    height: 400,
    backgroundColor: '#d3d3d3',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  cameraPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  translationBox: {
    backgroundColor: '#3f51b5',
    borderRadius: 10,
    padding: 16,
    marginVertical: 20,
    minHeight: 100,
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
});