import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { auth, db } from "../firebase";
import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import toast from 'react-hot-toast'

const FavButton = ({ sign }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() =>{
    const checkFavoriteStatus = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const favorites = userDoc.data()?.favorites || [];
        setIsFavorite(favorites.some(fav => fav.id === sign.id));
      }
    };

    checkFavoriteStatus();
  }, [sign.id]);

  const toggleFavorite = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert('Please sign in before add to favorites');
      return;
    }

    const useRef = doc(db, 'users', user.uid);

    try{
      if(isFavorite) {
        await updateDoc(useRef, {
          // Remove from favorite
          favorites: arrayRemove({
            id: sign.id,
            word: sign.word,
            thumbnailURL: sign.thumbnailURL,
          })
        });
        toast.success('Removed from favorites');
        // รีเฟรชหน้าหลังจากลบ
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        await updateDoc(useRef, {
          // Add to favorite
          favorites: arrayUnion({
            id: sign.id,
            word: sign.word,
            thumbnailURL: sign.thumbnailURL
          })
        });
        toast.success('Added to favorites');
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error updating favorites:', error);
      alert('Failed to update favorites');
    }
  };

  return (
    <button onClick={toggleFavorite} style={style.favbutton}>
      {isFavorite ? (
        <div>
          <Heart size={18} fill="white" />
          <span style={style.text}>Favorited</span>
        </div>
      ) : (
        <div>
          <Heart size={18} fill="none" />
          <span style={style.text}>Add to Favorites</span>
        </div>
      )}
    </button>
  );
}
const style = {
  favbutton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    backgroundColor: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "8px 16px",
    fontWeight: 500,
    fontSize: "14px",
    cursor: "pointer",
  },
  text: {
    color: "white",
    fontWeight: "bold",
    marginLeft : '10px',
    fontSize:'18px'
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default FavButton;
