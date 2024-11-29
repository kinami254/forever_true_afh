// src/pages/Amenities.js

import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { getAmenities } from '../services/api';
import { Helmet } from 'react-helmet';

function Amenities() {
  const [amenities, setAmenities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getAmenities()
      .then(response => {
        setAmenities(response.data);
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
      <Container className="amenities-page fade-in text-center">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="amenities-page fade-in">
        <Alert variant="danger">
          There was an error loading the amenities. Please try again later.
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="amenities-page fade-in">
      <Helmet>
        <title>Amenities | Forever True Adult Family Home LLC</title>
        <meta name="description" content="Explore the comfortable living spaces and therapeutic amenities offered by Forever True Adult Family Home LLC, enhancing the quality of life for our residents in Marysville, WA." />
      </Helmet>

      <Row>
        <Col>
          <h1>Amenities</h1>
          <p>At Forever True Adult Family Home LLC, we believe that a comfortable, inviting environment is an essential part of our care services. Our facility is designed with the needs of our residents in mind, offering a range of amenities to enhance their quality of life.</p>
        </Col>
      </Row>
      <Row>
        {amenities.map(amenity => (
          <Col md={4} key={amenity.id} className="mb-4">
            <Card className="h-100">
              {amenity.image_path && <Card.Img variant="top" src={amenity.image_path} alt={amenity.amenity_name} />}
              <Card.Body>
                <Card.Title>{amenity.amenity_name}</Card.Title>
                <Card.Text>{amenity.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Amenities;
