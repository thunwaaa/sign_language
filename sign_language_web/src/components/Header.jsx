import React from 'react';

function Header() {
  return (
    <header style={styles.wrapper}>
      <div style={styles.header}>
        <a href="/" style={styles.logo}>HandsUp!</a>
        <nav style={styles.nav}>
          <a href="/Vocabulary" style={styles.navLink}>Vocabulary</a>
          <a href="/Translate" style={styles.navLink}>Translate</a>
          <a href="/SignIn" style={styles.navLink}>Sign In</a>
        </nav>
      </div>
    </header>
  );
}

const styles = {
  wrapper: {
    width: '100%',
    backgroundColor: '#fff',
    borderBottom: '1px solid #eee',
  },
  header: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: '1.4rem',
    fontWeight: 'bold',
    color: '#1a0dab',
    textDecoration: 'none',
  },
  nav: {
    display: 'flex',
    gap: '1.5rem',
  },
  navLink: {
    textDecoration: 'none',
    color: '#000',
    fontWeight: '500',
  },
};

export default Header;
