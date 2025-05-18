import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardPopUp from "../components/CardPopUp";
import Header from "../components/Header";
import SignCard from "../components/SignCard";
import { auth, db } from "../firebase";


function UserProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [selectedSign, setSelectedSign] = useState(null);

  const handleCardClick = (fav) => {
    setSelectedSign(fav);
  };

  const fetchUserData = async (userId) => {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      setUserData(data);
      setFavorites(data.favorites || []);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        navigate("/signin");
      } else {
        setUser(currentUser);
        await fetchUserData(currentUser.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/signin");
  };

  const handleEditProfile = () => {
    navigate("/EditProfile");
  };

  const handleFavoriteRemoved = async () => {
    try {
     
      if (user) {
        await fetchUserData(user.uid);
      }
    
      setSelectedSign(null);
      
      setTimeout(() => {
        window.location.reload();
      }, 100);
      
    } catch (error) {
      console.error("Error handling favorite removal:", error);
    }
  };

  if (!userData) return <div>Loading...</div>;

  return (
    <>
      <Header />
      <div style={styles.container}>
        <div style={styles.left}>
          <div style={styles.profileCard}>
            <div style={styles.avatar} />
            <h2>{userData.username || "Username"}</h2>
            <p style={styles.email}>
              📧 {userData.email || "example@domain.com"}
            </p>
            <p style={styles.favorites}>❤️ {favorites.length} Favorite</p>
            <button onClick={handleEditProfile} style={styles.editBtn}>
              Edit Profile
            </button>
            <button onClick={handleLogout} style={styles.logoutBtn}>
              Log Out
            </button>
          </div>
        </div>

        <div style={styles.right}>
          <h3>{userData.username}'s Favorite</h3>
          <div style={styles.grid}>
            {favorites.length === 0 ? (
              <p>No favorites yet.</p>
            ) : (
              favorites.map((fav, index) => (
                <div key={index} style={styles.favoriteCard}>
                  <SignCard
                    word={fav.word}
                    thumbnailUrl={fav.thumbnailURL}
                    onClick={() => handleCardClick(fav)}
                  />
                </div>
              ))
            )}
          </div>
        </div>

        {selectedSign && (
          <CardPopUp
            signId={selectedSign.id}
            onClose={() => setSelectedSign(null)}
            onFavoriteChange={handleFavoriteRemoved}
          />
        )}

        {/* Decorative bubbles */}
        <div style={styles.bubbles}>
          <div style={{ ...styles.circle, ...styles.circle1 }} />
          <div style={{ ...styles.circle, ...styles.circle2 }} />
          <div style={{ ...styles.circle, ...styles.circle3 }} />
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    display: "flex",
    position: "relative",
    padding: "2rem",
    backgroundColor: "#fff",
    minHeight: "100vh",
    zIndex: 1, 
  },
  left: {
    flex: 1,
    maxWidth: "300px",
  },
  right: {
    flex: 2,
    paddingLeft: "2rem",
  },
  profileCard: {
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "1.5rem",
    textAlign: "center",
  },
  avatar: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    backgroundColor: "#ddd",
    margin: "0 auto 1rem",
  },
  email: {
    margin: "0.5rem 0",
  },
  favorites: {
    marginBottom: "1.5rem",
  },
  editBtn: {
    backgroundColor: "#3B4CCA",
    color: "#fff",
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "5px",
    marginBottom: "0.5rem",
    cursor: "pointer",
    width: "100%",
  },
  logoutBtn: {
    backgroundColor: "#e74c3c",
    color: "#fff",
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "1rem",
    marginTop: "1rem",
    zIndex: 100,
  },
  favoriteCard: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "1rem",
    textAlign: "center",
    cursor: "pointer",
  },
  favoriteImage: {
    width: "50px",
    height: "50px",
    marginBottom: "0.5rem",
  },
  bubbles: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    overflow: "hidden",
    pointerEvents: "none",
    zIndex: -5,
  },
  circle: {
    position: "absolute",
    borderRadius: "50%",
    backgroundColor: "#3B4CCA",
    opacity: 0.15,
  },
  circle1: {
    width: 150,
    height: 150,
    bottom: -50,
    left: -50,
  },
  circle2: {
    width: 100,
    height: 100,
    top: 50,
    right: 100,
    backgroundColor: "#6D83F2",
  },
  circle3: {
    width: 80,
    height: 80,
    top: 200,
    left: 400,
    backgroundColor: "#A1A9FF",
  },
};

export default UserProfile;
