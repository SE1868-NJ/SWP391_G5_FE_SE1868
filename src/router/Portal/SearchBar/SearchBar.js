import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./SearchBar.module.css";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.length > 1) {
      const fetchSuggestions = async () => {
        try {
          const { data } = await axios.get(`http://localhost:3001/api/subitems/search?q=${query}`);
          setSuggestions(data);
        } catch (error) {
          console.error("Error fetching search suggestions:", error);
        }
      };
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSearch = () => {
    navigate(`/searchPortal?q=${query}`);
  };

  return (
    <div className={styles.searchContainer}>
      <input 
        type="text" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Nhập từ khóa cần tìm"
      />
      <button onClick={handleSearch}>
        Tìm kiếm
      </button>
      
      {suggestions.length > 0 && (
        <ul className={styles.suggestions}>
          {suggestions.map((item) => (
            <li key={item.id} onClick={() => navigate(`/detail/${item.id}`)}>
              <strong>{item.title}</strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
