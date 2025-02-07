import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Order from "./router/Order/Order.js";
import Home from "./router/Home/Home";
import Cart from "./router/Cart/Cart";
import  SearchProduct  from "./router/products/SearchProducts";
import Prepay from "./router/Prepay/Prepay.js"
import ViewOrder from './router/ViewOrder/ViewOrrder.js'


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Header />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Header />} />
        <Route path="/search" element={<SearchProduct />} />

        <Route path="/Order" element={<Order/>} />
        <Route path="/" element={<Home />} />
        <Route path="/ViewOrder" element={<ViewOrder />} />
        <Route path="/Prepay" element={<Prepay />} />
      </Routes>
    </Router>
  );
}

export default App;
