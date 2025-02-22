import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./SearchBar.module.css";

const searchCache = {}; // Cache kết quả tìm kiếm

function SearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.trim().length < 2) {
      setSuggestions([]); // Khi không có query, xóa gợi ý
      return;
    }

    if (searchCache[query]) {
      setSuggestions(searchCache[query]); // Dùng cache nếu có
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3001/api/subitems/search?q=${query}`);
        setSuggestions(data);
        searchCache[query] = data; // Lưu vào cache
      } catch (error) {
        console.error("Error fetching search suggestions:", error);
      }
    };

    fetchSuggestions();
  }, [query]);

  const handleSearch = () => {
    if (query.trim() === "") {
      alert("⚠ Vui lòng nhập từ khóa trước khi tìm kiếm!");
      return;
    }
    navigate(`/searchPortal?q=${query}`);
  };

  const handleSuggestionClick = async (item) => {
    try {
      // Gọi API để lấy danh mục từ category_id của item
      const { data } = await axios.get(`http://localhost:3001/api/categories`);
      const foundCategory = data.find(cat => cat.id === item.category_id);

      if (foundCategory) {
        // Nếu tìm thấy category, điều hướng tới /category/:category/:itemId
        navigate(`/category/${foundCategory.link.replace("/category/", "")}/${item.id}`);
      } else {
        // Nếu không tìm thấy category, điều hướng đến một trang mặc định
        navigate(`/category/unknown/${item.id}`);
      }

      setSuggestions([]); // Đóng bảng gợi ý khi bấm vào một item
    } catch (error) {
      console.error("Error fetching category:", error);
    }
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
            <li key={item.id} onClick={() => handleSuggestionClick(item)}>
              <strong>{item.title}</strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
