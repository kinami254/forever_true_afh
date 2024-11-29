// src/pages/Services.js

import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { getServices } from '../services/api';
import { Helmet } from 'react-helmet';

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getServices()
      .then(response => {
        setServices(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Container className="services-page fade-in text-center">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="services-page fade-in">
        <Alert variant="danger">
          There was an error loading the services. Please try again later.
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="services-page fade-in">
      <Helmet>
        <title>Our Services | Forever True Adult Family Home LLC</title>
        <meta name="description" content="Discover the range of compassionate services provided by Forever True Adult Family Home LLC, including emotional support, medical management, and 24/7 care in Marysville, WA." />
      </Helmet>

      <Row>
        <Col>
          <h1>Our Services</h1>
          <p>At Forever True Adult Family Home LLC, we provide personalized, compassionate care designed to meet the unique needs of each resident. Our services are tailored to ensure the highest quality of life, with a focus on physical, emotional, and mental well-being.</p>
        </Col>
      </Row>
      <Row>
        {services.map(service => (
          <Col md={4} key={service.id} className="mb-4">
            <Card className="h-100">
              {service.image_path && <Card.Img variant="top" src={service.image_path} alt={service.service_name} />}
              <Card.Body>
                <Card.Title>{service.service_name}</Card.Title>
                <Card.Text>{service.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Services;
