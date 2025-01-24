import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./layout/Header/Header";
import Order from "./router/Order/Order.js";
import Home from "./router/Home/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Order" element={<Home/>} />
        <Route path="/login" element={<Header />} />
        <Route path="/" element={<Order />} />
      </Routes>
    </Router>
  );
}

export default App;
