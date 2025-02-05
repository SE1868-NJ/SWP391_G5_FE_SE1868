import "./MenuHeader.css";
import { useState } from "react";
import axios from "axios";
function MenuHeader() {
  const [hover, setHover] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [productList, setProductList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [activeCategory, setActiveCategory] = useState(-1);
  const [activeType, setActiveType] = useState(0);
  const [option, setOption] = useState("Tất Cả");
  const [type, setType] = useState("New");

  async function allNew() {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/Products/All/New?",
        { params: { option, type } }
      );
      setProductList(response.data[0]);
      console.log(response.data[0]);
    } catch (error) {
      console.log(error);
    }
  }

  async function allCategory() {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/Products/Category"
      );
      return setCategoryList(response.data[0]);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="fhs_option_header">
      <div
        className="fhs_option_header_span"
        onClick={() => {
          setIsMenuOpen(!isMenuOpen);
          allCategory();
        }}
        onMouseLeave={() => {
          if (!isMenuOpen) setHover(false);
        }}
      >
        <img
          src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/ico_menu.svg"
          alt=""
          style={{
            width: "36px",
            cursor: "pointer",
            borderBottom: hover || isMenuOpen ? "4px solid black" : "none",
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        />
        <img
          src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/icon_seemore_gray.svg"
          alt=""
          style={{
            cursor: "pointer",
            borderBottom: hover || isMenuOpen ? "4px solid black" : "none",
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        />
      </div>
      {isMenuOpen && (
        <div
          style={{
            position: "absolute",
            top: "8vh",
            left: "19.5vw",
            width: "60vw",
            backgroundColor: "white",
            borderRadius: "10px",
            padding: "10px",
          }}
        >
          <div className="option">
            <div
              className={`items_option ${
                activeCategory === -1 ? "active" : ""
              }`}
              onClick={() => {
                setActiveCategory(-1);
                setOption("Tất Cả");
              }}
            >
              Tất Cả
            </div>
            {Array.isArray(categoryList) && categoryList.length > 0 ? (
              categoryList.map((item, index) => (
                <div
                  key={index}
                  className={`items_option ${
                    activeCategory === index ? "active" : ""
                  }`}
                  onClick={() => {
                    setActiveCategory(index);
                    setOption(item.Category);
                  }}
                >
                  {item.Category}
                </div>
              ))
            ) : (
              <p>Không có dữ liệu</p>
            )}
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div className="type">
              <div
                className={`items_type ${activeType === 0 ? "active" : ""}`}
                onClick={() => {
                  setActiveType(0);
                  setType("New");
                }}
              >
                Mới Nhất
              </div>
              <div
                className={`items_type ${activeType === 1 ? "active" : ""}`}
                onClick={() => {
                  setActiveType(1);
                  setType("Rẻ Nhất");
                }}
              >
                Rẻ Nhất
              </div>
              <div
                className={`items_type ${activeType === 2 ? "active" : ""}`}
                onClick={() => {
                  setActiveType(2);
                  setType("Bán Chạy Nhất");
                }}
              >
                Bán Chạy Nhất
              </div>
            </div>
            <div className="showProducts">
              <div className="items_showProducts">
                hi
              </div>
              <div className="items_showProducts">
                hi
              </div>
              <div className="items_showProducts">
                hi
              </div>
              <div className="items_showProducts">
                hi
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MenuHeader;
