import React, { useState } from "react";
import {Search} from "lucide-react";

function SearchBar({searchTerm, onSearchChange}) {
  
  return (
    <div>
      <input 
      type="text" 
      style={style.input}
      placeholder="Search for signs..."
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      />
      <Search style={style.searchIcon} size={20} />
    </div>
  );
}
const style = {
  input : {
    width: '55%',
    paddingTop: '0.75rem',
    paddingBottom: '0.75rem',
    paddingLeft: '1rem',
    paddingRight: '2.5rem',
    borderRadius: '9999px',
    border: '1px solid #3B4CCA',
  },
  searchIcon :{
    position : 'absolute',
    right : '23%',
    top:'21.5%',
    transform: 'translateY(-50%)',
    color:'#3B4CCA',
    pointerEvents:'none'
  }
}
export default SearchBar;
