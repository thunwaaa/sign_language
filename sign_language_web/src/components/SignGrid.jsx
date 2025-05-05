import React, { useContext, useState } from 'react';
import  signs  from '../data/signs';

const SignGrid = () => {
  return (
    <div className="grid">
      {signs.length > 0 ? (
        signs.map((sign) => (
            <div  key={sign.id} className='sign-card'>
                <div className='sign-image'>
                    3D model
                </div>
                <h3 className='sign-title'>{sign.name}</h3>
            </div>
        ))
      ) : (
        <div className="col-span-full text-center py-10">
          <p className="text-gray-500">No signs found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default SignGrid;