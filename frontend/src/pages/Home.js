import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import heroImage from '../assets/images/hero.jpg'; // Ensure the image exists

function Home() {
  return (
    <div>
      {/* Page Metadata */}
      <Helmet>
        <title>Forever True Adult Family Home LLC | Compassionate Senior Care in Marysville</title>
        <meta
          name="description"
          content="Forever True Adult Family Home LLC provides compassionate, personalized senior care in Marysville, WA. Learn about our services, amenities, and join our dedicated team."
        />
      </Helmet>

      {/* Hero Section */}
      <div className="hero">
        <img src={heroImage} alt="Happy residents at Forever True" className="hero-image" />
        <div className="hero-content">
          <h1>Where Compassion Meets Care</h1>
          <a href="/contact-us" className="button-primary">
            Request More Information
          </a>
        </div>
      </div>

      {/* Introduction */}
      <Container className="introduction mt-5">
        <Row>
          <Col>
            <p>
              Welcome to Forever True Adult Family Home LLC, where we provide compassionate care to enhance the quality of
              life for our residents.
            </p>
          </Col>
        </Row>
      </Container>

      {/* Mission Statement */}
      <Container className="mission mt-4">
        <Row>
          <Col>
            <h2>Our Mission</h2>
            <p>To provide loving, personalized care that respects the dignity and individuality of each resident.</p>
          </Col>
        </Row>
      </Container>

      {/* Quick Navigation */}
      <Container className="quick-nav mt-4 d-flex justify-content-around">
        <a href="/services" className="quick-link">
          Our Services
        </a>
        <a href="/testimonials" className="quick-link">
          Testimonials
        </a>
        <a href="/contact-us" className="quick-link">
          Contact Us
        </a>
        <a href="/about-us" className="quick-link">
          About Us
        </a>
      </Container>

      {/* Trust Symbols */}
      <Container className="trust-symbols mt-5 text-center">
        <Row>
          <Col>
            <img src="/assets/images/certification1.png" alt="Certification 1" className="trust-symbol" />
            <img src="/assets/images/certification2.png" alt="Certification 2" className="trust-symbol" />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <div className="testimonial-rotation">
              <p>"The care my mother receives here is exceptional." – Sarah W.</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
