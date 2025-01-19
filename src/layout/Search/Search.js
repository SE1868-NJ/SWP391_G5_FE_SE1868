import "./Search.css";


function Search() {

  return (
    <div className="fhs_search_header">
      <input
        // ref={inputRef}
        // value={searchValue}
        // spellCheck={false}
        // onChange={handleChange}
        // onFocus={() => setShowResult(true)}
        placeholder="Tìm Kiếm Sản Phẩm..."
      />
      <button className="fhs_button_search_header fhs_mouse_point">
        <img
          src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/ico_search_white.svg"
          alt=""
          style={{ width: "20px" }}
        />
      </button>
    </div>
  );
}

export default Search;
