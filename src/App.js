import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./layout/Header/Header";

import Home from "./router/Home/Home";
import  SearchProduct  from "./router/products/SearchProducts";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Header />} />
        <Route path="/search" element={<SearchProduct />} />

      </Routes>
    </Router>
  );
}

export default App;
