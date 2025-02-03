import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";
import "./Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Sản phẩm 1", price: 200000, quantity: 1 },
    { id: 2, name: "Sản phẩm 2", price: 150000, quantity: 2 },
  ]);

  const updateQuantity = (id, amount) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
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