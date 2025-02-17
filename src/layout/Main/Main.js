import styles from "./Main.module.css";
import { useContext } from "react";
import { GlobalContext } from "../../globalContext/GlobalContext";

function Main() {
  const {
    categoryList,
    productList,
    option,
    setOption,
    loading,
  } = useContext(GlobalContext);

  return (
    <div className={styles.wrapper}>
      {/* Category Options */}
      <div className={styles.options}>
        <div
          className={`${styles.items_options} ${
            option === "Tất Cả" ? styles.active : ""
          }`}
          onClick={() => setOption("Tất Cả")}
        >
          Tất Cả
        </div>
        {Array.isArray(categoryList) && categoryList.length > 0 ? (
          categoryList.map((item, index) => (
            <div
              key={index}
              className={`${styles.items_options} ${
                option === item.Category ? styles.active : ""
              }`}
              onClick={() => setOption(item.Category)}
            >
              {item.Category}
            </div>
          ))
        ) : (
          <p>Không có dữ liệu</p>
        )}
      </div>

      {/* Product List */}
      <div className={styles.showProducts}>
        {loading ? (
          <p>Đang tải sản phẩm...</p>
        ) : Array.isArray(productList) && productList.length > 0 ? (
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
                  height: "2vw",
                  display: "flex",
                  flexDirection: "row",
                  fontSize: "1.3vw", 
                  fontWeight: "bold",
                }}
              >
                {item.Price}{" "}
                <img
                  style={{ width: "1.5vw", height: "1.5vw" }}
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
  );
}

export default Main;
