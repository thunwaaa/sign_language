import React, { useContext, useState } from "react";
import signs from "../data/signs";
import CardPopUp from "./CardPopUp";
import FavButton from "./FavButton";
import SignCard from "./SignCard";

const SignGrid = ({signs}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(null);

  return (
    <div>
      <div style={style.grid}>
        {signs && signs.length > 0 ?(
          signs.map((sign, index) => 
          <div style={style.signCard} key={index}>
            <SignCard
              word={sign.name}
              onClick={() => setIsPopupOpen(sign)}
            />
          </div>
        )) : (
          <p style={style.emptyData}>No data available in sign vocabulary</p>
        )}
        
      </div>

      {isPopupOpen && (
        <CardPopUp
          word={isPopupOpen.name}
          onClose={() => setIsPopupOpen(null)}
        />
      )}
    </div>
  );
};

const style = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px,1fr))",
    gap: "1.5rem",
    margin: "1.5rem",
    paddingLeft: "15%",
    paddingRight: "15%",
  },
  signCard: {
    backgroundColor: "white",
    borderRadius: "0.5rem",
    overflow: "hidden",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
    transition: "all 0.3s ease",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "1.5rem",
    cursor: "pointer",
  },
  emptyData: {
    gridColumn: "span 12/ span 12",
    textAlign: "center",
    paddingTop: "2.5rem",
    paddingBottom: "2.5rem",
  },
};

export default SignGrid;
