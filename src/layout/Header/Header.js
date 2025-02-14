import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import MenuHeader from "../MenuHeader/MenuHeader";
import Search from "../Search/Search";

function Header() {
  const navigate = useNavigate();

  // Hàm điều hướng
  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleLogin = (path) => {
    window.location.href = path; // Chuyển hướng hẳn sang trang khác
  };
  
  return (
    <header className={styles.wrapper}>
      <div className={styles.header}>
        <img
          src="/logo.png"
          alt="logo-header"
          style={{ height: "6vh", width: "8%", cursor: "pointer" }}
          onClick={() => handleNavigate("/")}
        />

        <MenuHeader />
        <Search />

        <div className={styles.fhs_center_space_header}>
          <div className={styles.fhs_noti_header}>
            <img
              src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/ico_noti_gray.svg"
              alt=""
              className={styles.fhs_noti_icon_header}
            />
            <div className={styles.fhs_top_menu_labe}>Thông Báo</div>
          </div>
          <div className={styles.fhs_noti_header}>
            <img
            style={{width: '2.5vw'}}
              src="https://png.pngtree.com/png-clipart/20191121/original/pngtree-question-mark-vector-icon-png-image_5152512.jpg"
              alt=""
              className={styles.fhs_noti_icon_header}
            />
            <div className={styles.fhs_top_menu_labe}>Hỗ Trợ</div>
          </div>
          <div className={styles.fhs_noti_header}>
            <img
              src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/ico_cart_gray.svg"
              alt=""
              className={styles.fhs_noti_icon_header}
            />
            <div className={styles.fhs_top_menu_labe}>Giỏ Hàng</div>
          </div>
          <div
            onClick={() => handleLogin("http://localhost:5173/login")}
            className={styles.fhs_noti_header}
          >
            <img
              src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/ico_account_gray.svg"
              alt=""
              className={styles.fhs_noti_icon_header}
            />
            <div className={styles.fhs_top_menu_labe}>Tài Khoản</div>
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
        </div>
      </div>
    </header>
  );
}

export default Header;
