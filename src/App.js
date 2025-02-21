import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Portal from "./router/Portal/Portal.js";
import Order from "./router/Order/Order.js";
import Home from "./router/Home/Home";
import Cart from "./router/Cart/Cart.js";
import SearchProduct from "./router/products/SearchProducts";
import Prepay from "./router/Prepay/Prepay.js";
import OrderandVoucher from './router/OrderandVoucher/OrderandVoucher.js';
import Login from "./layout/Login/Login.js";
import CustomerRoutes from "./router/Profile/CustomerRoutes";
import Category from "./router/Portal/Category/Category.js";
import React, { useContext } from "react";
import { GlobalProvider } from "./globalContext/GlobalContext";
import { AuthProvider } from "./globalContext/AuthContext.js";
import { ThemeProvider, ThemeContext } from "./contexts/ThemeContext.js";
import DarkModeButton from "./components/DarkModeButton";

function AppContent() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
    }`}>
      <header className="p-4 flex justify-between items-center">
        <DarkModeButton />
      </header>

      <Routes>
        <Route path="/OrderCheckOut" element={<Order />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/search" element={<SearchProduct />} />
        <Route path="/Order" element={<Order />} />
        <Route path="/Prepay" element={<Prepay />} />
        <Route path="customers/*" element={<CustomerRoutes />} />
        <Route path="/Category" element={<Category />} />
        <Route path="/Portal" element={<Portal />} />
        <Route path="/category/:category" element={<Category />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <GlobalProvider>
        <AuthProvider>
            <Router>
              <AppContent />
            </Router>
        </AuthProvider>
      </GlobalProvider>
    </ThemeProvider>
  );
}

export default App;
