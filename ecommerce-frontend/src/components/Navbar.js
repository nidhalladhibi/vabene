import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Navbar() {
  // Récupérer l'utilisateur et le token depuis localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const token = localStorage.getItem("token");

  // Fonction de déconnexion
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        {/* Logo / Brand */}
        <Link className="navbar-brand fw-bold" to="/">
          🚗 AUTOVISTA
        </Link>

        {/* Toggler for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Accueil
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cars">
                Voitures
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">
                Produits
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link" to="/cart">
                Panier 🛍️
              </Link>
            </li> */}

            {/* Lien Admin - visible uniquement pour les admins */}
            {user.is_admin && (
              <li className="nav-item">
                <Link className="nav-link bg-warning text-dark px-3 rounded mx-2" to="/admin">
                  ⚙️ Admin
                </Link>
              </li>
            )}

            {/* Afficher Login ou Logout selon l'état */}
            {token ? (
              <li className="nav-item">
                <button 
                  className="nav-link btn btn-link text-white text-decoration-none" 
                  onClick={handleLogout}
                  style={{ cursor: "pointer" }}
                >
                  👋 Déconnexion ({user.name})
                </button>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link btn btn-outline-light btn-sm" to="/login">
                  🔐 Connexion
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;