import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Animated, {
    useAnimatedScrollHandler,
    useSharedValue,
} from 'react-native-reanimated';
import { signWords, } from '../../context/words';
import AnimatedHeader from '../../components/AnimatedHeader';
import SearchBar from '../../components/SearchBar';
import SignCard from '../../components/SignCard';
import WordDetailModal from '../../components/WordDetailModal';

const AnimatedFlatList = Animated.FlatList;

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredWords, setFilteredWords] = useState(signWords);
  const [selectedWord, setSelectedWord] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [favorites, setFavorites] = useState([]);
  
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  useEffect(() => {
    let result = signWords;
    
    // Filter by search query
    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      result = result.filter(
        word => 
          word.word.toLowerCase().includes(lowercasedQuery) || 
          (word.translation && word.translation.toLowerCase().includes(lowercasedQuery))
      );
    }
    
    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(word => word.category === selectedCategory);
    }
    
    setFilteredWords(result);
  }, [searchQuery, selectedCategory]);

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleCardPress = (word) => {
    setSelectedWord(word);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const toggleFavorite = (word) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.some((fav) => fav.id === word.id)) {
        // Remove from favorites
        return prevFavorites.filter((fav) => fav.id !== word.id);
      } else {
        // Add to favorites
        return [...prevFavorites, word];
      }
    });
  };

  const renderItem = ({ item }) => (
    <SignCard word={item} onPress={() => handleCardPress(item)} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <AnimatedHeader title="Words" scrollY={scrollY} />
      
      <SearchBar 
        value={searchQuery}
        onChangeText={setSearchQuery}
        onClear={handleClearSearch}
        placeholder="Search words"
      />
      
      {filteredWords.length > 0 ? (
        <AnimatedFlatList
          data={filteredWords}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={3}
          contentContainerStyle={[styles.listContent, { paddingBottom: 80 }]} // เพิ่ม padding ด้านล่าง
          showsVerticalScrollIndicator={false}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No words found</Text>
          <Text style={styles.emptySubText}>Try a different search term or category</Text>
        </View>
      )}
      
      <WordDetailModal 
        visible={modalVisible}
        word={selectedWord}
        onClose={closeModal}
        onFavorite={() => toggleFavorite(selectedWord)}
        isFavorite={favorites.some((fav) => fav.id === selectedWord?.id)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  listContent: {
    paddingHorizontal: 12,
    paddingBottom: 24, // พื้นที่เริ่มต้น
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#64748B',
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#94A3B8',
    textAlign: 'center',
  },
  header: {
    alignItems: 'center', // จัดให้อยู่ตรงกลาง
    justifyContent: 'center',
    paddingBottom: 4, // ลด padding ด้านล่าง
    paddingTop: 8, // ลด padding ด้านบน
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  favoritesContainer: {
    marginVertical: 16,
  },
  favoritesTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
    marginBottom: 8,
  },
});