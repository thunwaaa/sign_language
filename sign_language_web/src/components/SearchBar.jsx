import { Search } from "lucide-react";

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div style={style.container}>
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
  container: {
    position: 'relative',
    width: '100%',
    maxWidth: '500px',
    margin: '0 auto',
  },
  input: {
    width: '100%',
    padding: '0.75rem 2.5rem 0.75rem 1rem', // paddingRight for icon space
    borderRadius: '9999px',
    border: '1px solid #3B4CCA',
    fontSize: '1rem',
    boxSizing: 'border-box',
  },
  searchIcon: {
    position: 'absolute',
    right: '1rem',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#3B4CCA',
    pointerEvents: 'none',
  },
};

export default SearchBar;
