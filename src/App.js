import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./layout/Header/Header";
import Portal from "./router/Home/Portal/Portal";

import Home from "./router/Home/Home";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Header />} />
        <Route path="/Portal" element={<Portal />} />

      </Routes>
    </Router>
  );
}

export default App;
