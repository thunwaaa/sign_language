import React from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import SignGrid from '../components/SignGrid';
import '../components/style/vocab.css';

function Vocabulary() {
  return (
    <>
      <Header />
      <main style={styles.container}>
        <h1 style={styles.heading}>Sign Language Vocabulary</h1>
        <SearchBar />
        <SignGrid />
      </main>
    </>
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
    color: '#333',
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
