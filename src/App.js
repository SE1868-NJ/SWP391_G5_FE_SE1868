import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Portal from "./router/Portal/Portal.js";
import Order from "./router/Order/Order.js";
import Home from "./router/Home/Home";
import Cart from "./router/Cart/Cart.js";
import Shop from "./router/Shop/Shop.js";
import SearchProduct from "./router/products/SearchProducts";

import OrderandVoucher from "./router/OrderandVoucher/OrderandVoucher.js";
import Notification from "./router/Notification/Notification.js";
import Login from "./layout/Login/Login.js";
import CustomerRoutes from "./router/Profile/CustomerRoutes";
import Category from "./router/Portal/Category/Category.js";
import React, { useContext } from "react";
import { GlobalProvider } from "./globalContext/GlobalContext";
import { AuthProvider } from "./globalContext/AuthContext.js";
import { ThemeProvider, ThemeContext } from "./contexts/ThemeContext.js";
import MenuHeaderProvider from "./globalContext/MenuHeaderContext.js";
import DarkModeButton from "./components/DarkModeButton";
import FavoriteProduct from "./router/products/FavoriteProducts.jsx";
import { PageProductDetail } from "./components/products/ProductDetail.jsx";
import SearchResults from "./router/Portal/SearchResults/SearchResults.js";
import SupportRequest from "./router/Portal/SupportForm/SupportRequest/SupportRequest.js";
import SupportHistory from "./router/Portal/SupportForm/SupportHistory/SupportHistory.js";

function AppContent() {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}
    >
      <header className="p-4 flex justify-between items-center">
        <DarkModeButton />
      </header>

      <Routes>
        <Route path="/OrderCheckOut" element={<Order />} />
        <Route path="/OrderandVoucher" element={<OrderandVoucher />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/search" element={<SearchProduct />} />
        <Route path="/my-favorite" element={<FavoriteProduct />} />
        <Route path="/product/:id" element={<PageProductDetail />} />
        <Route path="/Order" element={<Order />} />
        <Route path="/Notifications" element={<Notification />} />

        <Route path="customers/*" element={<CustomerRoutes />} />
        <Route path="
        " element={<Category />} />
        <Route path="/Portal" element={<Portal />} />
        <Route path="/category/:category" element={<Category />} />
        <Route path="/searchPortal" element={<SearchResults />} />
        <Route path="/category/:category/:itemId" element={<Category />} />
        <Route path="/support/request" element={<SupportRequest />} />
        <Route path="/support/history" element={<SupportHistory />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <GlobalProvider>
      <AuthProvider>
        <MenuHeaderProvider>
          <ThemeProvider>
            <Router>
              <AppContent />
            </Router>
          </ThemeProvider>
        </MenuHeaderProvider>
      </AuthProvider>
    </GlobalProvider>
  );
}

export default App;
