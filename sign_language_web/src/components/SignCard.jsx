import React from 'react'

const SignCard = ({word, onClick}) => {
  return (
    <div  onClick={onClick}>
        <div >
            <p>3D model</p>
        </div>
        <div>
            <p>{word}</p>
        </div>
    </div>
  )
}

export default SignCard