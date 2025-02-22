import { useState, useContext } from "react";
import styles from "./Main.module.css";
import { GlobalContext } from "../../globalContext/GlobalContext";

function Main() {
  const { categoryList, setOptionMain, optionMain, productListMain, loading } =
    useContext(GlobalContext);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8; // Hiển thị 8 sản phẩm mỗi trang

  // Tính toán số trang
  const totalPages = Math.ceil(
    (productListMain?.length || 0) / productsPerPage
  );

  // Cắt danh sách sản phẩm để hiển thị trang hiện tại
  const currentProducts =
    productListMain?.slice(
      (currentPage - 1) * productsPerPage,
      currentPage * productsPerPage
    ) || [];

  const products = [
    {
      id: 1,
      name: "Sườn Nướng Ngũ Vị",
      price: "250.000 ",
      img: "suon-nuong.jpg",
    },
    { id: 2, name: "Bánh Sô-cô-la", price: "59.000 ", img: "banh-socola.jpg" },
    { id: 3, name: "Nấm Kho Tiêu", price: "65.274 ", img: "nam-kho.jpg" },
    {
      id: 4,
      name: "Cua Hoàng Đế",
      price: "1.200.000 ",
      img: "cua-hoang-de.jpg",
    },
    { id: 5, name: "Chân Gà Nướng", price: "120.000 ", img: "chan-ga.jpg" },
    { id: 6, name: "Sinh Tố Dâu", price: "45.940 ", img: "sinh-to-dau.jpg" },
    { id: 7, name: "Lẩu Ếch Măng Cay", price: "295.000 ", img: "lau-ech.jpg" },
    { id: 8, name: "Cà Phê Sữa Đá", price: "30.000 ", img: "ca-phe-sua.jpg" },
  ];

  return (
    <div className={styles.block_main}>
      <div className={styles.bar_one}>Deal Hôm Nay</div>
      <div style={{ background: "white" }} className={styles.showProducts}>
        {products.map((item, index) => (
          <div
            key={index}
            style={{ marginTop: "2vh", background: "#eee" }}
            className={styles.items_showProducts}
          >
            <img
              className={styles.img}
              src={item.ProductImg}
              alt={item.ProductName}
            />
            <p style={{ marginBottom: "0.2vw", marginTop: "0" }}>{item.name}</p>
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
              {Number(item.price).toLocaleString("vi-VI", {
                style: "currency",
                currency: "VND",
              })}{" "}
            </div>
            <div>
              =&gt; Đã bán: <span style={{ color: "blue" }}>15</span>
            </div>
          </div>
        ))}
      </div>
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
    </div>
  );
}

export default Main;
