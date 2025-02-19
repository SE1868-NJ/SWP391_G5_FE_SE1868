import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import styles from "./Portal.module.css";
import Header from "../../layout/Header/Header";
import Category from "./Category/Category";
import SearchBar from "./SearchBar/SearchBar";
import Footer from "../../layout/Footer/Footer";

const Categories = [
  { title: "Đặt Đồ Ăn & Đi Chợ", link: "/category/food", img: "./StoreIcon.png" },
  { title: "Đặt Giao Hàng", link: "/category/delivery", img: "./CarIcon.png" },
  { title: "Khuyến Mãi", link: "/category/promo", img: "./SaleIcon.png" },
  { title: "Thanh Toán & Hoàn Tiền", link: "/category/payment", img: "./PayIcon.png" },
  { title: "Tài Khoản", link: "/category/account", img: "./accoutIcon.png" },
  { Title: "Thông Tin Chung", Link: "/category/info", Img: "./InforIcon.png" }
];

function Portal() {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.searchBanner}>
        <h1>Xin chào! Chúng tôi có thể giúp gì cho bạn?</h1>
        <SearchBar />
      </div>

      <div className={styles.content}>
        <h1>Danh Mục</h1>
        <div className={styles.categoryGrid}>
          {Categories.map((item) => (
            <Link to={item.link} key={item.title} className={styles.categoryItem}>
              <img alt={item.title} src={item.img} />
              <span>{item.title}</span>
            </Link>
          ))}
        </div>
      </div>

      <Routes>
        <Route path="/category/:category" element={<Category />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default Portal;
