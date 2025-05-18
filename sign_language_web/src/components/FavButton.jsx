import React, { useEffect, useState, useCallback } from "react";
import { Heart } from "lucide-react";
import { auth, db } from "../firebase";
import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

const FavButton = ({ sign, onFavoriteChange }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const checkFavoriteStatus = useCallback(async () => {
    setIsLoading(true);
    const user = auth.currentUser;
    if (user) {
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const favorites = userDoc.data()?.favorites || [];
        
        if (sign && sign.id) {
          setIsFavorite(favorites.some(fav => fav.id === sign.id));
        }
      } catch (error) {
        console.error("Error checking favorite status:", error);
      }
    }
    setIsLoading(false);
  }, [sign?.id]);

  useEffect(() => {
    checkFavoriteStatus();
  }, [checkFavoriteStatus]);

  const toggleFavorite = async () => {
    const user = auth.currentUser;

    if (!user) {
      const confirmLogin = window.confirm("กรุณาเข้าสู่ระบบก่อนเพิ่มในรายการโปรด\nต้องการไปที่หน้าเข้าสู่ระบบหรือไม่?");
      if (confirmLogin) {
        navigate("/signin");
      }
      return;
    }

    if (!sign || !sign.id) {
      console.error("Sign data is incomplete:", sign);
      toast.error('Cannot add incomplete sign to favorites');
      return;
    }

    setIsLoading(true);
    const userRef = doc(db, 'users', user.uid);

    try {
      const userDoc = await getDoc(userRef);
      
      const favoriteData = {
        id: sign.id,
        word: sign.word,
        thumbnailURL: sign.thumbnailURL || "",
        modelURL: sign.modelURL || "",
        meaning: sign.meaning || "",
        description: sign.description || ""
      };

      if (!userDoc.exists()) {
        await updateDoc(userRef, {
          favorites: [favoriteData]
        });
        setIsFavorite(true);
      } else {
        
        const currentFavorites = userDoc.data()?.favorites || [];
        
        if (isFavorite) {
      
          const updatedFavorites = currentFavorites.filter(fav => fav.id !== sign.id);
          await updateDoc(userRef, {
            favorites: updatedFavorites
          });
          setIsFavorite(false);
        } else {
          
          const updatedFavorites = [...currentFavorites, favoriteData];
          await updateDoc(userRef, {
            favorites: updatedFavorites
          });
          setIsFavorite(true);
        }
      }

    
      if (onFavoriteChange) {
        onFavoriteChange(!isFavorite, favoriteData);
      }

    } catch (error) {
      console.error('Error updating favorites:', error);
      toast.error('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button 
      onClick={toggleFavorite} 
      style={style.favbutton}
      disabled={isLoading}
    >
      {isLoading ? (
        <div style={style.button}>
          <span style={style.text}>Loading...</span>
        </div>
      ) : isFavorite ? (
        <div style={style.button}>
          <Heart size={18} fill="white" />
          <span style={style.text}>Favorited!</span>
        </div>
      ) : (
        <div style={style.button}>
          <Heart size={18} />
          <span style={style.text}>Add to favorite</span>
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
    marginLeft: '10px',
    fontSize: '18px'
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default FavButton;