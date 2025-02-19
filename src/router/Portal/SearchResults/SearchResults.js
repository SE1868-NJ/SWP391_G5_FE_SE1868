import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import styles from "./SearchResults.module.css";
import Header from "../../../layout/Header/Header";
import SearchBar from "../SearchBar/SearchBar";
import Footer from "../../../layout/Footer/Footer";


function SearchResults() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10;

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3001/api/subitems/search?q=${query}`);
        setResults(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    if (query) fetchResults();
  }, [query]);

  const totalPages = Math.ceil(results.length / resultsPerPage);
  const displayedResults = results.slice((currentPage - 1) * resultsPerPage, currentPage * resultsPerPage);

  return (
    <div className={styles.pageContainer}>
      {/* Header & Search Bar */}
      <Header />
      <div className={styles.searchBanner}>
        <h1>Xin chào! Chúng tôi có thể giúp gì cho bạn?</h1>
        <SearchBar />
      </div>

      {/* Kết quả tìm kiếm */}
      <div className={styles.resultsContainer}>
        <h2>
          {results.length} Kết quả tìm kiếm cho <strong>{query}</strong>
        </h2>
        <ul className={styles.resultsList}>
          {displayedResults.map((item) => (
            <li key={item.id}>
              <strong>{item.title}</strong> - {item.details}
            </li>
          ))}
        </ul>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className={styles.pagination}>
            {[...Array(totalPages)].map((_, index) => (
              <span 
                key={index} 
                onClick={() => setCurrentPage(index + 1)}
                className={currentPage === index + 1 ? styles.active : ""}
              >
                {index + 1}
              </span>
            ))}
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
}

export default SearchResults;
