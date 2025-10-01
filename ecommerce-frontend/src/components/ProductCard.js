import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function ProductCard({ model, year, km, price, image }) {
  return (
    <div className="card shadow-lg m-3" style={{ width: "20rem" }}>
      {image && (
        <img
          src={image}
          alt={model}
          className="card-img-top"
          style={{ height: "180px", objectFit: "cover" }}
        />
      )}

      <div className="card-body">
        <h5 className="card-title fw-bold text-center">{model}</h5>
        
        <div className="mt-3">
          <div className="d-flex justify-content-between mb-2">
            <span className="text-muted">📅 Année:</span>
            <span className="fw-semibold">{year}</span>
          </div>
          
          <div className="d-flex justify-content-between mb-2">
            <span className="text-muted">🛣️ Kilométrage:</span>
            <span className="fw-semibold">{km.toLocaleString()} km</span>
          </div>
          
          <div className="d-flex justify-content-between mb-3">
            <span className="text-muted">💰 Prix:</span>
            <span className="fw-bold text-success">{price.toLocaleString()} €</span>
          </div>
        </div>
        
        <button className="btn btn-success w-100">Réserver maintenant</button>
      </div>
    </div>
  );
}

export default ProductCard;