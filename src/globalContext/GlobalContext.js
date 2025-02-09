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

  // Hàm gọi API danh mục sản phẩm
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/Products/Category");
      setCategoryList(response.data[0]);
      setMenuDataLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  // Hàm gọi API sản phẩm theo `option` và `type`
  const fetchProducts = async (selectedOption, selectedType) => {
    try {
      const response = await axios.get("http://localhost:3001/api/Products/All/New", {
        params: { option: selectedOption, type: selectedType },
      });
      setProductList(response.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  // Gọi API khi component mount
  useEffect(() => {
    fetchCategories();
    fetchProducts(option, type);
  }, []);

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
        fetchProducts,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
