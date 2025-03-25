import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import MenuHeader from "../MenuHeader/MenuHeader";
import Search from "../Search/Search";
import DarkModeButton from "../../components/DarkModeButton";
import { Dropdown, Space } from "antd";
import { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import "../../i18n.js";
import { useCart } from "../../contexts/CartContext.js";
import LanguageSwitcher from "../../components/Language/LanguageSwitcher.js";
import {
  iconCart,
  iconHeart,
  iconHelp,
  iconLogin,
  iconProfile,
  iconNotify,
  iconProfileiconHistory,
  iconBills, iconTransactionHistory
} from "../../components/icon/Icon.jsx";

function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const { cartCount, fetchCartCount } = useCart();
  // Hàm điều hướng
  const handleNavigate = (path) => {
    navigate(path);
  };

  useEffect(() => {
    // Lấy dữ liệu user từ localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
    }
  }, []);

  useEffect(() => {
    if (user?.id) {
      fetchCartCount();
    }
  }, [user]);

  const handleClick = (e) => {
    if (e === "Tài Khoản") {
      if (user) {
        navigate(""); // Nếu đã đăng nhập, chuyển đến trang tài khoản
      } else {
        navigate("/login"); // Nếu chưa đăng nhập, chuyển đến trang đăng nhập
      }
    } else if (e === "Thông Báo") {
      if (user) {
        navigate("/Notifications");// Nếu đã đăng nhập, chuyển đến trang tài khoản
      } else {
        navigate("/login"); // Nếu chưa đăng nhập, chuyển đến trang đăng nhập
      }
      
    } else if (e === "Hỗ Trợ") {
      if (user) {
        navigate("/Portal");// Nếu đã đăng nhập, chuyển đến trang tài khoản
      } else {
        navigate("/Portal"); // Nếu chưa đăng nhập, chuyển đến trang đăng nhập
      }
      
    } else if (e === "Giỏ Hàng") {
      if (user) {
        navigate("/cart");// Nếu đã đăng nhập, chuyển đến trang tài khoản
      } else {
        navigate("/login"); // Nếu chưa đăng nhập, chuyển đến trang đăng nhập
      }
      
    } else if (e === "Blog") {
      navigate("/blog");
    }
  };


  const items = [];

  if (user) {
    items.push(
      {
        key: '1',
        label: (
          <a href="/customers/customer-info" style={{ textDecoration: 'none' }}>
            Thông tin tài khoản
          </a>
        ),
        icon: iconProfile
      },
      {
        key: '2',
        label: (
          <a href="/my-favorite">
            Sản phẩm yêu thích
          </a>
        ),
        icon: iconHeart
      },
      {
        key: '4',
        label: (
          <a href="/TransactionHistory">
            Lịch Sử Giao Dịch
          </a>
        ),
        icon: iconTransactionHistory
      },
      {
        key: '5',
        label: (
          <a href="/Bills">
            Các Loại Hóa Đơn
          </a>
        ),
        icon: iconBills
      }
    );
  }
  
  // Đăng nhập / Đăng xuất luôn có
  items.push({
    key: '3',
    label: (
      <a href={user ? "/login" : "/login"}>
        {user ? 'Đăng xuất' : 'Đăng nhập'}
      </a>
    ),
    icon: iconLogin
  });
  

  return (
    <header className={styles.wrapper}>
      <div className={styles.header}>
        <img
          src="/logo.png"
          alt="logo-header"
          style={{
            height: 50,
            width: 120,
            cursor: "pointer",
          }}
          onClick={() => handleNavigate("/")}
        />

        <MenuHeader />
        <Search />

        <div
          className={`${styles.fhs_center_space_header} ${theme === "dark" ? styles.dark : ""
            }`}
        >
          <div
            onClick={() => handleClick("Thông Báo")}
            className={`${styles.fhs_noti_header} ${theme === "dark" ? styles.darkItem : ""
              }`}
          >
            <img
              src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/ico_noti_gray.svg"
              alt=""
              className={styles.fhs_noti_icon_header}
            />
            <div
              className={`${styles.fhs_top_menu_labe} ${theme === "dark" ? styles.darkText : ""
                }`}
            >
              {t  ("Notifications")}
            </div>
          </div>
          <div
            onClick={() => handleNavigate("/Portal")}
            className={`${styles.fhs_noti_header} ${theme === "dark" ? styles.darkItem : ""
              }`}
          >
            <img
              style={{ width: "2.5vw" }}
              src="/Portal.png"
              alt=""
              className={styles.fhs_noti_icon_header}
            />
            <div
              className={`${styles.fhs_top_menu_labe} ${theme === "dark" ? styles.darkText : ""
                }`}
            >
              {t("Portal")}
            </div>
          </div>
          <div
          id="cart-icon"
            onClick={() => handleNavigate("/cart")}
            className={`${styles.fhs_noti_header} ${theme === "dark" ? styles.darkItem : ""}`}
            style={{ position: "relative" }}
          >
            <img
              src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/ico_cart_gray.svg"
              alt=""
              className={styles.fhs_noti_icon_header}
              style={{ width: "24px", height: "24px" }}
            />
            {cartCount > 0 && (
              <span style={{
                position: "absolute",
                top: "-3px",
                right: "-3px",
                background: "red",
                color: "white",
                borderRadius: "20%",
                padding: "5px 5px",
                fontSize: "12px",
                fontWeight: "bold",
                lineHeight: "1",
                minWidth: "10px",
                textAlign: "center",
              }}>
                {cartCount}
              </span>
            )
            }
            <div
              className={`${styles.fhs_top_menu_labe} ${theme === "dark" ? styles.darkText : ""
                }`}
            >
              {t("cart")}
            </div>
          </div>
          <div
            onClick={() => handleNavigate("/blog")}
            className={`${styles.fhs_noti_header} ${theme === "dark" ? styles.darkItem : ""}`}>
            <img
              style={{ width: "1.5vw", height: "3.8vh" }}
              src="../../Blog.png"
              alt=""
              className={styles.fhs_noti_icon_header}
            />
            <div className={`${styles.fhs_top_menu_labe} ${theme === "dark" ? styles.darkText : ""}`}>Blog</div>
          </div>
          <div
            onClick={() => handleNavigate("/contact")}
            className={`${styles.fhs_noti_header} ${theme === "dark" ? styles.darkItem : ""}`}>
            <img
              style={{ width: "1.5vw", height: "3.8vh" }}
              src="../../ContactInfo.png"
              alt=""
              className={styles.fhs_noti_icon_header}
            />
            <div className={`${styles.fhs_top_menu_labe} ${theme === "dark" ? styles.darkText : ""}`}>Liên hệ</div>
          </div>
          <div
            onClick={() => handleClick("Tài Khoản")}
            className={`${styles.fhs_noti_header} ${theme === "dark" ? styles.darkItem : ""
              }`}
          >
            {user && user.avatar ? (
              <img src={user.avatar} alt="Avatar" className={styles.avatar} />
            ) : (
              <img
                src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/ico_account_gray.svg"
                alt="Tài Khoản"
                className={styles.fhs_noti_icon_header}
              />
            )}
            <div className={user ? styles.name : styles.fhs_top_menu_labe}>
              <Dropdown menu={{ items }}>
                <Space>
                  {user ? user.name : "Tài Khoản"}

                </Space>
              </Dropdown>
            </div>
          </div>
          <div className={styles.fhs_language_header_second_bar}>
            <div className={styles.fhs_top_language}>
              <img
                src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/default.svg"
                alt=""
                style={{ width: "80%" }} // Giữ nguyên style inline
              />
            </div>
          </div>
          <LanguageSwitcher />

          <div className="p-4 flex justify-between items-center">
            <DarkModeButton />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;