import React from "react";
import styles from "./Portal.module.css";
import Header from "../../../layout/Header/Header";


function Portal() {
  const listFunction = [
    {
      content: "Đặt đồ ăn & Đi chợ",
      link: "/Category",
      img: "./storeIcon.png",
    },
    {
      content: "Đặt giao hàng",
      link: "/Category",
      img: "./carIcon.png",
    },
    {
      content: "Khuyến mãi",
      link: "/Category",
      img: "./saleIcon.png",
    },
    {
      content: "Thanh toán & Hoàn tiền",
      link: "/Category",
      img: "./payIcon.png",
    },
    {
      content: "Tài khoản ",
      link: "/Category",
      img: "./accoutIcon.png",
    },
    {
      content: "Thông tin chung",
      link: "/Category",
      img: "./inforIcon.png",
    },
  ];
  return (
    <div
      style={{
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Header />


      <div className={styles.searchBanner}>
        <h1>Chúng tôi có thể giúp gì cho bạn?</h1>
        <div className={styles.searchBar}>
          <input type="text" placeholder="Nhập nội dung cần tìm" />
          <button>Tìm kiếm</button>
        </div>
      </div>
      <div className={styles.content}>
        <h1>Mục lục</h1>
        <div className={styles.Listsection}>
          {listFunction.map((item, index) => (
            <div className={styles.section}>
              <img alt="" src={item.img} />
              <a href={item.link}>{item.content}</a>
            </div>
          ))}
        </div>
        <div className={styles.Ques}>
          <h1>Các câu hỏi thường gặp</h1>

        </div>
      </div>
    </div>
  );
}

export default Portal;
