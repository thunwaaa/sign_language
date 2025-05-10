import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { auth, db } from '../firebase';

function Header() {
  const [username, setUsername] = useState(null); // null = loading, '' = not logged in

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userRef = doc(db, 'users', user.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            setUsername(userSnap.data().username || user.email);
          } else {
            setUsername(user.email); // fallback
          }
        } catch (err) {
          console.error('Error fetching user data:', err);
          setUsername(user.email); // fallback
        }
      } else {
        setUsername(''); // not logged in
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <header style={styles.wrapper}>
      <div style={styles.header}>
        <a href="/" style={styles.logo}>HandsUp!</a>
        <nav style={styles.nav}>
          <a href="/Vocabulary" style={styles.navLink}>Vocabulary</a>
          <a href="/Translate" style={styles.navLink}>Translate</a>
          {username === null ? null : username ? (
            <span style={styles.navLink}>Hi, {username}</span>
          ) : (
            <a href="/SignIn" style={styles.navLink}>Sign In</a>
          )}
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
