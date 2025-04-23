import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  Dimensions
} from 'react-native';
import { X, Heart, HeartFill } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function WordDetailModal({ visible, word, onClose, onFavorite, isFavorite }) {
  if (!visible || !word) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            {/* ปุ่มกากบาท */}
            <TouchableOpacity onPress={onClose} style={styles.iconButton}>
              <X size={24} color="#64748B" />
            </TouchableOpacity>

            {/* ชื่อ Word Details */}
            <Text style={styles.title}>Word Details</Text>

            {/* ปุ่มหัวใจ */}
            <TouchableOpacity onPress={onFavorite} style={styles.iconButton}>
              {isFavorite ? (
                <HeartFill size={24} color="#FF0000" />
              ) : (
                <Heart size={24} color="#FF0000" />
              )}
            </TouchableOpacity>
          </View>
          
          <View style={styles.content}>
            <Text style={styles.icon}>{word.icon}</Text>
            <Text style={styles.word}>{word.word}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: width * 0.85,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between', // จัดระยะห่างเท่าๆ กัน
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  title: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
  },
  content: {
    padding: 24,
    alignItems: 'center',
  },
  icon: {
    fontSize: 64,
    marginBottom: 16,
  },
  word: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1E293B',
    marginBottom: 16,
    textAlign: 'center',
  },
  iconButton: {
    padding: 8,
  },
});