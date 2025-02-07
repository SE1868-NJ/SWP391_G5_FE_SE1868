import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./layout/Header/Header";
import Order from "./router/Order/Order.js";
import Home from "./router/Home/Home";
import Prepay from "./router/Prepay/Prepay.js"
import StatusOrder from './router/StatusOrder/StatusOrrder.js'
import { createContext } from "react";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/Order" element={<Order/>} />
        <Route path="/" element={<Home />} />
        <Route path="/StatusOrder" element={<StatusOrder />} />
        <Route path="/Prepay" element={<Prepay />} />
      </Routes>
    </Router>
  );
}

export default App;
