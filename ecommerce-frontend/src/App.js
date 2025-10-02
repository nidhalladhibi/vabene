import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import CarList from "./components/CarList";
import Login from "./components/Login";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminCars from "./pages/AdminCars.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/cars" element={<CarList />} /> {/* ✅ تبسيط */}
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} /> {/* ✅ */}
          {/* Ajoutez d'autres routes ici */}
          <Route path="/admin/cars" element={<AdminCars />} /> {/* ✅ */}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
