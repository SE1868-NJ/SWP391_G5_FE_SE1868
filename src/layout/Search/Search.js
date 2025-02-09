import styles from "./Search.module.css";

function Search() {
  return (
    <div className={styles.fhs_search_header}>
      <input placeholder="Tìm Kiếm Sản Phẩm..." />
      <button
        className={`${styles.fhs_button_search_header} ${
          styles.fhs_mouse_point}`
      }
      >
        <img
          src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/ico_search_white.svg"
          alt=""
        />
      </button>
    </div>
  );
}

export default Search;
