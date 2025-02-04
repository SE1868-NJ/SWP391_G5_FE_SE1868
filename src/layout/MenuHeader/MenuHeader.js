import "./MenuHeader.css";
import { useState } from "react";
import axios from "axios";
function MenuHeader() {
  const [hover, setHover] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [productList, setProductList] = useState([]);

  async function allNew(option, type) {
    try {
      const response = await axios.post("http://localhost:3001/api/Products/All/New",{ option, type });
      setProductList(response.data);
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
            <div className="items_option">Tất Cả</div>
            {productList.length > 0 ? productList.map((item) => (
    <div key={item.ProductID} className="items_option">{item.Category}</div>
)) : <p>Không có dữ liệu</p>}

          </div>
          <div>
            <button onClick={() => allNew("Tất Cả", "New")}>hi</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MenuHeader;
