import { createContext, useState, useEffect } from "react";
import axios from "axios";

// Tạo context
export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [categoryList, setCategoryList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [option, setOption] = useState("Tất Cả");
  const [type, setType] = useState("Mới Nhất");
  const [menuDataLoaded, setMenuDataLoaded] = useState(false);
  const [loading, setLoading] = useState(false); // Trạng thái tải dữ liệu

  // Hàm gọi API danh mục sản phẩm
  const fetchCategories = async () => {
    setMenuDataLoaded(false); // Đánh dấu đang tải danh mục
    try {
      const response = await axios.get("http://localhost:3001/api/Products/Category");
      setCategoryList(response.data[0]);
      setMenuDataLoaded(true);
    } catch (error) {
      console.error("Lỗi khi tải danh mục:", error);
    }
  };

  // Hàm gọi API sản phẩm theo `option` và `type`
  const fetchProducts = async (selectedOption, selectedType) => {
    setLoading(true); // Đánh dấu đang tải sản phẩm
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

  // Gọi API danh mục khi component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Gọi API sản phẩm khi `option` hoặc `type` thay đổi
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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
