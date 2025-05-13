import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import SignGrid from '../components/SignGrid';
import { getAllSigns } from '../api/vocab';

function Vocabulary() {
  const [searchTerm, setSearchTerm] = useState("");
  const [signs, setSigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSigns() {
      try {
        const signData = await getAllSigns();
        setSigns(signData);
      } catch (error) {
        console.error("Error fetching signs:", error);
        setError(error.message || "Failed to load sign vocabulary data");
      } finally {
        setLoading(false);
      }
    }
    fetchSigns();
  }, []);

  const filteredSigns = signs.filter(sign => {
    // Check if sign has name property
    if (sign.name && typeof sign.name === 'string') {
      return sign.name.toLowerCase().includes(searchTerm.toLowerCase());
    }
    // Fallback to word property if name is not available
    else if (sign.word && typeof sign.word === 'string') {
      return sign.word.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return false;
  });

  return (
    <div>
      <Header />
      <main style={styles.container}>
        <h1 style={styles.heading}>Sign Language Vocabulary</h1>
        <SearchBar 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={styles.error}>{error}</p>
        ) : (
          <SignGrid signs={filteredSigns} />
        )}
      </main>
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    textAlign: 'center',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
  },
  heading: {
    fontSize: '2.5rem',
    color: '#1a0dab',
  },
  cardContainer: {
    marginTop: '20px',
    display : 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
};

export default Vocabulary;
