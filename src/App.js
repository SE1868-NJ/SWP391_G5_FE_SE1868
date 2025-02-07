import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Order from "./router/Order/Order.js";
import Home from "./router/Home/Home";
import Prepay from "./router/Prepay/Prepay.js"
import ViewOrder from './router/ViewOrder/ViewOrrder.js'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/Order" element={<Order/>} />
        <Route path="/" element={<Home />} />
        <Route path="/ViewOrder" element={<ViewOrder />} />
        <Route path="/Prepay" element={<Prepay />} />
      </Routes>
    </Router>
  );
}

export default App;
