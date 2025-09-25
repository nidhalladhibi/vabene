import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function ProductCard({ name, price }) {
  return (
    <div className="card shadow-sm m-3" style={{ width: "18rem" }}>
      <div className="card-body text-center">
        <h5 className="card-title fw-bold">{name}</h5>
        <p className="card-text text-muted">💲 Prix : {price} TND</p>
        <button className="btn btn-primary">Ajouter au panier</button>
      </div>
    </div>
  );
}

export default ProductCard;
