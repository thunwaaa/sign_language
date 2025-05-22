import React, { useState } from "react";
import CardPopUp from "./CardPopUp";
import SignCard from "./SignCard";

const SignGrid = ({signs}) => {
  const [selectedSign, setSelectedSign] = useState(null);

  const handleCardClick = (sign) => {
    setSelectedSign(sign);
  };

  return (
    <div>
      <div style={style.grid}>
        {signs && signs.length > 0 ? (
          signs.map((sign) => (
            <div 
              style={style.signCard} 
               onClick={() => handleCardClick(sign)}
              key={sign.id}
            >
              <SignCard
                sign={sign}
                word={sign.word}
                
              />
            </div>
          ))
        ) : (
          <p style={style.emptyData}>No data available in sign vocabulary</p>
        )}
      </div>

      {selectedSign && (
        <CardPopUp
          signId={selectedSign.id}
          onClose={() => setSelectedSign(null)}
        />
      )}
    </div>
  );
};

const style = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)", 
    gap: "1.5rem",
    margin: "1.5rem",
    paddingLeft: "15%",
    paddingRight: "15%",
    fontSize: "20px",
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
