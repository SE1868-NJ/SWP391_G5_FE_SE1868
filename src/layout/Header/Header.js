import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import MenuHeader from "../MenuHeader/MenuHeader";
import Search from "../Search/Search";
import { useEffect, useState } from "react";
import DarkModeButton from "../../components/DarkModeButton";
import { iconCart, iconHeart, iconHelp, iconLogin, iconNotify, iconProfile } from "../../components/icon/Icon";
import { Dropdown, Space } from "antd";

function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

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

  const handleClick = (e) => {
    if (user) {
      if (e === "Thông Báo") {
        navigate("/Notifications"); // Nếu có user, vào trang thông báo
      } else if (e === "Hỗ Trợ") {
        navigate("/Portal"); // Nếu có user, vào trang thông báo
      } else if (e === "Giỏ Hàng") {
        navigate("/cart"); // Nếu có user, vào trang thông báo
      }
    } else {
      navigate("/login"); // Nếu chưa đăng nhập, vào trang login
    }
  };

  const items = [
    {
      key: '1',
      label: (
        <a  href="/profile" style={{ textDecoration: 'none' }}>
          Thông tin tài khoản
        </a>
      ),
      icon: iconProfile

    }, {
      key: '2',
      label: (
        <a href="/my-favorite">
          Sản phẩm yêu thích
        </a>
      ),
      icon: iconHeart
    },
    {
      key: '3',
      label: (
        <a href="/login">
          {user ? 'Đăng xuất' : 'Đăng nhập'}
        </a>
      ),
      icon: iconLogin
    },

  ];

  return (
    <header className={styles.wrapper}>
      <div className={styles.header}>
        <img
          src="/logo.png"
          alt="logo-header"
          style={{
            height: 50,
            width: 120, cursor: "pointer"
          }}
          onClick={() => handleNavigate("/")}
        />

        <MenuHeader />
        <Search />

        <div className={styles.fhs_center_space_header}>
          <div onClick={() => handleClick("Thông Báo")} className={styles.fhs_noti_header}>
            {iconNotify}
            <div className={styles.fhs_top_menu_labe}>Thông Báo</div>
          </div>
          <div
            onClick={() => handleNavigate("/Portal")}
            className={styles.fhs_noti_header}>
            {iconHelp}
            <div className={styles.fhs_top_menu_labe}>Hỗ Trợ</div>
          </div>
          <div
            onClick={() => handleNavigate("/cart")}
            className={styles.fhs_noti_header}>
            {iconCart}
            <div className={styles.fhs_top_menu_labe}>Giỏ Hàng</div>
          </div>
          <div
            // onClick={() => handleNavigate("/login")}
            className={styles.fhs_noti_header}
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
          <div className="p-4 flex justify-between items-center">
            <DarkModeButton />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;