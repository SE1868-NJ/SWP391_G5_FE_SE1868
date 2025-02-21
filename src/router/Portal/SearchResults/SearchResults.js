import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../../layout/Header/Header";
import SearchBar from "../SearchBar/SearchBar";
import Footer from "../../../layout/Footer/Footer";
import styles from "./SearchResults.module.css";

const searchCache = {}; // Lưu cache để tránh gọi lại API

function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get("q");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;

    if (searchCache[query]) {
      // Nếu từ khóa đã có trong cache, dùng luôn dữ liệu cache
      setResults(searchCache[query]);
      return;
    }

    const fetchResults = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3001/api/subitems/search?q=${query}`);

        if (data.length === 0) {
          setError(`Không tìm thấy kết quả nào cho từ khóa: "${query}"`);
        } else {
          setResults(data);
          searchCache[query] = data; // Lưu vào cache
        }
      } catch (err) {
        setError("Lỗi khi tải kết quả tìm kiếm");
      }
    };

    fetchResults();
  }, [query]);

  const handleResultClick = async (item) => {
    try {
      const { data } = await axios.get(`http://localhost:3001/api/categories`);
      const foundCategory = data.find(cat => cat.id === item.category_id);

      if (foundCategory) {
        navigate(`/category/${foundCategory.link.replace("/category/", "")}/${item.id}`);
      } else {
        navigate(`/category/unknown/${item.id}`);
      }
    } catch (error) {
      console.error("Lỗi khi lấy thông tin danh mục:", error);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.headerWrapper}>
        <Header />
      </div>
      <div className={styles.searchBanner}>
        <SearchBar />
      </div>

      <div className={styles.resultsContainer}>
        {error ? (
          <p className={styles.noResults}>{error}</p>
        ) : (
          <>
            <h2>
              {results.length} Kết quả tìm kiếm cho <strong>{query}</strong>
            </h2>
            <ul className={styles.resultsList}>
              {results.map((item) => (
                <li key={item.id} className={styles.resultItem} onClick={() => handleResultClick(item)}>
                  <strong className={styles.resultLink}>{item.title}</strong>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      <div className={styles.headerWrapper}>
        <Footer />
      </div>
    </div>
  );
}

export default SearchResults;
