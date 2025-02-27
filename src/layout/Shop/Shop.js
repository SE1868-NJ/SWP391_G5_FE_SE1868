import styles from "./Shop.module.css";
import { useContext, useState } from "react";
import { GlobalContext } from "../../globalContext/GlobalContext";
import { ShopContext } from "../../globalContext/ShopContext";

function Shop() {
  const {
    inforShopList,
    voucherShopList,
    productShopSuggestList,
    categoryProductByShopID,
    setShopID,
  } = useContext(GlobalContext);

  const { productShopList, setTypeCategory, setOptionProductShop } =   useContext(ShopContext);


  console.log("Danh sách shop: ", categoryProductByShopID);

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Giá");
  const [activeButton, setActiveButton] = useState("Phổ Biến");

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8; // Hiển thị 8 sản phẩm mỗi trang

  // Tính toán số trang
  const totalPages = Math.ceil(
    (productShopList?.length || 0) / productsPerPage
  );

  // Cắt danh sách sản phẩm để hiển thị trang hiện tại
  const currentProducts =
    productShopList?.slice(
      (currentPage - 1) * productsPerPage,
      currentPage * productsPerPage
    ) || [];

  const handleSortButtonClick = (option) => {
    setActiveButton(option);
  };

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
  };
  const [activeIndex, setActiveIndex] = useState(0);
  const [indexProduct, setIndexProduct] = useState(0);
  const [statusFollow, setStatusFollow] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentProduct, setCurrentProduct] = useState(0);
  const [currentIndexSuggest, setCurrentIndexSuggest] = useState(0);
  const visibleItems = 3;
  const visibleItemsSuggest = 5;
  const visibleItemsProduct = 4;

  // Xử lý chuyển trang
  const nextVouchers = () => {
    if (currentIndex + visibleItems < voucherShopList.length) {
      setCurrentIndex(currentIndex + visibleItems);
    }
  };

  const prevVouchers = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - visibleItems);
    }
  };

  const prevSuggest = () => {
    setCurrentIndexSuggest((prevIndex) =>
      prevIndex - visibleItemsSuggest >= 0
        ? prevIndex - visibleItemsSuggest
        : productShopSuggestList.length -
          (productShopSuggestList.length % visibleItemsSuggest ||
            visibleItemsSuggest)
    );
  };

  const nextSuggest = () => {
    setCurrentIndexSuggest((prevIndex) =>
      prevIndex + visibleItemsSuggest < productShopSuggestList.length
        ? prevIndex + visibleItemsSuggest
        : 0
    );
  };

  return (
    <>
      <div className={styles.block_one}>
        <div style={{ width: "25vw", height: "15vh", position: "relative" }}>
          <img
            style={{ width: "25vw", height: "15vh" }}
            src={inforShopList.Background}
            alt=""
          />
          <img
            style={{
              width: "8vw",
              height: "8vh",
              borderRadius: "50%",
              position: "absolute",
              left: "1vw",
              top: "1.5vh",
            }}
            src={inforShopList.ShopAvatar}
            alt=""
          />
          <button
            style={{
              width: "11vw",
              height: "1vh",
              borderRadius: "5px",
              position: "absolute",
              left: "0.5vw",
              top: "10vh",
              fontSize: "0.8vw",
              display: "flex", // ✅ Căn giữa
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => setStatusFollow(!statusFollow)}
          >
            <span>{statusFollow ? "Đang Theo Dõi" : "+ Theo Dõi"}</span>
          </button>
          <button
            style={{
              width: "11vw",
              height: "1vh",
              borderRadius: "5px",
              position: "absolute",
              left: "13vw",
              top: "10vh",
              fontSize: "0.8vw",
              display: "flex", // ✅ Căn giữa
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ... Chat
          </button>
        </div>
        <div className={styles.block_one_2}>
          <div className={styles.item}>
            Sản Phẩm:{" "}
            <span style={{ color: "red", marginLeft: "1vw" }}>
              {inforShopList.total_products}
            </span>
          </div>
          <div className={styles.item}>
            Đang Theo:{" "}
            <span style={{ color: "red", marginLeft: "1vw" }}>
              {inforShopList.following}
            </span>
          </div>
          <div className={styles.item}>
            Tỉ lệ phản hồi Chat:{" "}
            <span style={{ color: "red", marginLeft: "1vw" }}>
              {inforShopList.response_rate}
              {"%"}({inforShopList.response_time})
            </span>
          </div>
          <div className={styles.item}>
            Người theo dõi:{" "}
            <span style={{ color: "red", marginLeft: "1vw" }}>
              {inforShopList.total_products}
            </span>
          </div>
          <div className={styles.item}>
            Đánh Giá:{" "}
            <span style={{ color: "red", marginLeft: "1vw" }}>
              {inforShopList.total_products}
            </span>
          </div>
          <div className={styles.item}>
            Tham gia:{" "}
            <span style={{ color: "red", marginLeft: "1vw" }}>
              {new Date(inforShopList.join_date).toLocaleString("vi-VN", {
                timeZone: "Asia/Ho_Chi_Minh",
              })}{" "}
            </span>
          </div>
        </div>
      </div>

      <div
        className={styles.block_two}
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {voucherShopList.length > visibleItems && (
          <button
            style={{
              position: "absolute",
              left: "-1.5vw",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: "10",
              backgroundColor: "white",
              border: "1px solid black",
              cursor: "pointer",
              borderRadius: "50%",
            }}
            onClick={prevVouchers}
          >
            &lt;
          </button>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1vw",
          }}
        >
          {voucherShopList
            .slice(currentIndex, currentIndex + visibleItems)
            .map((item, index) => (
              <div key={index} className={styles.block_item_voucher}>
                <div>{item.VoucherTitle}</div>
                <div>{item.VoucherName}</div>
                <div>
                  EndDate:{" "}
                  {new Date(item.EndDate).toLocaleString("vi-VN", {
                    timeZone: "Asia/Ho_Chi_Minh",
                  })}
                </div>
                <button
                  style={{
                    position: "absolute",
                    right: "1vw",
                    top: "0.1vh",
                    fontSize: "1vw",
                    padding: "0.4vw",
                  }}
                >
                  Lưu
                </button>
              </div>
            ))}
        </div>

        {voucherShopList.length > visibleItems && (
          <button
            style={{
              position: "absolute",
              right: "-1.5vw",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: "10",
              backgroundColor: "white",
              border: "1px solid black",
              cursor: "pointer",
              borderRadius: "50%",
            }}
            onClick={nextVouchers}
            disabled={currentIndex + visibleItems >= voucherShopList.length}
          >
            &gt;
          </button>
        )}
      </div>
      <div className={styles.block_three}>
        <div
          style={{
            padding: "1vw",
            fontSize: "1.5vw",
            fontWeight: "500",
            color: "red",
          }}
        >
          {" "}
          Gợi Ý Cho Bạn <span style={{ color: "red" }}>(10 Sản Phẩm)</span>
        </div>
        {/* Hiển thị sản phẩm */}
        <div
          className={styles.showProducts}
          style={{
            position: "relative",
            display: "flex",
          }}
        >
          <button
            style={{
              position: "absolute",
              left: "-2.3vw",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: "10",
              backgroundColor: "white",
              border: "1px solid black",
              cursor: "pointer",
              borderRadius: "50%",
            }}
            onClick={prevSuggest}
          >
            &lt;
          </button>
          {productShopSuggestList.length > 0 ? (
            productShopSuggestList
              .slice(
                currentIndexSuggest,
                currentIndexSuggest + visibleItemsSuggest
              )
              .map((item, index) => (
                <div key={index} className={styles.items_showProducts}>
                  <img className={styles.img} src={item.ProductImg} alt="" />
                  <p style={{ marginBottom: "2vh", marginTop: "0" }}>
                    {item.ProductName}
                  </p>
                  <div
                    style={{
                      color: "red",
                      marginBottom: "1.5vh",
                      height: "1.7vw",
                      display: "flex",
                      flexDirection: "row",
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
          <button
            style={{
              position: "absolute",
              right: "-2.3vw",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: "10",
              backgroundColor: "white",
              border: "1px solid black",
              cursor: "pointer",
              borderRadius: "50%",
            }}
            onClick={nextSuggest}
          >
            &gt;
          </button>
        </div>
      </div>
      <div className={styles.block_three}>
        <div
          style={{
            padding: "1vw",
            fontSize: "1.5vw",
            fontWeight: "500",
            color: "red",
          }}
        >
          {" "}
          Sản Phẩm Bán Chạy Nhất{" "}
          <span style={{ color: "red" }}>(10 Sản Phẩm)</span>
        </div>
        {/* Hiển thị sản phẩm */}
        <div
          className={styles.showProducts}
          style={{
            position: "relative",
            display: "flex",
          }}
        >
          <button
            style={{
              position: "absolute",
              left: "-2.3vw",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: "10",
              backgroundColor: "white",
              border: "1px solid black",
              cursor: "pointer",
              borderRadius: "50%",
            }}
            onClick={prevSuggest}
          >
            &lt;
          </button>
          {productShopSuggestList.length > 0 ? (
            productShopSuggestList
              .slice(
                currentIndexSuggest,
                currentIndexSuggest + visibleItemsSuggest
              )
              .map((item, index) => (
                <div key={index} className={styles.items_showProducts}>
                  <img className={styles.img} src={item.ProductImg} alt="" />
                  <p style={{ marginBottom: "2vh", marginTop: "0" }}>
                    {item.ProductName}
                  </p>
                  <div
                    style={{
                      color: "red",
                      marginBottom: "1.5vh",
                      height: "1.7vw",
                      display: "flex",
                      flexDirection: "row",
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
          <button
            style={{
              position: "absolute",
              right: "-2.3vw",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: "10",
              backgroundColor: "white",
              border: "1px solid black",
              cursor: "pointer",
              borderRadius: "50%",
            }}
            onClick={nextSuggest}
          >
            &gt;
          </button>
        </div>
      </div>
      <div className={styles.block_four}>
        <div className={styles.block_sidebar_shop}>
          <div
            style={{
              padding: "2vh 1vw",
              borderBottom: "1px solid black",
              fontSize: "1.3vw",
              fontWeight: "600",
            }}
          >
            Danh Mục
          </div>
          {categoryProductByShopID.map((itemCategory, index) => (
            <div
              onClick={() => {
                setActiveIndex(index);
                setTypeCategory(itemCategory.Category);
              }}
              className={`${styles.categoryItem} ${
                activeIndex === index ? styles.active : ""
              }`}
              key={index}
            >
              {itemCategory.Category}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              position: "relative",
              width: "65vw",
              height: "8vh",
              flexDirection: "row",
            }}
          >
            <span>
              Sắp Xếp Theo
              <button
                style={{ border: "none" }}
                className={
                  activeButton === "Phổ Biến" ? styles.activeButton : ""
                }
                onClick={() => {
                  handleSortButtonClick("Phổ Biến");
                  setOptionProductShop("Phổ Biến");
                }}
              >
                Phổ Biến
              </button>
              <button
                style={{ border: "none" }}
                className={
                  activeButton === "Mới Nhất" ? styles.activeButton : ""
                }
                onClick={() => {
                  handleSortButtonClick("Mới Nhất");
                  setOptionProductShop("Mới Nhất");
                }}
              >
                Mới Nhất
              </button>
              <button
                style={{ border: "none" }}
                className={
                  activeButton === "Bán Chạy" ? styles.activeButton : ""
                }
                onClick={() => {
                  handleSortButtonClick("Bán Chạy");
                  setOptionProductShop("Bán Chạy");
                }}
              >
                Bán Chạy
              </button>
              <span>
                <button
                  className={
                    ["Giá", "Giá: Thấp đến Cao", "Giá: Cao đến Thấp"].includes(
                      activeButton
                    )
                      ? styles.activeButton
                      : ""
                  }
                  style={{ width: "15vw", border: "none" }}
                  onClick={() => {
                    setIsOpen(!isOpen);
                    handleSortButtonClick("Giá");
                  }}
                >
                  {selected} <span>▼</span>
                </button>
                {isOpen && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      zIndex: "10",
                      width: "15vw",
                      position: "absolute",
                      left: "31vw",
                    }}
                  >
                    <button
                      style={{ border: "none" }}
                      onClick={() => {
                        handleSelect("Giá: Thấp đến Cao");
                        handleSortButtonClick("Giá: Thấp đến Cao");
                        setOptionProductShop("Giá: Thấp đến Cao");
                      }}
                      className={
                        [
                          "Giá",
                          "Giá: Thấp đến Cao",
                          "Giá: Cao đến Thấp",
                        ].includes(activeButton)
                          ? styles.activeButton
                          : ""
                      }
                    >
                      Giá: Thấp đến Cao
                    </button>
                    <button
                      style={{ border: "none" }}
                      onClick={() => {
                        handleSelect("Giá: Cao đến Thấp");
                        handleSortButtonClick("Giá: Cao đến Thấp");
                        setOptionProductShop("Giá: Cao đến Thấp");
                      }}
                      className={
                        [
                          "Giá",
                          "Giá: Thấp đến Cao",
                          "Giá: Cao đến Thấp",
                        ].includes(activeButton)
                          ? styles.activeButton
                          : ""
                      }
                    >
                      Giá: Cao đến Thấp
                    </button>
                  </div>
                )}
              </span>
              <button onClick={() => setShopID(2)}>hihi</button>
              <span style={{ marginLeft: "4.1vw" }}>
                {currentPage} /{" "}
                <span style={{ color: "red" }}>{totalPages} </span>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                >
                  &lt;
                </button>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                >
                  &gt;
                </button>
              </span>
            </span>
          </div>
          <div className={styles.showProducts_Shop}>
            {currentProducts.length > 0 ? (
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
                      alignItems: "center",
                      position: "relative",
                    }}
                  >
                    {Number(item.Price).toLocaleString("vi-VI", {
                      style: "currency",
                      currency: "VND",
                    })}{" "}
                    <span>
                      <img
                        style={{
                          cursor: "pointer",
                          position: "absolute",
                          right: "-4vw",
                          top: "50%",
                          transform: "translateY(-50%)",
                          width: "1vw",
                          height: "1vw",
                        }}
                        src="/tym.png"
                        alt=""
                      />
                    </span>
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
          {/* Chuyển trang */}
          {totalPages > 0 && (
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
    </>
  );
}

export default Shop;
