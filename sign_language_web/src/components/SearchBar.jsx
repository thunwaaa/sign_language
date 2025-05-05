import React from "react";
import "../components/style/vocab.css";
import {Search} from "lucide-react";

function SearchBar() {

  return (
    <div>
      <input 
      type="text" 
      className="input"
      />
      <Search className="search-icon" size={20} />
    </div>
  );
}

export default SearchBar;
