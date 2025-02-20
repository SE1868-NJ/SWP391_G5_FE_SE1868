import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useAuth } from "../globalContext/AuthContext"; // ✅ Import useAuth

// Tạo context
export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [categoryList, setCategoryList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [notificationsList, setNotificationsList] = useState([]);
  const [option, setOption] = useState("Tất Cả");
  const [type, setType] = useState("Mới Nhất");
  const [typeNotification, setTypeNotification] = useState("Tất Cả Thông Báo");
  const [statusNotification, setStatusNotification] = useState ("unread");
  const [order_ID, setOrder_ID] = useState("");
  const [customer_ID, setCustomer_ID] = useState("");
  const [voucher_ID, setVoucher_ID] = useState("");
  const [menuDataLoaded, setMenuDataLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const { customerID } = useAuth(); // ✅ Nhận customerID từ AuthContext

  // ✅ Hàm gọi API danh mục sản phẩm
  const fetchCategories = async () => {
    setMenuDataLoaded(false);
    try {
      const response = await axios.get("http://localhost:3001/api/Products/Category");
      setCategoryList(response.data[0]);
      setMenuDataLoaded(true);
    } catch (error) {
      console.error("Lỗi khi tải danh mục:", error);
    }
  };

  // ✅ Hàm gọi API sản phẩm theo `option` và `type`
  const fetchProducts = async (selectedOption, selectedType) => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3001/api/Products/All/New", {
        params: { option: selectedOption, type: selectedType },
      });
      setProductList(response.data[0]);
    } catch (error) {
      console.error("Lỗi khi tải sản phẩm:", error);
    }
    setLoading(false);
  };

    // ✅ Hàm gọi API sản phẩm theo `option` và `type`
    const fetchStatusNotification = async (order_ID, customer_ID, voucher_ID, statusNotification) => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:3001/api/notifications_status", {
          params: { order_ID, customer_ID, voucher_ID, statusNotification },
        });
        setProductList(response.data[0]);
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

  // ✅ Gọi API sản phẩm khi `option` hoặc `type` thay đổi
  useEffect(() => {
    fetchProducts(option, type);
  }, [option, type]);

  return (
    <GlobalContext.Provider
      value={{
        categoryList,
        productList,
        option,
        setOption,
        type,
        setType,
        menuDataLoaded,
        loading,
        fetchProducts,
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
        setVoucher_ID
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
