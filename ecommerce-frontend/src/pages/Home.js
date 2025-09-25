import React from "react";
import "../App.css";

function Home() {
  return (
    <div className="home">

      {/* Hero Section */}
      <div className="hero">
        <div className="hero-content">
          <div className="badge">Nouveau - Collection 2025 disponible maintenant</div>
          
          <h1 className="hero-title">
            Bienvenue dans notre <span>boutique 🚀</span>
          </h1>
          
          <p className="hero-subtitle">
            Les meilleurs produits aux meilleurs prix. Découvrez notre sélection exclusive 
            de produits de qualité supérieure.
          </p>
          
          <div className="hero-buttons">
            <button className="btn-primary">Voir nos produits</button>
            <button className="btn-secondary">En savoir plus</button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features">
        <div className="feature">
          <div className="icon green">✨</div>
          <h3>Qualité Premium</h3>
          <p>Chaque produit est méticuleusement sélectionné pour offrir une expérience exceptionnelle.</p>
        </div>
        <div className="feature">
          <div className="icon blue">⚡</div>
          <h3>Livraison Express</h3>
          <p>Recevez vos commandes en un temps record avec notre service de livraison ultra-rapide.</p>
        </div>
        <div className="feature">
          <div className="icon purple">🎯</div>
          <h3>Prix Imbattables</h3>
          <p>Bénéficiez des meilleurs tarifs du marché sans compromis sur la qualité.</p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta">
        <h2>
          Prêt pour une expérience <span>extraordinaire ? 🌟</span>
        </h2>
        <p>
          Rejoignez notre communauté de clients passionnés et découvrez pourquoi 
          ils nous font confiance.
        </p>
        <button className="btn-cta">🚀 Commencer l'aventure</button>
      </div>

    </div>
  );
}

export default Home;
