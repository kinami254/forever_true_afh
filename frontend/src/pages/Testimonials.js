// src/pages/Testimonials.js

import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Carousel, Spinner, Alert } from 'react-bootstrap';
import { getTestimonials } from '../services/api';
import { Helmet } from 'react-helmet';

function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getTestimonials()
      .then(response => {
        setTestimonials(response.data);
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
      <Container className="testimonials-page fade-in text-center">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="testimonials-page fade-in">
        <Alert variant="danger">
          There was an error loading the testimonials. Please try again later.
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="testimonials-page fade-in">
      <Helmet>
        <title>Testimonials | Forever True Adult Family Home LLC</title>
        <meta name="description" content="Read testimonials from residents and their families about the compassionate and professional care provided by Forever True Adult Family Home LLC in Marysville, WA." />
      </Helmet>

      <Row>
        <Col>
          <h1>Testimonials</h1>
          <p>At Forever True Adult Family Home LLC, the satisfaction of our residents and their families is our top priority. Below are just a few of the positive experiences shared by those who trust us with their care.</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <Carousel>
            {testimonials.map(testimonial => (
              <Carousel.Item key={testimonial.id}>
                <p className="testimonial-text">"{testimonial.testimonial_text}"</p>
                <p className="testimonial-author">– {testimonial.resident_name || testimonial.relationship}</p>
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>
    </Container>
  );
}

export default Testimonials;
