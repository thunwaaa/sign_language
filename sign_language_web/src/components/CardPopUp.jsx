import React, { useEffect, useRef } from "react";
import FavButton from "./FavButton";
import { Weight } from "lucide-react";
import { X } from "lucide-react";

const CardPopUp = ({ word, onClose }) => {
  return (
    <div style={style.popupOverlay}>
      <div style={style.popupBox}>
        <h3 style={style.title}>{word}</h3>
        <div style={style.line}></div>
        <div style={{display:'flex'}}>
          <div style={style.container3d}></div>
          <div style={style.contentContainer}>
            <h4 style={style.contentTitle}>Meaning :</h4>
            <p style={style.content}>A common greeting used when meeting someone.</p>
            <h4 style={style.contentTitle}>Description :</h4>
            <p style={style.content}>
              Extend your dominant hand forward with palm facing up, then move
              it slightly upward and to the side.
            </p>
            <div style={{display :'flex' ,justifyContent : 'center',marginTop :'80px'}}>
              <FavButton />
            </div>
            
          </div>
        </div>
        <X style={style.closeButton} onClick={onClose} />
      </div>
    </div>
  );
};

const style = {
  popupOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  popupBox: {
    backgroundColor: "#fff",
    padding: "24px",
    borderRadius: "8px",
    width: "600px",
    boxShadow: "0 4px rgba(0,0,0,0.2)",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: "8px",
    right: "8px",
    marginTop :'18px',
    marginRight :'15px',
    background: "none",
    border: "none",
    fontSize: "18px",
    cursor: "pointer",
    color: "#555",
  },
  title: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "10px",
    marginTop : '0',
  },
  container3d: {
    backgroundColor: "#D9D9D9",
    width: "400px",
    height: "300px",
    marginRight : '20px',
    borderRadius: '10px',
  },
  line : {
    border: '1px solid rgba(188, 188, 188, 0.12)',
    width:'100%',
    marginBottom :'20px'
  },
  contentContainer : {
    display : 'flex',
    flexDirection : 'column',
    
  },
  contentTitle : {
    textAlign : 'left',
    margin : '10px',
    marginBottom : '5px'
  },
  content : {
    textAlign : 'left',
    margin : '10px',
    marginTop : '-5px'
  }
};


export default CardPopUp;
