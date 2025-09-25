import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Route الرئيسية "/" */}
        <Route path="/" element={<Home />} />

        {/* صفحة المنتجات */}
        <Route path="/products" element={<Products />} />

        {/* صفحة البانير */}
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;
