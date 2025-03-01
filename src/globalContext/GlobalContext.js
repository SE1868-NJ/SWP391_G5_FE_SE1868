import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../globalContext/AuthContext"; // ✅ Import useAuth

// Tạo context
export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [categoryList, setCategoryList] = useState([]);
  const [notificationsList, setNotificationsList] = useState([]);
  const [optionMain, setOptionMain] = useState("Tất Cả");
  const [productListMain, setProductListMain] = useState([]);
  const [typeNotification, setTypeNotification] = useState("Tất Cả Thông Báo");
  const [statusNotification, setStatusNotification] = useState ("unread");
  const [order_ID, setOrder_ID] = useState("");
  const [customer_ID, setCustomer_ID] = useState("");
  const [voucher_ID, setVoucher_ID] = useState("");
  const [menuDataLoadedMain, setMenuDataLoadedMain] = useState(false);
  const [loading, setLoading] = useState(false);

  const { customerID } = useAuth() || {}; // ✅ Nhận customerID từ AuthContext

  // ✅ Hàm gọi API danh mục sản phẩm
  const fetchCategories = async () => {
    setMenuDataLoadedMain(false);
    try {
      const response = await axios.get("http://localhost:3001/api/Products/Category");
      setCategoryList(response.data[0]);
      setMenuDataLoadedMain(true);
    } catch (error) {
      console.error("Lỗi khi tải danh mục:", error);
    }
  };

    // ✅ Hàm gọi API sản phẩm theo `option`
    const fetchProductsMain = async (optionMain) => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:3001/api/Products/All", {
          params: { option: optionMain},
        });
        setProductListMain(response.data[0]);
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm:", error);
      }
      setLoading(false);
    };


    // ✅ Hàm gọi API sản phẩm theo `option` và `type`
    const fetchStatusNotification = async (order_ID, customer_ID, voucher_ID, statusNotification) => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:3001/api/notifications/notifications_status", {
          params: { order_ID, customer_ID, voucher_ID, statusNotification },
        });
        setNotificationsList(response.data[0]);
      } catch (error) {
        console.error("Lỗi khi tải status sản phẩm:", error);
      }
      setLoading(false);
    };

  // ✅ Hàm gọi API Notifications theo customerID
  const fetchNotifications = async (customerID,typeNotification) => {
    if (!customerID) {
      setNotificationsList([]); // Nếu không có customerID, đặt notifications rỗng
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3001/api/notifications", {
        params: { customerID, typeNotification },
      });
      setNotificationsList(response.data.length > 0 ? response.data : []);
    } catch (error) {
      console.error("Lỗi khi tải thông báo:", error);
    }
    setLoading(false);
  };

  // ✅ Gọi API danh mục khi component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // ✅ Gọi API Notifications khi customerID thay đổi (tự động cập nhật khi đăng nhập)
  useEffect(() => {
    if (customerID && typeNotification) {
      fetchNotifications(customerID, typeNotification);
    }
    fetchStatusNotification( order_ID, customer_ID, voucher_ID, statusNotification);
    console.log("đã cập nhật lại Status Noti");
  }, [customerID, typeNotification, statusNotification, order_ID, customer_ID, voucher_ID]);

    // ✅ Gọi API sản phẩm khi `option` thay đổi
    useEffect(() => {
      fetchProductsMain(optionMain);
    }, [optionMain]);


  return (
    <GlobalContext.Provider
      value={{
        categoryList,
        menuDataLoadedMain,
        loading,
        notificationsList,
        typeNotification,
        setTypeNotification, 
        setStatusNotification,
        statusNotification,
        order_ID,
        setOrder_ID,
        customer_ID,
        setCustomer_ID,
        voucher_ID,
        setVoucher_ID,
        setOptionMain,
        optionMain,
        productListMain, 
        setProductListMain
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
