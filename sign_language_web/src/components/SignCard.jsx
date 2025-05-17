import React from 'react'

const SignCard = ({ word, modelUrl, onClick }) => {
  return (
    <div onClick={onClick} className='thai-font'>
        <div>
            
        </div>
        <div>
            <p>{word}</p>
        </div>
    </div>
  )
}

export default SignCard