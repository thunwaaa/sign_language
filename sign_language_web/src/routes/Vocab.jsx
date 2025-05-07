import React, { useState } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import SignGrid from '../components/SignGrid';
import signs from '../data/signs';

function Vocabulary() {
  const [searchTerm,setSearchTerm] = useState("");

  const filteredSigns = signs.filter(sign => 
    sign.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Header />
      <main style={styles.container}>
        <h1 style={styles.heading}>Sign Language Vocabulary</h1>
        <SearchBar 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
        <SignGrid signs={filteredSigns} />
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
