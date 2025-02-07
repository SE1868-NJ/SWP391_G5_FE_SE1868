import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";
import "./Cart.module.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/cart/`, {
        credentials: "include",
      });
      const data = await response.json();
      setCartItems(data);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateQuantity = (id, amount) => {
    const updatedItems = cartItems.find((item) => item.id === id);
    if (!updatedItems) return;

    const newQuantity = Math.max(1, updatedItems.quantity + amount);

    try {
      fetch(`http://localhost:3001/cart/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: newQuantity }),
      });

      if (response.ok) {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.id === id ? { ...item, quantity: newQuantity } : item
          )
        );
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const removeItem = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/cart/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setCartItems(cartItems.filter(item => item.id !== id));
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div>
      <Header />
      <div className="cart-container">
        <h2 className="cart-header">Giỏ hàng</h2>
        <div className="cart-content">
          {cartItems.length === 0 ? (
            <p className="empty-cart">Giỏ hàng đang trống</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-details">
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-price">{item.price.toLocaleString()} VNĐ</p>
                </div>
                <div className="quantity-control">
                  <button className="quantity-button" onClick={() => updateQuantity(item.id, -1)}>
                    -
                  </button>
                  <span className="quantity-value">{item.quantity}</span>
                  <button className="quantity-button" onClick={() => updateQuantity(item.id, 1)}>
                    +
                  </button>
                </div>
                <button className="remove-button" onClick={() => removeItem(item.id)}>
                  Xóa
                </button>
              </div>
            ))
          )}
          {cartItems.length > 0 && (
            <div className="total">
              <h3>Tổng: {totalPrice.toLocaleString()} VNĐ</h3>
              <button className="checkout-button">Thanh toán</button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;