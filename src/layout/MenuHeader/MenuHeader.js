// import { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import styles from "./MenuHeader.module.css";

// function MenuHeader() {
//   const [hover, setHover] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [productList, setProductList] = useState([]);
//   const [categoryList, setCategoryList] = useState([]);
//   const [activeCategory, setActiveCategory] = useState(-1);
//   const [activeType, setActiveType] = useState(0);
//   const [option, setOption] = useState("Tất Cả");
//   const [type, setType] = useState("Mới Nhất");

//   const allNew = useCallback(async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:3001/api/Products/All/New",
//         {
//           params: { option, type },
//         }
//       );
//       setProductList(response.data[0]);
//     } catch (error) {
//       console.log(error);
//     }
//   }, [option, type]);

//   useEffect(() => {
//     allNew();
//   }, [allNew]);

//   async function allCategory() {
//     try {
//       const response = await axios.get(
//         "http://localhost:3001/api/Products/Category"
//       );
//       setCategoryList(response.data[0]);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   return (
//     <div className={styles.fhs_option_header}>
//       <div
//         className={styles.fhs_option_header_span}
//         onClick={() => {
//           setIsMenuOpen(!isMenuOpen);
//           allCategory();
//           allNew();
//         }}
//         onMouseLeave={() => {
//           if (!isMenuOpen) setHover(false);
//         }}
//       >
//         <img
//           src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/ico_menu.svg"
//           alt=""
//           style={{
//             width: "36px",
//             cursor: "pointer",
//             borderBottom: hover || isMenuOpen ? "4px solid black" : "none",
//           }}
//           onMouseEnter={() => setHover(true)}
//           onMouseLeave={() => setHover(false)}
//         />
//         <img
//           src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/icon_seemore_gray.svg"
//           alt=""
//           style={{
//             cursor: "pointer",
//             borderBottom: hover || isMenuOpen ? "4px solid black" : "none",
//           }}
//           onMouseEnter={() => setHover(true)}
//           onMouseLeave={() => setHover(false)}
//         />
//       </div>

//       {isMenuOpen && (
//         <div
//           style={{
//             position: "absolute",
//             top: "8vh",
//             left: "19.5vw",
//             width: "60vw",
//             backgroundColor: "white",
//             borderRadius: "10px",
//             padding: "10px",
//           }}
//         >
//           <div className={styles.option}>
//             <div
//               className={`${styles.items_option} ${activeCategory === -1 ? styles.active : ""}`}
//               onClick={() => {
//                 setActiveCategory(-1);
//                 setOption("Tất Cả");
//               }}
//             >
//               Tất Cả
//             </div>
//             {Array.isArray(categoryList) && categoryList.length > 0 ? (
//               categoryList.map((item, index) => (
//                 <div
//                   key={index}
//                   className={`${styles.items_option} ${activeCategory === index ? styles.active : ""}`}
//                   onClick={() => {
//                     setActiveCategory(index);
//                     setOption(item.Category);
//                   }}
//                 >
//                   {item.Category}
//                 </div>
//               ))
//             ) : (
//               <p>Không có dữ liệu</p>
//             )}
//           </div>

//           <div style={{ display: "flex", flexDirection: "row" }}>
//             <div className={styles.type}>
//               {["Mới Nhất", "Rẻ Nhất", "Đắt Nhất", "Bán Chạy Nhất"].map((label, index) => (
//                 <div
//                   key={index}
//                   className={`${styles.items_type} ${activeType === index ? styles.active : ""}`}
//                   onClick={() => {
//                     setActiveType(index);
//                     setType(label);
//                   }}
//                 >
//                   {label}
//                 </div>
//               ))}
//             </div>

//             <div className={styles.showProducts}>
//               {Array.isArray(productList) && productList.length > 0 ? (
//                 productList.map((item, index) => (
//                   <div key={index} className={styles.items_showProducts}>
//                     <img className={styles.img} src={item.ProductImg} alt="" />
//                     <p style={{ marginBottom: "0.2vw", marginTop: "0" }}>
//                       {item.ProductName}
//                     </p>
//                     <div
//                       style={{
//                         color: "red",
//                         marginBottom: "0.2vw",
//                         height: "1.7vw",
//                       }}
//                     >
//                       {item.Price}{" "}
//                       <img
//                         style={{ width: "1vw", height: "1.3vw" }}
//                         src="https://static.thenounproject.com/png/1060425-200.png"
//                         alt=""
//                       />
//                     </div>
//                     <div>
//                       =&gt; Đã bán:{" "}
//                       <span style={{ color: "blue" }}>{item.SoldQuantity}</span>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <p>Không có dữ liệu</p>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default MenuHeader;


import { useState, useContext } from "react";
import { GlobalContext } from "../../globalContext/GlobalContext"; // Import context
import styles from "./MenuHeader.module.css";

function MenuHeader() {
  const {
    categoryList,
    productList,
    option,
    setOption,
    type,
    setType,
    menuDataLoaded,
    fetchProducts,
  } = useContext(GlobalContext); // Lấy dữ liệu từ context

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const [activeCategory, setActiveCategory] = useState(-1);
  const [activeType, setActiveType] = useState(0);

  return (
    <div className={styles.fhs_option_header}>
      {/* Button mở menu */}
      <div
        className={styles.fhs_option_header_span}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        onMouseLeave={() => {
          if (!isMenuOpen) setHover(false);
        }}
      >
        <img
          src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/ico_menu.svg"
          alt=""
          style={{
            width: "36px",
            cursor: "pointer",
            borderBottom: hover || isMenuOpen ? "4px solid black" : "none",
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        />
        <img
          src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/icon_seemore_gray.svg"
          alt=""
          style={{
            cursor: "pointer",
            borderBottom: hover || isMenuOpen ? "4px solid black" : "none",
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        />
      </div>

      {/* Menu Dropdown */}
      {isMenuOpen && (
        <div
          style={{
            position: "absolute",
            top: "8vh",
            left: "19.5vw",
            width: "60vw",
            backgroundColor: "white",
            borderRadius: "10px",
            padding: "10px",
          }}
        >
          {/* Danh mục */}
          <div className={styles.option}>
            <div
              className={`${styles.items_option} ${
                activeCategory === -1 ? styles.active : ""
              }`}
              onClick={() => {
                setActiveCategory(-1);
                setOption("Tất Cả");
                fetchProducts("Tất Cả", type);
              }}
            >
              Tất Cả
            </div>
            {menuDataLoaded ? (
              categoryList.map((item, index) => (
                <div
                  key={index}
                  className={`${styles.items_option} ${
                    activeCategory === index ? styles.active : ""
                  }`}
                  onClick={() => {
                    setActiveCategory(index);
                    setOption(item.Category);
                    fetchProducts(item.Category, type);
                  }}
                >
                  {item.Category}
                </div>
              ))
            ) : (
              <p>Không có dữ liệu</p>
            )}
          </div>

          {/* Loại sản phẩm */}
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div className={styles.type}>
              {["Mới Nhất", "Rẻ Nhất", "Đắt Nhất", "Bán Chạy Nhất"].map(
                (label, index) => (
                  <div
                    key={index}
                    className={`${styles.items_type} ${
                      activeType === index ? styles.active : ""
                    }`}
                    onClick={() => {
                      setActiveType(index);
                      setType(label);
                      fetchProducts(option, label);
                    }}
                  >
                    {label}
                  </div>
                )
              )}
            </div>

            {/* Hiển thị sản phẩm */}
            <div className={styles.showProducts}>
              {productList.length > 0 ? (
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
                        display: "flex",
                        flexDirection:"row"
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
        </div>
      )}
    </div>
  );
}

export default MenuHeader;


