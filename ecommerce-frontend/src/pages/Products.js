import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Nos Produits</h1>
      <Row>
        {products.map((p) => (
          <Col key={p.id} md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{p.name}</Card.Title>
                <Card.Text>
                  Prix: <strong>{p.price} TND</strong>
                </Card.Text>
                <Button variant="primary">Ajouter au panier</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Products;
