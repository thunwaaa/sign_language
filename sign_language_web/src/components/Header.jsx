import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';

function Header() {
  const [username, setUsername] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

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
      navigate('/signin');
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  const handleProfile = () => {
    setShowDropdown(false);
    navigate('/UserProfile');
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  return (
    <header style={styles.wrapper}>
      <div style={styles.header}>
        <a href="/" style={styles.logo}>HandsUp!</a>
        <nav style={styles.nav}>
          <a href="/" style={styles.navLink}>Home</a>
          <a href="/Vocabulary" style={styles.navLink}>Vocabulary</a>
          <a href="/Translate" style={styles.navLink}>Translate</a>
          {username === null ? null : username ? (
            <div style={styles.dropdownWrapper}>
              <span style={styles.navLink} onClick={toggleDropdown}>
                Hi, {username} ⬇
              </span>
              {showDropdown && (
                <div style={styles.dropdown}>
                  <button onClick={handleProfile} style={styles.dropdownItem}>
                    👤 User Profile
                  </button>
                  <button onClick={handleLogout} style={styles.dropdownItem}>
                    🔓 Log Out
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
    zIndex: 100,
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
    position: 'relative',
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
    borderRadius: '6px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    zIndex: 100,
    minWidth: '160px',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  dropdownItem: {
    padding: '0.75rem 1rem',
    width: '100%',
    textAlign: 'left',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    fontWeight: '500',
    color: '#333',
    backgroundColor: '#fff',
    transition: 'background 0.2s',
  },
};

// Add hover effect via inline style object
styles.dropdownItem[':hover'] = {
  backgroundColor: '#f5f5f5',
};

export default Header;
