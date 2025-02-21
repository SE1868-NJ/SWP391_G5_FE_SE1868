import { useState, useContext } from "react";
import styles from "./Main.module.css";
import { GlobalContext } from "../../globalContext/GlobalContext";

function Main() {
  const {
    categoryList,
    setOptionMain, optionMain, 
    productListMain ,
    loading,
  } = useContext(GlobalContext);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8; // Hiển thị 8 sản phẩm mỗi trang

  // Tính toán số trang
  const totalPages = Math.ceil((productListMain?.length || 0) / productsPerPage);

  // Cắt danh sách sản phẩm để hiển thị trang hiện tại
  const currentProducts =
    productListMain?.slice(
      (currentPage - 1) * productsPerPage,
      currentPage * productsPerPage
    ) || [];

  return (
    <div className={styles.wrapper}>
      {/* Category Options */}
      <div className={styles.options}>
        <div
          className={`${styles.items_options} ${
            optionMain === "Tất Cả" ? styles.active : ""
          }`}
          onClick={() => setOptionMain("Tất Cả")}
        >
          Tất Cả
        </div>
        {Array.isArray(categoryList) && categoryList.length > 0 ? (
          categoryList.map((item, index) => (
            <div
              key={index}
              className={`${styles.items_options} ${
                optionMain === item.Category ? styles.active : ""
              }`}
              onClick={() => setOptionMain(item.Category)}
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
        ) : currentProducts.length > 0 ? (
          currentProducts.map((item, index) => (
            <div key={index} className={styles.items_showProducts}>
              <img
                className={styles.img}
                src={item.ProductImg}
                alt={item.ProductName}
              />
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
                  fontSize: "1vw",
                  fontWeight: "bold",
                }}
              >
                {Number(item.Price).toLocaleString("vi-VI", {
                  style: "currency",
                  currency: "VND",
                })}{" "}
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            className={styles.pageButton}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            &lt;&lt;
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`${styles.pageButton} ${
                currentPage === index + 1 ? styles.activePage : ""
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className={styles.pageButton}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            &gt;&gt;
          </button>
        </div>
      )}
    </div>
  );
}

export default Main;
