import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./layout/Header/Header";
import Order from "./router/Order/Order.js";
import Home from "./router/Home/Home";
import Prepay from "./router/Prepay/Prepay.js"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Order" element={<Home/>} />
        <Route path="/Login" element={<Header />} />
        <Route path="/" element={<Order />} />
        <Route path="/Prepay" element={<Prepay />} />
      </Routes>
    </Router>
  );
}

export default App;
