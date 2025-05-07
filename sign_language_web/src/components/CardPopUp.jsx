import React, { useEffect, useRef } from 'react'
import FavButton from './FavButton'

const CardPopUp = ({word, onClose}) => {
  return (
    <div style={style.popupOverlay}>
        <div style={style.popupBox}>
            <h3 style={style.title}>{word}</h3>
            <h4>Meaning</h4>
            <p>A common greeting used when meeting someone.</p>
            <h4>Description</h4>
            <p>Extend your dominant hand forward with palm facing up, 
            then move it slightly upward and to the side.</p>
            <FavButton />
            <button style={style.closeButton} onClick={onClose}>x</button>

        </div>
    </div>
  )
}

const style ={
  popupOverlay : {
    position : 'fixed',
    top : 0,
    left : 0,
    right : 0,
    bottom : 0,
    backgroundColor : 'rgba(0,0,0,0.5)',
    display : 'flex',
    justifyContent : 'center',
    alignItems : 'center',
    zIndex : 1000,
  },
  popupBox : {
    backgroundColor : '#fff',
    padding : '24px',
    borderRadius : '8px',
    width : '300px',
    boxShadow : '0 4px rgba(0,0,0,0.2)',
    position : 'relative',
  },
  closeButton : {
    position : 'absolute',
    top : '8px',
    right : '8px',
    background : 'none',
    border : 'none',
    fontSize : '18px',
    cursor : 'pointer',
    color : '#555',
  },
  title : {
    fontSize : '20px',
    fontWeight : 'bold',
    marginBottom : '12px',
  }
}

export default CardPopUp