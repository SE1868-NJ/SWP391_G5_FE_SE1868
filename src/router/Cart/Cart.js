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
  const cusID = 5;
  const address =
    "Bùi Tiến Anh\n(+84)123456789\nThạch Thán, Quốc Oai, TP Hà Nội";
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/order");
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.post('http://localhost:3001/api/Cart/cusID', { cusID: cusID });
        console.log(response.data);
        await setCartItems(response.data)
      } catch (error) {
        console.error("Lỗi khi lấy giỏ hàng:", error);
      }
    };
    fetchCart();
  }, []);

  const updateQuantity = async (cartDetailID, amount) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.cartDetailID === cartDetailID
          ? { ...item, Quantity: Math.max(1, item.Quantity + amount) }
          : item
      )
    );

    try {
      await axios.put('http://localhost:3001/api/Cart/updateQuantity', { cartDetailID, amount });
    } catch (error) {
      console.error(error);
    }
  };

  const removeItem = async (cartDetailID) => {
    try {
      await axios.delete(`http://localhost:3001/api/Cart/deleteItem`, { data: { cartDetailID } });
      setCartItems(prevItems => prevItems.filter(item => item.cartDetailID !== cartDetailID));
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectAll = () => {
    if (selectedAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map(item => item.cartDetailID));
    }
    setSelectedAll(!selectedAll);
  }

  const handleSelectItem = (cartDetailID) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(cartDetailID)
        ? prevSelectedItems.filter(id => id !== cartDetailID)
        : [...prevSelectedItems, cartDetailID]
    );
  };

  const totalPrice = cartItems
    .filter(item => selectedItems.includes(item.cartDetailID))
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
                  onChange={handleSelectAll}/></th>
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
                  <tr key={item.cartDetailID}>
                    <td><input
                      type="checkbox"
                      checked={selectedItems.includes(item.cartDetailID)}
                      onChange={() => handleSelectItem(item.cartDetailID)}
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
                      <button className={styles.quantity_button} onClick={() => updateQuantity(item.cartDetailID, -1)}>
                        -
                      </button>
                      <span className={styles.quantity_value}>{item.Quantity}</span>
                      <button className={styles.quantity_button} onClick={() => updateQuantity(item.cartDetailID, 1)}>
                        +
                      </button>
                    </div>
                    </td>
                    <td className={styles.c4}>
                      {(item.productPrice * item.Quantity).toLocaleString()} VNĐ
                    </td>
                    <td className={styles.c5}>
                      <button className={styles.remove_button} onClick={() => removeItem(item.cartDetailID)}>
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