import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";
import styles from "./Cart.module.css";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedAll, setSelectedAll] = useState(false);
  const cusID = 2;
  const address =
    "Nguyễn Anh Đức (+84) 919824069    Xưởng may Cơ Xen, Xã Vũ Hòa, Huyện Kiến Xương, Thái Bình";
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/order",{state:selectedItems});
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.post('http://localhost:3001/api/Cart/cusID', { cusID: cusID });
        console.log("Fetched Cart Data:", response.data);
        await setCartItems(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy giỏ hàng:", error);
      }
    };
    fetchCart();
  }, []);

  const updateQuantity = async (cartID, amount) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.cartID === cartID
          ? { ...item, Quantity: Math.max(1, item.Quantity + amount) }
          : item
      )
    );

    try {
      await axios.put('http://localhost:3001/api/Cart/updateQuantity', { cartID, amount });
    } catch (error) {
      console.error(error);
    }
  };

  const removeItem = async (cartID) => {
    try {
      await axios.delete(`http://localhost:3001/api/Cart/deleteItem`, { data: { cartID } });
      setCartItems(prevItems => prevItems.filter(item => item.cartID !== cartID));
    } catch (error) {
      console.error(error);
    }
  };
  const handleSelectAll = () => {
    if (selectedAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map(item => item.cartID));
    }
    setSelectedAll(!selectedAll);
  }

  const handleSelectItem = (cartID) => {
    if (cartID === undefined || cartID === null) {
      console.error("Error: cartDetailID is undefined or null!");
      return;
    }
    console.log("Selected Item:", cartID);
    setSelectedItems(prevSelected => {
      if (!Array.isArray(prevSelected)) {
        prevSelected = [];
      }

      const isSelected = prevSelected.includes(cartID);
      const newSelected = isSelected
        ? prevSelected.filter(id => id !== cartID)
        : [...prevSelected, cartID];

      console.log("Selected Items:", newSelected);
      console.log("Selected All:", newSelected.length === cartItems.length);
      setSelectedAll(newSelected.length === cartItems.length);

      return newSelected;
    });
  };

  const totalPrice = cartItems
    .filter(item => selectedItems.includes(item.cartID))
    .reduce((total, item) => total + item.productPrice * item.Quantity, 0);

  return (
    <div>
      <Header />
      <div className={styles.cart_container}>
        <div className={styles.link}>
          <a href="/">Trang Chủ</a>
          {" "} &gt; {" "}
          <a href="/cart">Giỏ hàng</a>
        </div>
        <h2 className={styles.cart_header}>Giỏ hàng</h2>
        <div className={styles.address}>
          <img alt="" src='./addressIcon.png' />
          Địa chỉ:
          <p>{address}</p>
        </div>
        <div className={styles.cart_content}>
          <table style={{ backgroundColor: "white" }}>
            <thead>
              <tr>
                <th className={styles.c0}><input type="checkbox"
                  checked={selectedAll}
                  onChange={handleSelectAll} /></th>
                <th className={styles.c1}>Sản phẩm</th>
                <th className={styles.c2}>Giá</th>
                <th className={styles.c3}>Số lượng</th>
                <th className={styles.c4}>Số tiền</th>
                <th className={styles.c5}>Tùy chọn</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.length === 0 ? (
                <p className={styles.empty_cart}>Giỏ hàng đang trống</p>
              ) : (
                cartItems.map((item) => (
                  <tr key={item.cartID}>
                    <td><input
                      type="checkbox"
                      checked={selectedItems.includes(item.cartID)}
                      onChange={() => {
                        console.log("Clicked item ID:", item.cartID);
                        handleSelectItem(item.cartID);
                      }}
                    /></td>
                    <td className={styles.item_info}>
                      <img src={item.productImg} alt={item.productName} className={styles.item_image} />
                      <span className={styles.item_name}>{item.productName}</span>
                    </td>
                    <td className={styles.c2}>
                      {item.productPrice.toLocaleString()} VNĐ
                    </td>
                    <td className={styles.c3}>
                      <div className={styles.quantity_control}>
                        <button className={styles.quantity_button} onClick={() => updateQuantity(item.cartID, -1)}>
                          -
                        </button>
                        <span className={styles.quantity_value}>{item.Quantity}</span>
                        <button className={styles.quantity_button} onClick={() => updateQuantity(item.cartID, 1)}>
                          +
                        </button>
                      </div>
                    </td>
                    <td className={styles.c4}>
                      {(item.productPrice * item.Quantity).toLocaleString()} VNĐ
                    </td>
                    <td className={styles.c5}>
                      <button className={styles.remove_button} onClick={() => removeItem(item.cartID)}>
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {cartItems.length > 0 && (
            <div className={styles.total}>
              <h3>Tổng: {totalPrice.toLocaleString()} VNĐ</h3>
              <button className={styles.checkout_button} onClick={handleCheckout}>Mua hàng</button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;