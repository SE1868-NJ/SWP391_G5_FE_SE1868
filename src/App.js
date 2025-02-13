import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Portal from "./router/Portal/Portal.js";

import Order from "./router/Order/Order.js";
import Home from "./router/Home/Home";
import Cart from "./router/Cart/Cart.js";
import SearchProduct from "./router/products/SearchProducts";
import Prepay from "./router/Prepay/Prepay.js"
import OrderandVoucher from './router/OrderandVoucher/OrderandVoucher.js'
import Header from "./layout/Header/Header.js";
import CustomerRoutes from "./router/Profile/CustomerRoutes";
import Category from "./router/Portal/Category/Category.js";
import React from "react";
import { GlobalProvider } from "./globalContext/GlobalContext";



function App() {

  return (
<<<<<<< HEAD
    <Router>
      <Routes>
        <Route path="/OrderCheckOut" element={<Order/>} />
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Header />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Header />} />
        <Route path="/search" element={<SearchProduct />} />
        <Route path="/Order" element={<Order/>} />
        <Route path="/" element={<Home />} />
        <Route path="/OrderandVoucher" element={<OrderandVoucher />} />
        <Route path="/Prepay" element={<Prepay />} />
      </Routes>
    </Router>
=======
    <GlobalProvider>
      <Router>
        <Routes>
          <Route path="/OrderCheckOut" element={<Order />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Header />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={<SearchProduct />} />
          <Route path="/Order" element={<Order />} />
          <Route path="/ViewOrder" element={<ViewOrder />} />
          <Route path="/Prepay" element={<Prepay />} />
          <Route path="customers/*" element={<CustomerRoutes />} />
          <Route path="/Category" element={<Category />} />
          <Route path="/Portal" element={<Portal />} />
          <Route path="/category/:category" element={<Category />} />

        </Routes>
      </Router>
    </GlobalProvider>
>>>>>>> 020c16c97ac5dbbd9b92ae6899c783fa6e1e3d6a
  );
}

export default App;
