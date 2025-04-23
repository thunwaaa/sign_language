import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { FadeIn, Layout } from 'react-native-reanimated';

export default function SignCard({ word, onPress }) {
  return (
    <Animated.View 
      entering={FadeIn.duration(300)} 
      layout={Layout.springify()}
      style={styles.container}
    >
      <TouchableOpacity onPress={onPress} style={styles.card}>
        <Text style={styles.icon}>{word.icon}</Text>
        <Text style={styles.word}>{word.word}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 4,
    width: '33.33%',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    aspectRatio: 1,
  },
  icon: {
    fontSize: 40,
    marginBottom: 8,
  },
  word: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
    color: '#1E293B',
  },
});