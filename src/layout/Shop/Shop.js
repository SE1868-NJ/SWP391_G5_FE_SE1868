import styles from "./Shop.module.css";
import { useContext, useState } from "react";
import { GlobalContext } from "../../globalContext/GlobalContext";

function Shop() {
  const {
    inforShopList,
    voucherShopList,
    productShopSuggestList,
    categoryProductByShopID,
    productShopIDList =[]
  } = useContext(GlobalContext);

  console.log("Danh sách shop: ", categoryProductByShopID);

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Giá");

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

  const prevProducts = () => {
    if (currentProduct > 0) {
      setCurrentProduct(currentProduct - visibleItemsProduct);
    }
  };

  const nextProducts = () => {
    if (currentProduct + visibleItemsProduct < productShopIDList.length) {
      setCurrentProduct(currentProduct + visibleItemsProduct);
    }
  };

  const prevSuggest = () => {
    if (currentIndexSuggest > 0) {
      setCurrentIndexSuggest(currentIndexSuggest - visibleItemsSuggest);
    }
  };

  const nextSuggest = () => {
    if (
      currentIndexSuggest + visibleItemsSuggest <
      productShopSuggestList.length
    ) {
      setCurrentIndexSuggest(currentIndexSuggest + visibleItemsSuggest);
    }
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
            disabled={currentIndex === 0}
          >
            &lt;
          </button>
        )}

        <div style={{ display: "flex", gap: "1vw" }}>
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
                  Áp Dụng
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
            disabled={currentIndexSuggest === 0}
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
            disabled={
              currentIndexSuggest + visibleItemsSuggest >=
              productShopSuggestList.length
            }
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
            disabled={currentIndexSuggest === 0}
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
            disabled={
              currentIndexSuggest + visibleItemsSuggest >=
              productShopSuggestList.length
            }
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
              onClick={() => setActiveIndex(index)}
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
              width: "70vw",
              height: "8vh",
              flexDirection: "row",
            }}
          >
            <span>
              Sắp Xếp Theo
              <button>Phổ Biến</button>
              <button>Mới Nhất</button>
              <button>Bán Chạy</button>
              <span>
                <button
                  style={{ width: "15vw" }}
                  onClick={() => setIsOpen(!isOpen)}
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
                      left: "31.7vw",
                    }}
                  >
                    <button
                      style={{ border: "none" }}
                      onClick={() => handleSelect("Giá: Thấp đến Cao")}
                    >
                      Giá: Thấp đến Cao
                    </button>
                    <button
                      style={{ border: "none" }}
                      onClick={() => handleSelect("Giá: Cao đến Thấp")}
                    >
                      Giá: Cao đến Thấp
                    </button>
                  </div>
                )}
              </span>
              <span style={{position:"absolute", right:"1vw", marginTop: "1vh"}}>
                              
                      </span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Shop;
