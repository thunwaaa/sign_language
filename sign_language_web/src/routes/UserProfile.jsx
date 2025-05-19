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

  if (!userData) return <div style={styles.loading}>Loading...</div>;

  return (
    <>
      <Header />
      <div style={styles.container}>
        <div style={styles.left}>
          <div style={styles.profileCard}>
            {userData.profilePicture ? (
              <img
                src={userData.profilePicture}
                alt="User Avatar"
                style={styles.avatarImg}
              />
            ) : (
              <div style={styles.avatarPlaceholder} />
            )}

            <h2 style={styles.username}>{userData.username || "Username"}</h2>
            <p style={styles.email}>📧 {userData.email || "example@domain.com"}</p>
            <p style={styles.favorites}>❤️ {favorites.length} Favorite{favorites.length !== 1 ? 's' : ''}</p>

            <button onClick={handleEditProfile} style={{ ...styles.button, ...styles.editBtn }}>
              Edit Profile
            </button>
            <button onClick={handleLogout} style={{ ...styles.button, ...styles.logoutBtn }}>
              Log Out
            </button>
          </div>
        </div>

        <div style={styles.right}>
          <h3 style={styles.favoritesTitle}>{userData.username}'s Favorites</h3>
          <div style={styles.grid}>
            {favorites.length === 0 ? (
              <p style={styles.noFavorites}>No favorites yet.</p>
            ) : (
              favorites.map((fav, index) => (
                <div
                  key={index}
                  style={styles.favoriteCard}
                  onClick={() => handleCardClick(fav)}
                >
                  <SignCard
                    word={fav.word}
                    thumbnailUrl={fav.thumbnailURL}
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
  loading: {
    fontSize: 18,
    textAlign: "center",
    padding: "2rem",
    color: "#555",
  },
  container: {
    display: "flex",
    position: "relative",
    padding: "3rem 4rem",
    backgroundColor: "#f9fafc",
    minHeight: "100vh",
    zIndex: 1,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  left: {
    flex: 1,
    maxWidth: "320px",
  },
  right: {
    flex: 2,
    paddingLeft: "3rem",
  },
  profileCard: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "2rem 1.5rem",
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    transition: "box-shadow 0.3s ease",
  },
  avatarPlaceholder: {
    width: "110px",
    height: "110px",
    borderRadius: "50%",
    backgroundColor: "#d0d5dd",
    margin: "0 auto 1.5rem",
  },
  avatarImg: {
    width: "110px",
    height: "110px",
    borderRadius: "50%",
    objectFit: "cover",
    margin: "0 auto 1.5rem",
    boxShadow: "0 0 8px rgba(59, 76, 202, 0.4)",
  },
  username: {
    fontSize: "1.8rem",
    fontWeight: "700",
    margin: "0 0 0.3rem",
    color: "#1a1a1a",
  },
  email: {
    margin: "0.4rem 0",
    fontSize: "1rem",
    color: "#666",
    fontWeight: "500",
  },
  favorites: {
    marginBottom: "2rem",
    fontSize: "1.1rem",
    fontWeight: "600",
    color: "#3b4cca",
  },
  button: {
    padding: "0.65rem 1rem",
    borderRadius: "6px",
    border: "none",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "1rem",
    width: "100%",
    transition: "background-color 0.3s ease, box-shadow 0.3s ease",
  },
  editBtn: {
    backgroundColor: "#3B4CCA",
    color: "#fff",
    marginBottom: "1rem",
  },
  logoutBtn: {
    backgroundColor: "#e74c3c",
    color: "#fff",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "1.4rem",
    marginTop: "1.5rem",
    zIndex: 100,
  },
  favoriteCard: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "1rem",
    textAlign: "center",
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    transition: "transform 0.2s ease, box-shadow 0.3s ease",
  },
  favoriteCardHover: {
    transform: "translateY(-6px)",
    boxShadow: "0 6px 20px rgba(59, 76, 202, 0.2)",
  },
  noFavorites: {
    fontSize: "1.1rem",
    color: "#888",
    fontStyle: "italic",
  },
  favoritesTitle: {
    fontSize: "1.7rem",
    fontWeight: "700",
    marginBottom: "1rem",
    color: "#222",
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
    opacity: 0.08,
    filter: "blur(12px)",
  },
  circle1: {
    width: 180,
    height: 180,
    bottom: -60,
    left: -60,
    backgroundColor: "#3B4CCA",
  },
  circle2: {
    width: 120,
    height: 120,
    top: 60,
    right: 120,
    backgroundColor: "#6D83F2",
  },
  circle3: {
    width: 90,
    height: 90,
    top: 220,
    left: 430,
    backgroundColor: "#A1A9FF",
  },
};

export default UserProfile;
