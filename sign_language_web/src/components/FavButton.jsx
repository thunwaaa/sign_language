import React, { useState } from 'react'
import { Heart } from 'lucide-react';

function FavButton() {
    const [isFavorite,setIsFavorite] = useState(false);

  return (
    <button
        onClick={() => setIsFavorite(true)}
        style={style.favbutton}
        className={`flex items-center gap-2 py-2 px-4 rounded-md text-white font-medium transition-all ${
            isFavorite
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
    >
        <Heart
        size={18}
        fill= {isFavorite ? 'white' : 'none'} />
        <span>Favorite</span>
    </button>
  )
}
const style = {
    favbutton : {
        display : 'flex',
        alignItems : 'center',
        gap : '2',
        paddingTop : '2',
        paddingBottom : '2',
        paddingLeft : '4',
        paddingRight : '4',
        borderRadius : '200px',
        color : 'white',
    }
}

export default FavButton