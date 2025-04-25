import { Ionicons } from '@expo/vector-icons';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

export default function CameraScreen() {
  const screenHeight = Dimensions.get('window').height;

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <Ionicons name="camera" size={30} color="#666" />
        <Text style={styles.cameraText}>Camera</Text>
      </View>
      <View style={styles.translationBox}>
        <Text style={styles.translationText}>Translation text</Text>
        <View style={styles.translationIcons}>
          <Ionicons name="volume-high" size={24} color="white" />
          <Ionicons name="close" size={24} color="white" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  cameraContainer: {
    width: '90%',
    height: '55%',
    backgroundColor: '#ddd',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  cameraText: {
    marginTop: 10,
    fontSize: 18,
    color: '#333',
  },
  translationBox: {
    width: '90%',
    backgroundColor: '#3949ab',
    borderRadius: 15,
    padding: 20,
    justifyContent: 'center',
    position: 'relative',
  },
  translationText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
  },
  translationIcons: {
    position: 'absolute',
    top: 15,
    right: 15,
    flexDirection: 'row',
    gap: 10,
  },
});
