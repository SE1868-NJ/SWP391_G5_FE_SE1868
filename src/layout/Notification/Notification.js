import styles from "./Notification.module.css";
import { GlobalContext } from "../../globalContext/GlobalContext";
import { useContext, useEffect } from "react";
import { useAuth } from "../../globalContext/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Notification() {
  const { notificationsList } = useContext(GlobalContext);
  const { user } = useAuth();
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const { typeNotification, setTypeNotification } = useContext(GlobalContext);
  const items = ["Thông Báo", "Đơn Mua", "Kho Voucher"];
  const itemNoti = ["Tất Cả Thông Báo", "Cập Nhật Đơn Hàng", "Khuyến Mãi"];

  const handleClick = (item) => {
    if (item === "Đơn Mua") {
      navigate("/OrderCheckOut");
    } else if (item === "Kho Voucher") {
      navigate("/");
    }
  };

  useEffect(() => {
    console.log("typeNotification has changed:", typeNotification);
    console.log("Notification List has changed:", notificationsList);
  }, [typeNotification, notificationsList]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.sideBar}>
        <div
          style={{
            display: "flex",
            paddingBottom: "1.5vh",
            borderBottom: "1px solid blue",
            marginBottom: "2vh",
          }}
        >
          {user ? (
            <>
              <img src={user.avatar} alt="Avatar" className={styles.avatar} />
              <div style={{ flexDirection: "column" }}>
                <div className={styles.profile}>{user.name}</div>
                <span className={styles.edit_profile}>Sửa Hồ Sơ</span>
              </div>
            </>
          ) : (
            <p>Ko có dữ liệu</p>
          )}
        </div>
        <div className={styles.block_items}>
          {items.map((item, index) => (
            <>
              <div
                onClick={() => handleClick(item)}
                className={styles.items}
                key={index}
              >
                {item}
              </div>
              {item === "Thông Báo" && (
                <ul className={styles.block_itemNoti}>
                  {itemNoti.map((noti, index) => (
                    <li
                      key={index}
                      className={`${styles.itemNoti} ${
                        activeIndex === index ? styles.active : ""
                      }`}
                      onClick={() => {
                        setActiveIndex(index);
                        setTypeNotification(noti);
                      }}
                    >
                      {noti}
                    </li>
                  ))}
                </ul>
              )}
            </>
          ))}
        </div>
      </div>
      <div className={styles.block_show_noti}>
        <div className={styles.check_status_noti}>Đánh Dấu Đã Đọc Tất Cả</div>
        {notificationsList.map((item, index) => {
          return (
            <div
              key={index} // Key đặt ở thẻ cha để React tối ưu render
              style={{
                display: "flex",
                flexDirection: "row",
                paddingBottom: "1.5vh",
                paddingTop: "1.5vh",
                marginLeft: "3vh",
                width: "57vw",
                cursor: "pointer",
              }}
            >
              {typeNotification === "Tất Cả Thông Báo" && (
                <>
                  <img
                    className={styles.img_noti}
                    src={item.image1}
                    alt="Thông Báo"
                  />
                  <div style={{ display: "flex", flexDirection: "column" , marginLeft: "3vw"}}>
                    <div className={styles.show_noti_item}>
                      {item.VoucherTitle}
                    </div>
                    <div className={styles.show_noti_item}>
                      {item.VoucherName}
                    </div>
                  </div>
                </>
              )}

              {typeNotification === "Cập Nhật Đơn Hàng" && (
                <>
                  <img
                    className={styles.img_noti}
                    src={item.ProductImgs}
                    alt="Đơn Hàng"
                  />
                  <div style={{ display: "flex", flexDirection: "column" , marginLeft: "3vw"}}>
                    <div className={styles.show_noti_item}>
                      {item.Status}
                    </div>
                    <div className={styles.show_noti_item}>
                      Đơn Hàng {item.OrderID} Đã {item.Status}
                    </div>
                  </div>
                </>
              )}

              {typeNotification === "Khuyến Mãi" && (
                <>
                  <img
                    className={styles.img_noti}
                    src={item.VoucherImg}
                    alt="Khuyến Mãi"
                  />
                  <div style={{ display: "flex", flexDirection: "column" , marginLeft: "3vw"}}>
                    <div className={styles.show_noti_item}>
                      {item.VoucherTitle}
                    </div>
                    <div className={styles.show_noti_item}>
                      {item.VoucherName}
                    </div>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Notification;
