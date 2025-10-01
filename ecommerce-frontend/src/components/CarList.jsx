import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

function CarList() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/cars")
      .then((response) => {
        setCars(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des voitures:", error);
        setError("Impossible de charger les voitures");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center mt-5">Chargement...</div>;
  }

  if (error) {
    return <div className="alert alert-danger text-center mt-5">{error}</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Nos Voitures Disponibles</h2>
      <div className="d-flex flex-wrap justify-content-center gap-3">
        {cars.map((car) => (
          <ProductCard 
            key={car.id} 
            model={car.model}
            year={car.year}
            km={car.km}
            price={car.price}
            image={car.image}
          />
        ))}
      </div>
    </div>
  );
}

export default CarList;