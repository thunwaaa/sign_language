import { onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import { auth, db } from '../firebase';

function Translate() {
  const [text, setText] = useState('');
  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([]);

  // Track logged-in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Save translation to Firestore
  const handleTranslate = async () => {
    if (user && text.trim()) {
      try {
        const translationsRef = collection(db, 'users', user.uid, 'translations');
        await addDoc(translationsRef, {
          text: text.trim(),
          translatedAt: new Date().toISOString(),
        });
        setText('');
      } catch (err) {
        console.error('Failed to save translation:', err);
      }
    }
  };

  // Load user's history
  useEffect(() => {
    if (!user) return;

    const translationsRef = collection(db, 'users', user.uid, 'translations');
    const q = query(translationsRef, orderBy('translatedAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setHistory(items);
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <>
      <Header />
      <div style={styles.container}>
        {/* Text input */}
        <div style={styles.leftPanel}>
          <h2 style={{ color: '#1a0dab' }}>Text To Sign Language Translator</h2>
          <textarea
            placeholder="Type something to translate to sign language..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={styles.textarea}
          />
          <button onClick={handleTranslate} style={styles.button}>Translate</button>

          {/* History */}
          <div style={styles.historyBox}>
            <h3 style={{ marginBottom: '0.5rem' }}>Translation History</h3>
            {history.length === 0 ? (
              <p style={{ color: '#999' }}>No translations yet.</p>
            ) : (
              <ul style={styles.historyList}>
                {history.map(item => (
                  <li key={item.id} style={styles.historyItem}>
                    {item.text} <span style={styles.timestamp}>({new Date(item.translatedAt).toLocaleString()})</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* 3D preview */}
        <div style={styles.rightPanel}>
          <h2>3D Hand Preview</h2>
          <div style={styles.handPlaceholder}>
            <p style={{ color: '#aaa' }}>[3D hand animation for: {text || '...' }]</p>
          </div>
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    minHeight: '100vh',
    padding: '2rem',
    backgroundColor: '#f7f8fa',
    gap: '2rem',
    flexWrap: 'wrap',
  },
  leftPanel: {
    flex: '0 0 600px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  rightPanel: {
    flex: '0 0 600px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
  },
  textarea: {
    width: '100%',
    height: '200px',
    fontSize: '1.1rem',
    padding: '0.8rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    resize: 'vertical',
    backgroundColor: '#fff',
  },
  button: {
    padding: '0.6rem 1rem',
    backgroundColor: '#1a0dab',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: '600',
    cursor: 'pointer',
    alignSelf: 'flex-start',
  },
  handPlaceholder: {
    width: '100%',
    height: '300px',
    border: '2px dashed #ccc',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  historyBox: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '1rem',
    border: '1px solid #ddd',
    marginTop: '1rem',
  },
  historyList: {
    listStyle: 'none',
    paddingLeft: 0,
    margin: 0,
  },
  historyItem: {
    padding: '0.3rem 0',
    borderBottom: '1px solid #eee',
    color: '#333',
  },
  timestamp: {
    color: '#888',
    fontSize: '0.85rem',
    marginLeft: '0.5rem',
  },
};

export default Translate;
