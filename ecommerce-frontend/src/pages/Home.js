import React from "react";
import "../App.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <div className="hero">
        <div className="hero-content">
          <div className="badge">🚗 Nouvelle gamme 2025 disponible</div>
          
          <h1 className="hero-title">
            Bienvenue chez <span>AutoVista</span>
          </h1>
          
          <p className="hero-subtitle">
            Votre partenaire automobile de confiance. Découvrez nos voitures neuves et d'occasion 
            soigneusement sélectionnées, avec des offres exclusives et un service haut de gamme.
          </p>
          
          <div className="hero-buttons">
            <Link to="/products" className="btn-primary">
              Voir nos voitures
            </Link>
            <button className="btn-secondary">Prendre rendez-vous</button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features">
        <div className="feature">
          <div className="icon green">🏎️</div>
          <h3>Large choix</h3>
          <p>
            Des citadines aux SUV, trouvez la voiture qui correspond parfaitement à votre style de vie.
          </p>
        </div>
        <div className="feature">
          <div className="icon blue">🛠️</div>
          <h3>Service complet</h3>
          <p>
            Entretien, garantie et financement – AutoVista vous accompagne à chaque étape.
          </p>
        </div>
        <div className="feature">
          <div className="icon purple">💰</div>
          <h3>Prix compétitifs</h3>
          <p>
            Des offres imbattables sur les véhicules neufs et d'occasion, avec des facilités de paiement.
          </p>
        </div>
      </div>



      {/* CTA Section */}
      <div className="cta">
        <h2>
          Prêt à prendre la route avec <span>AutoVista ? 🚀</span>
        </h2>
        <p>
          Contactez-nous dès aujourd'hui et trouvez la voiture de vos rêves au meilleur prix.
        </p>
        <div className="cta-buttons">
          <Link to="/products" className="btn-cta primary">
            🚗 Voir le catalogue
          </Link>
          <button className="btn-cta secondary">
            📞 Nous contacter
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;