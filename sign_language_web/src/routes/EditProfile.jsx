import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import { auth, db } from '../firebase';

function EditProfile() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const docRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUsername(data.username || '');
          setPreviewUrl(data.profilePicture || '');
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    if (!user) return;

    setUploading(true);
    let imageUrl = previewUrl;

    try {
      if (image) {
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'react_profile_upload');

        const res = await fetch(
          'https://api.cloudinary.com/v1_1/djxipn8kj/image/upload',
          {
            method: 'POST',
            body: formData,
          }
        );

        const data = await res.json();
        imageUrl = data.secure_url;
      }

      await setDoc(
        doc(db, 'users', user.uid),
        {
          username,
          profilePicture: imageUrl,
        },
        { merge: true }
      );

      alert('Profile updated!');
    } catch (err) {
      console.error('Error saving profile:', err);
      alert('Failed to update profile');
    }

    setUploading(false);
  };

  return (
    <>
      <Header />
      <div style={styles.pageWrapper}>
        <div style={styles.container}>
          <h2 style={styles.title}>Edit Profile</h2>
          <div style={styles.form}>
            {previewUrl ? (
              <img src={previewUrl} alt="Preview" style={styles.image} />
            ) : (
              <div style={styles.imagePlaceholder}>No Image</div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={styles.fileInput}
              id="file-upload"
            />
            <label htmlFor="file-upload" style={styles.fileLabel}>
              Choose New Profile Picture
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
              maxLength={30}
            />
            <button
              onClick={handleSave}
              style={uploading ? { ...styles.button, ...styles.buttonDisabled } : styles.button}
              disabled={uploading}
            >
              {uploading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const styles = {
  pageWrapper: {
    minHeight: 'calc(100vh - 64px)', // Assuming Header height 64px
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background:
      'linear-gradient(135deg, #3B4CCA 0%, #6D83F2 100%)',
    padding: '2rem',
  },
  container: {
    backgroundColor: '#fff',
    padding: '3rem 2.5rem',
    borderRadius: '16px',
    boxShadow:
      '0 12px 30px rgba(59, 76, 202, 0.3)',
    maxWidth: '420px',
    width: '100%',
    textAlign: 'center',
  },
  title: {
    marginBottom: '1.5rem',
    fontSize: '2rem',
    fontWeight: '700',
    color: '#3B4CCA',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  image: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    objectFit: 'cover',
    margin: '0 auto',
    boxShadow: '0 4px 15px rgba(59, 76, 202, 0.4)',
    border: '4px solid #3B4CCA',
  },
  imagePlaceholder: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    margin: '0 auto',
    backgroundColor: '#d0d5dd',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#6b7280',
    fontWeight: '600',
    fontSize: '1rem',
    userSelect: 'none',
  },
  fileInput: {
    display: 'none',
  },
  fileLabel: {
    cursor: 'pointer',
    padding: '0.5rem 1.2rem',
    backgroundColor: '#3B4CCA',
    color: '#fff',
    borderRadius: '8px',
    fontWeight: '600',
    transition: 'background-color 0.3s ease',
    userSelect: 'none',
  },
  input: {
    padding: '0.65rem 1rem',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1.8px solid #cbd5e1',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  },
  button: {
    marginTop: '1rem',
    backgroundColor: '#3B4CCA',
    color: 'white',
    padding: '0.65rem',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: '700',
    fontSize: '1.1rem',
    transition: 'background-color 0.3s ease',
  },
  buttonDisabled: {
    backgroundColor: '#95a5a6',
    cursor: 'not-allowed',
  },
};

export default EditProfile;
