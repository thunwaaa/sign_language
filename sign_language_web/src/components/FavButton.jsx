import React, { useState } from "react";
import { Heart } from "lucide-react";

function FavButton() {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <button onClick={() => setIsFavorite(!isFavorite)} style={style.favbutton}>
      {isFavorite ? (
        <div>
          <Heart size={15} fill="white" />
          <span style={style.text}>Favorited</span>
        </div>
      ) : (
        <div>
          <Heart size={15} fill="none" />
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
    marginLeft : '10px'
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default FavButton;
