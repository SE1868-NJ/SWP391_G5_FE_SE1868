import styles from "./Main.module.css";
import { useState } from "react";
import axios from "axios";
import { useEffect, useCallback } from "react";

function Main() {
  const [categoryList, setCategoryList] = useState([]);
  const [activeCategory, setActiveCategory] = useState(-1);
  const [productList, setProductList] = useState([]);
  const [option, setOption] = useState("Tất Cả");

  const allProducts = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/Products/All",
        {
          params: { option },
        }
      );
      setProductList(response.data[0]);
    } catch (error) {
      console.log(error);
    }
  }, [option]); // allNew sẽ được re-created khi option hoặc type thay đổi

  useEffect(() => {
    allProducts(); // Gọi hàm allNew khi type hoặc option thay đổi
  }, [allProducts]);

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
    allCategory(),
    (
      <div className={styles.wrapper}>
        <div className={styles.options}>
          <div
            className={`${styles.items_options} ${
              activeCategory === -1 ? styles.active : ""
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
                className={`${styles.items_options} ${
                  activeCategory === index ? styles.active : ""
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
        <div className={styles.showProducts}>
        {Array.isArray(productList) && productList.length > 0 ? (
                productList.map((item, index) => (
                  <div key={index} className={styles.items_showProducts}>
                    <img className={styles.img} src={item.ProductImg} alt="" />
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
    )
  );
}

export default Main;
