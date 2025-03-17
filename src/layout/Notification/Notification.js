import styles from "./Notification.module.css";
import { GlobalContext } from "../../globalContext/GlobalContext";
import { useContext, useEffect, useState } from "react";
import { useAuth } from "../../globalContext/AuthContext";
import { useNavigate } from "react-router-dom";

function Notification() {
  const { notificationsList = [] } = useContext(GlobalContext);
  const { user } = useAuth();
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const {
    typeNotification,
    setTypeNotification,
    setStatusNotification,
    statusNotification,
    order_ID,
    setOrder_ID,
    voucher_ID,
    setVoucher_ID,
  } = useContext(GlobalContext);
  const items = ["Thông Báo", "Đơn Mua", "Kho Voucher"];
  const itemNoti = ["Tất Cả Thông Báo", "Cập Nhật Đơn Hàng", "Khuyến Mãi"];

  // Hiển thị thông báo Voucher
  const renderVoucherNotification = (item) => (
    <div

      onClick={() => {
        setOrder_ID(null);
        setStatusNotification("read");
        setVoucher_ID(item.VoucherID);
        window.location.reload();
      }}
      className={`${styles.focus} ${
        !item.status_voucherDetail || item.status_voucherDetail === "unread"
          ? styles.unread
          : ""
      }`}
    >
      <img className={styles.img_noti} src={item.VoucherImg} alt="Khuyến Mãi" />
      <div
        style={{ display: "flex", flexDirection: "column", marginLeft: "3vw" }}
      >
        <div className={styles.show_noti_item}>{item.VoucherTitle}</div>
        <div className={styles.show_noti_item}>{item.VoucherName}</div>
        <div className={styles.show_noti_item}>
          End:{" "}
          {new Date(item.EndDate).toLocaleString("vi-VN", {
            timeZone: "Asia/Ho_Chi_Minh",
          })}
        </div>
      </div>
      <button disabled className={styles.button_detail}>Xem Chi Tiết</button>
    </div>
  );

  // Hiển thị thông báo Order
  const renderOrderNotification = (item) => (
    (item.ProductImg && (<div
      onClick={() => {
        setOrder_ID(item.OrderID);
        setStatusNotification("read");
        setVoucher_ID(null);
        window.location.reload();
      }}
      className={`${styles.focus} ${
        !item.status_Orders || item.status_Orders === "unread"
          ? styles.unread
          : ""
      }`}
    >
      <img className={styles.img_noti} src={item.ProductImg} alt="Đơn Hàng" />
      <div
        style={{ display: "flex", flexDirection: "column", marginLeft: "3vw" }}
      >
        <div className={styles.show_noti_item}>{item.Status}</div>
        <div className={styles.show_noti_item}>
          Đơn Hàng
          <span style={{ marginLeft: "0.5vw" }} className={styles.highlight}>
            {item.OrderID}
          </span>
          {"  "} Đã {"  "}{" "}
          <span className={styles.highlight}>{item.Status}</span>
        </div>
        <div className={styles.show_noti_item}>
          {new Date(item.DeliveryTime).toLocaleString("vi-VN", {
            timeZone: "Asia/Ho_Chi_Minh",
          })}
        </div>
      </div>
      <button onClick={() => window.location.reload()} className={styles.button_detail}>Xem Chi Tiết</button>
    </div>))
  );

  // Hàm xử lý hiển thị các thông báo theo `typeNotification`
  const renderNotifications = (notifications) => {
    return notifications.map((item, index) => {
      return (
        <div key={ index}>
          {item.VoucherImg
            ? renderVoucherNotification(item)
            : renderOrderNotification(item)}
        </div>
      );
    });
  };
  

  const handleClick = (item) => {
    if (item === "Đơn Mua") {
      navigate("/OrderandVoucher");
    } else if (item === "Kho Voucher") {
      navigate("/OrderandVoucher");
    }
  };

  useEffect(() => {
    console.log("typeNotification has changed:", typeNotification);
    console.log("Notification List has changed:", notificationsList);
  }, [
    typeNotification,
    notificationsList,
    statusNotification,
    order_ID,
    voucher_ID,
  ]);

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
                <span
                  onClick={() => navigate("/customers/customer-info")}
                  className={styles.edit_profile}
                >
                  Sửa Hồ Sơ
                </span>
              </div>
            </>
          ) : (
            <p>Ko có dữ liệu</p>
          )}
        </div>
        <div className={styles.block_items}>
          {items.map((item, itemIndex) => (
            <div key={itemIndex}>
              <div onClick={() => handleClick(item)} className={styles.items}>
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
            </div>
          ))}
        </div>
      </div>
      <div className={styles.block_show_noti}>
        <div className={styles.check_status_noti}>Đánh Dấu Đã Đọc Tất Cả</div>
        {typeNotification === "Tất Cả Thông Báo" &&
          renderNotifications(notificationsList)}
        {typeNotification === "Cập Nhật Đơn Hàng" &&
          renderNotifications(notificationsList)}
        {typeNotification === "Khuyến Mãi" &&
          renderNotifications(notificationsList)}
      </div>
    </div>
  );
}

export default Notification;
