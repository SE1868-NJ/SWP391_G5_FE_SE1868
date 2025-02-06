import "./MenuHeader.css";
import { useState } from "react";
import axios from "axios";
import { useEffect, useCallback } from "react";
function MenuHeader() {
  const [hover, setHover] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [productList, setProductList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [activeCategory, setActiveCategory] = useState(-1);
  const [activeType, setActiveType] = useState(0);
  const [option, setOption] = useState("Tất Cả");
  const [type, setType] = useState("Mới Nhất");

  const allNew = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/Products/All/New",
        {
          params: { option, type },
        }
      );
      setProductList(response.data[0]);
    } catch (error) {
      console.log(error);
    }
  }, [option, type]); // allNew sẽ được re-created khi option hoặc type thay đổi

  useEffect(() => {
    allNew(); // Gọi hàm allNew khi type hoặc option thay đổi
  }, [allNew]);

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
          allNew();
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
                  setType("Mới Nhất");
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
                  setType("Đắt Nhất");
                }}
              >
                Đắt Nhất
              </div>
              <div
                className={`items_type ${activeType === 3 ? "active" : ""}`}
                onClick={() => {
                  setActiveType(3);
                  setType("Bán Chạy Nhất");
                }}
              >
                Bán Chạy Nhất
              </div>
            </div>

            <div className="showProducts">
              {Array.isArray(productList) && productList.length > 0 ? (
                productList.map((item, index) => (
                  <div key={index} className="items_showProducts">
                    <img className="img" src={item.ProductImg} alt="" />
                    <p style={{ marginBottom: "0.2vw", marginTop: "0" }}>
                      {item.ProductName}
                    </p>
                    <div
                      style={{
                        color: "red",
                        marginBottom: "0.2vw",
                        height: "1.7vw",
                      }}
                    >
                      {item.Price}{" "}
                      <img
                        style={{ width: "1vw", height: "1.3vw" }}
                        src="https://static.thenounproject.com/png/1060425-200.png"
                        alt=""
                      />
                    </div>
                    <div>
                      =&gt; Đã bán:{" "}
                      <span style={{ color: "blue" }}>{item.SoldQuantity}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p>Không có dữ liệu</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MenuHeader;
