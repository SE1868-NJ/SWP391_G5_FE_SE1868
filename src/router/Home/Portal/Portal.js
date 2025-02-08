import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import styles from "./Portal.module.css";
import Header from "../../../layout/Header/Header";
import Category from "./Category/Category";

const Categories = [
  { Title: "Đặt Đồ Ăn & Đi Chợ", Link: "/category/food", Img: "./StoreIcon.png" },
  { Title: "Đặt Giao Hàng", Link: "/category/delivery", Img: "./CarIcon.png" },
  { Title: "Khuyến Mãi", Link: "/category/promo", Img: "./SaleIcon.png" },
  { Title: "Thanh Toán & Hoàn Tiền", Link: "/category/payment", Img: "./PayIcon.png" },
  { Title: "Tài Khoản", Link: "/category/account", Img: "./accoutIcon.png" },
  { Title: "Thông Tin Chung", Link: "/category/info", Img: "./InforIcon.png" },
];

function Portal() {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.searchBanner}>
        <h1>Chúng Tôi Có Thể Giúp Gì Cho Bạn?</h1>
        <div className={styles.searchBar}>
          <input type="text" placeholder="Nhập Nội Dung Cần Tìm" />
          <button>Tìm Kiếm</button>
        </div>
      </div>
      <div className={styles.content}>
        <h1>Mục Lục</h1>
        <div className={styles.Listsection}>
          {Categories.map((item) => (
            <div key={item.Title} className={styles.section}>
              <img alt={item.Title} src={item.Img} />
              <Link to={item.Link}>{item.Title}</Link>
            </div>
          ))}
        </div>
      </div>
      <Routes>
        <Route path="/category/:category" element={<Category />} />
      </Routes>
    </div>
  );
}

export default Portal;
