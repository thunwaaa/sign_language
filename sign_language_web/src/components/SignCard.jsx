import React from 'react'

const SignCard = ({ word, thumbnailUrl, onClick }) => {
  return (
    <div onClick={onClick} className='thai-font'>
        <div>
            {thumbnailUrl ? (
                <img 
                    src={thumbnailUrl} 
                    alt={word}
                    style={{
                        width: '100%',
                        height: '200px',
                        objectFit: 'cover',
                        borderRadius: '8px'
                    }}
                />
            ) : (
                <p>3D model</p>
            )}
        </div>
        <div>
            <p>{word}</p>
        </div>
    </div>
  )
}

export default SignCard