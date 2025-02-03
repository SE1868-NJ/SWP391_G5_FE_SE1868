import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";

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
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold text-center mb-4">Giỏ hàng</h2>
        <div className="bg-white shadow-lg rounded-lg p-4">
          {cartItems.length === 0 ? (
            <p className="text-center">Giỏ hàng trống</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex items-center border-b py-4">
                <div className="ml-4 flex-grow">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-500">{item.price.toLocaleString()} VNĐ</p>
                </div>
                <div className="flex items-center">
                  <button
                    className="px-2 py-1 bg-gray-200 rounded"
                    onClick={() => updateQuantity(item.id, -1)}
                  >
                    -
                  </button>
                  <span className="px-4">{item.quantity}</span>
                  <button
                    className="px-2 py-1 bg-gray-200 rounded"
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="ml-4 px-2 py-1 bg-red-500 text-white rounded"
                  onClick={() => removeItem(item.id)}
                >
                  Xóa
                </button>
              </div>
            ))
          )}
          {cartItems.length > 0 && (
            <div className="text-right mt-4">
              <h3 className="text-xl font-semibold">Tổng: {totalPrice.toLocaleString()} VNĐ</h3>
              <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Thanh toán</button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;