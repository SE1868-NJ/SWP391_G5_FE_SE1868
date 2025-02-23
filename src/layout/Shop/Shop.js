import styles from "./Shop.module.css";
import { useContext } from "react";
import { GlobalContext } from "../../globalContext/GlobalContext";
function Shop() {
  const { inforShopList, setShopID } = useContext(GlobalContext);
  console.log("List Infor Shop: ", inforShopList);
  return (
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
        >
          + Theo Dõi
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
        <div className={styles.item}>Sản Phẩm: <span style={{color: "red", marginLeft: "1vw"}}>{inforShopList.total_products}</span></div>
        <div className={styles.item}>Đang Theo: <span style={{color: "red", marginLeft: "1vw"}}>{inforShopList.following}</span></div>
        <div className={styles.item}>Tỉ lệ phản hồi Chat: <span style={{color: "red", marginLeft: "1vw"}}>{inforShopList.response_rate}{"%"}({inforShopList.response_time})</span></div>
        <div className={styles.item}>Người theo dõi: <span style={{color: "red", marginLeft: "1vw"}}>{inforShopList.total_products}</span></div>
        <div className={styles.item}>Đánh Giá: <span style={{ color: "red", marginLeft: "1vw"}}>{inforShopList.total_products}</span></div>
        <div className={styles.item}>Tham gia: <span style={{color: "red", marginLeft: "1vw"}}>{new Date(inforShopList.join_date).toLocaleString("vi-VN", {
                        timeZone: "Asia/Ho_Chi_Minh",
                      })} </span>
        </div>
      </div>
      {/* <button onClick={() => setShopID(4)}>Hi</button> */}
    </div>
    
  );
}

export default Shop;
