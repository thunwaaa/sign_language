import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import { auth, db } from '../firebase';

function EditProfile() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const docRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUsername(data.username || '');
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSave = async () => {
    if (!user) return;
    try {
      await setDoc(doc(db, 'users', user.uid), {
        username,
      }, { merge: true });
      alert('Profile updated!');
    } catch (err) {
      console.error('Save failed:', err);
      alert('Failed to update profile');
    }
  };

  return (
    <>
      <Header />
      <div style={styles.container}>
        <h2>Edit Profile</h2>
        <div style={styles.form}>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />
          <button onClick={handleSave} style={styles.button}>
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    padding: '2rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    maxWidth: '400px',
    margin: '0 auto',
  },
  input: {
    padding: '0.5rem',
    fontSize: '1rem',
  },
  button: {
    backgroundColor: '#3B4CCA',
    color: 'white',
    padding: '0.5rem',
    border: 'none',
    cursor: 'pointer',
  },
};

export default EditProfile;
