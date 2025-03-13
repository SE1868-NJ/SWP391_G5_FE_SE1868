import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Portal.module.css";
import Header from "../../layout/Header/Header";
import SearchBar from "./SearchBar/SearchBar";
import FAQ from "./FAQ/FAQ";
import Footer from "../../layout/Footer/Footer";
import Breadcrumb from "./Breadcrumb/Breadcrumb";
import { ThemeContext } from "../../contexts/ThemeContext"; // Import ThemeContext

const Categories = [
  { title: "Đặt Đồ Ăn & Đi Chợ", link: "/category/food", img: "./StoreIcon.png" },
  { title: "Đặt Giao Hàng", link: "/category/delivery", img: "./CarIcon.png" },
  { title: "Khuyến Mãi", link: "/category/promo", img: "./SaleIcon.png" },
  { title: "Thanh Toán & Hoàn Tiền", link: "/category/payment", img: "./PayIcon.png" },
  { title: "Tài Khoản", link: "/category/account", img: "./accoutIcon.png" },
  { title: "Thông Tin Chung", link: "/category/info", img: "./inforIcon.png" },
];


function Portal() {
  const { theme } = useContext(ThemeContext); // Lấy theme từ ThemeContext
  const navigate = useNavigate();
  const customerId = localStorage.getItem("customerId");

  return (
    <div className={`${styles.container} ${theme === "dark" ? styles.dark : ""}`}>
      <div className={styles.headerWrapper}>
        <Header />
      </div>
      <Breadcrumb />
      <div className={`${styles.searchBanner} ${theme === "dark" ? styles.dark : ""}`}>
        <h1 className={theme === "dark" ? styles.darkText : ""}>Xin chào! Chúng tôi có thể giúp gì cho bạn?</h1>
        <SearchBar />
      </div>

      <div className={styles.content}>
        <h1 className={theme === "dark" ? styles.darkText : ""}>Danh Mục</h1>
        <div className={styles.categoryGrid}>
          {Categories.map((item) => (
            <Link to={item.link} key={item.title} className={`${styles.categoryItem} ${theme === "dark" ? styles.darkItem : ""}`}>
              <img alt={item.title} src={item.img} />
              <span className={theme === "dark" ? styles.darkText : ""}>{item.title}</span>
            </Link>
          ))}
        </div>
      </div>

      <h2>Câu hỏi thường gặp</h2>
      <FAQ />
      <h2>Các chức năng khác</h2>
      <div className={styles.supportLinks}>
        <Link to="/support/request" className={styles.supportLink}>Gửi yêu cầu hỗ trợ</Link>
        <Link to="/support/history" className={styles.supportLink}>Lịch sử hỗ trợ</Link>
      </div>
      <div className={styles.headerWrapper}>
        <Footer />
      </div>






    </div>
  );
}

export default Portal;
