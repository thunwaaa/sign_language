import React from 'react';
import Header from '../components/Header';

function Translate() {
  return (
    <>
      <Header />
      <main style={styles.container}>
        <h1 style={styles.heading}>Translate</h1>
        <p style={styles.paragraph}>
            หน้า Translate จ้าาา
        </p>
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
  paragraph: {
    fontSize: '1.2rem',
    color: '#666',
  },
};

export default Translate;