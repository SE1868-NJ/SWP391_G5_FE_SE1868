import "./MenuHeader.css";
import { useState } from "react";
function MenuHeader() {
  const [hover, setHover] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            borderBottom: (hover || isMenuOpen) ? "4px solid black" : "none",
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        />
        <img
          src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/icon_seemore_gray.svg"
          alt=""
          style={{
            cursor: "pointer",
            borderBottom: (hover || isMenuOpen)  ? "4px solid black" : "none",
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
            <div className="items_option">Đồ Ăn</div>
            <div className="items_option">Đồ Uống</div>
            <div className="items_option">Đồ Chay</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MenuHeader;
