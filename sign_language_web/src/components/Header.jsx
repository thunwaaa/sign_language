import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { auth, db } from '../firebase';

function Header() {
  const [username, setUsername] = useState(null); // null = loading, '' = not logged in
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userRef = doc(db, 'users', user.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            setUsername(userSnap.data().username || user.email);
          } else {
            setUsername(user.email);
          }
        } catch (err) {
          console.error('Error fetching user data:', err);
          setUsername(user.email);
        }
      } else {
        setUsername('');
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUsername('');
      setShowDropdown(false);
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  return (
    <header style={styles.wrapper}>
      <div style={styles.header}>
        <a href="/" style={styles.logo}>HandsUp!</a>
        <nav style={styles.nav}>
          <a href="/Vocabulary" style={styles.navLink}>Vocabulary</a>
          <a href="/Translate" style={styles.navLink}>Translate</a>
          {username === null ? null : username ? (
            <div style={styles.dropdownWrapper}>
              <span style={styles.navLink} onClick={toggleDropdown}>
                Hi, {username}
              </span>
              {showDropdown && (
                <div style={styles.dropdown}>
                  <button onClick={handleLogout} style={styles.dropdownItem}>
                    Log Out
                  </button>
                </div>
              )}
            </div>
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
    position: 'relative',
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
    alignItems: 'center',
    position: 'relative',
  },
  navLink: {
    textDecoration: 'none',
    color: '#000',
    fontWeight: '500',
    cursor: 'pointer',
  },
  dropdownWrapper: {
    position: 'relative',
  },
  dropdown: {
    position: 'absolute',
    top: '2.5rem',
    right: 0,
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    zIndex: 10,
  },
  dropdownItem: {
    padding: '0.5rem 1rem',
    width: '100%',
    textAlign: 'left',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    fontWeight: '500',
  },
};

export default Header;
