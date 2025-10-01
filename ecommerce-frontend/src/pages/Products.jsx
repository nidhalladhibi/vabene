import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Form, Alert, Spinner } from "react-bootstrap";

function Cars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    model: "",
    year: "",
    km: ""
  });

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get("http://127.0.0.1:8000/api/cars");
        setCars(response.data);
      } catch (err) {
        console.error("Erreur lors du chargement des voitures:", err);
        setError("Impossible de charger les voitures. Veuillez réessayer plus tard.");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const filteredCars = cars.filter((car) => {
    const modelMatch = filters.model === "" || 
      car.model.toLowerCase().includes(filters.model.toLowerCase());
    
    const yearMatch = filters.year === "" || 
      car.year.toString() === filters.year;
    
    const kmMatch = filters.km === "" || 
      isNaN(parseInt(filters.km)) || 
      car.km <= parseInt(filters.km);

    return modelMatch && yearMatch && kmMatch;
  });

  const resetFilters = () => {
    setFilters({
      model: "",
      year: "",
      km: ""
    });
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value
    }));
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-TN', {
      style: 'currency',
      currency: 'TND',
      minimumFractionDigits: 0
    }).format(price);
  };

  const formatKilometers = (km) => {
    return new Intl.NumberFormat('fr-FR').format(km);
  };

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Chargement des voitures...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">
          <Alert.Heading>Erreur</Alert.Heading>
          <p>{error}</p>
          <Button 
            variant="outline-danger" 
            onClick={() => window.location.reload()}
          >
            Réessayer
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">🚗 Catalogue AUTOVISTA</h1>

      <Card className="mb-4">
        <Card.Header>
          <h5 className="mb-0">Filtres de recherche</h5>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Modèle</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ex: BMW, Mercedes..."
                  value={filters.model}
                  onChange={(e) => handleFilterChange("model", e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Année</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Ex: 2020"
                  min="1990"
                  max={new Date().getFullYear()}
                  value={filters.year}
                  onChange={(e) => handleFilterChange("year", e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Kilométrage maximum</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Ex: 100000"
                  min="0"
                  value={filters.km}
                  onChange={(e) => handleFilterChange("km", e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={3} className="d-flex align-items-end">
              <Button 
                variant="outline-secondary" 
                onClick={resetFilters}
                className="mb-3 w-100"
              >
                Réinitialiser
              </Button>
            </Col>
          </Row>
          
          <div className="text-muted">
            {filteredCars.length} voiture{filteredCars.length !== 1 ? 's' : ''} trouvée{filteredCars.length !== 1 ? 's' : ''}
          </div>
        </Card.Body>
      </Card>

      {filteredCars.length === 0 ? (
        <Alert variant="info" className="text-center">
          <h5>Aucune voiture trouvée</h5>
          <p>Essayez de modifier vos critères de recherche.</p>
        </Alert>
      ) : (
        <Row>
          {filteredCars.map((car) => (
            <Col key={car.id} lg={4} md={6} sm={12} className="mb-4">
              <Card className="shadow-sm h-100 car-card">
                <div className="position-relative">
                  <Card.Img
                    variant="top"
                    src={car.image || "/api/placeholder/400/200"}
                    alt={`${car.model} - ${car.year}`}
                    style={{ 
                      height: "200px", 
                      objectFit: "cover",
                      transition: "transform 0.3s ease"
                    }}
                    onError={(e) => {
                      e.target.src = "/api/placeholder/400/200";
                      e.target.alt = "Image non disponible";
                    }}
                  />
                  {car.km < 50000 && (
                    <span className="badge bg-success position-absolute top-0 end-0 m-2">
                      Faible kilométrage
                    </span>
                  )}
                </div>
                
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="h5 text-primary">
                    {car.model}
                  </Card.Title>
                  
                  {/* ✅ CORRECTION ICI : Remplacé Card.Text par div */}
                  <div className="flex-grow-1">
                    <div className="mb-2">
                      <i className="fas fa-calendar-alt me-2 text-muted"></i>
                      <strong>Année:</strong> {car.year}
                    </div>
                    <div className="mb-2">
                      <i className="fas fa-road me-2 text-muted"></i>
                      <strong>Kilométrage:</strong> {formatKilometers(car.km)} km
                    </div>
                    <div className="mb-3">
                      <i className="fas fa-tag me-2 text-muted"></i>
                      <strong>Prix:</strong> 
                      <span className="text-success fw-bold fs-5 ms-1">
                        {formatPrice(car.price)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="d-grid gap-2">
                    <Button 
                      variant="primary" 
                      onClick={() => {
                        console.log("Voir détails de la voiture:", car.id);
                      }}
                    >
                      <i className="fas fa-eye me-2"></i>
                      Voir détails
                    </Button>
                    <Button 
                      variant="outline-success" 
                      size="sm"
                      onClick={() => {
                        console.log("Contacter pour la voiture:", car.id);
                      }}
                    >
                      <i className="fas fa-phone me-2"></i>
                      Contacter
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default Cars;