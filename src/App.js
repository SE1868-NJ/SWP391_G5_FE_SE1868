import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Portal from "./router/Portal/Portal.js";

import Order from "./router/Order/Order.js";
import Home from "./router/Home/Home";
import Cart from "./router/Cart/Cart.js";
import SearchProduct from "./router/products/SearchProducts";
import Prepay from "./router/Prepay/Prepay.js";
import Notification from "./router/Notification/Notification.js";
import Login from "./layout/Login/Login.js";
import CustomerRoutes from "./router/Profile/CustomerRoutes";
import OrderandVoucher from "./router/OrderandVoucher/OrderandVoucher";
import Category from "./router/Portal/Category/Category.js";
import React from "react";
import { GlobalProvider } from "./globalContext/GlobalContext";
import { AuthProvider } from "./globalContext/AuthContext.js";

function App() {
  return (
    <AuthProvider>
      <GlobalProvider>
        <Router>
          <Routes>
            <Route path="/OrderCheckOut" element={<Order />} />
            <Route path="/OrderandVoucher" element={<OrderandVoucher />} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/search" element={<SearchProduct />} />
            <Route path="/Order" element={<Order />} />
            <Route path="/Notifications" element={<Notification />} />
            <Route path="/Prepay" element={<Prepay />} />
            <Route path="customers/*" element={<CustomerRoutes />} />
            <Route path="/Category" element={<Category />} />
            <Route path="/Portal" element={<Portal />} />
            <Route path="/category/:category" element={<Category />} />
          </Routes>
        </Router>
      </GlobalProvider>
    </AuthProvider>
  );
}

export default App;
