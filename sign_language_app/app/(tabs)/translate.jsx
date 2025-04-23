import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';




export default function TranslateScreen() {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  const handleTranslate = () => {
    // ตัวอย่างการแปลข้อความเป็นภาษามือเชื่อมต่อ API หรือโมเดล AI 
    setTranslatedText(inputText.toUpperCase()); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Translate to Sign Language</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter text to translate"
        value={inputText}
        onChangeText={setInputText}
      />
      <Button title="Translate" onPress={handleTranslate} />
      {translatedText ? (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Translation: {translatedText}</Text>
          <Canvas style={styles.canvas}>
            <ambientLight />
            <OrbitControls />
            <HandModel text={translatedText} /> {/* ส่งข้อความไปยังโมเดลมือ */}
          </Canvas>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
    paddingVertical:80,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  resultContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    marginBottom: 16,
  },
  canvas: {
    width: '100%',
    height: 300,
  },
});
