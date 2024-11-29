// src/pages/AboutUs.js

import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { getTestimonials } from '../services/api';
import { Helmet } from 'react-helmet';

function AboutUs() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    getTestimonials()
      .then(response => setTestimonials(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <Container className="about-us fade-in">
      <Helmet>
        <title>About Us | Forever True Adult Family Home LLC</title>
        <meta name="description" content="Learn more about Forever True Adult Family Home LLC, our mission, values, and commitment to providing compassionate senior care in Marysville, WA." />
      </Helmet>

      <Row>
        <Col>
          <h1>Welcome to Forever True Adult Family Home LLC</h1>
          <p>Located in Marysville, Washington, Forever True Adult Family Home LLC is a trusted residential care facility dedicated to providing compassionate and professional care for seniors in a homelike environment. Our mission is to improve the quality of life for our residents by offering personalized care that caters to their physical, emotional, and social well-being.</p>
          
          <h2>Our Story</h2>
          <p>Founded with a passion for caregiving, Forever True Adult Family Home LLC is rooted in a deep commitment to serving those in need of specialized care. Our family-oriented approach ensures that each resident receives the attention and care they deserve, promoting independence, dignity, and comfort.</p>
          
          <h2>Our Values</h2>
          <ul>
            <li><strong>Compassion:</strong> We treat all our residents with empathy and kindness, ensuring they feel valued and understood.</li>
            <li><strong>Integrity:</strong> We maintain transparency in all our operations, ensuring trust with families and residents.</li>
            <li><strong>Respect:</strong> We honor the uniqueness of each individual, providing care tailored to their needs.</li>
            <li><strong>Excellence:</strong> We strive for excellence in everything we do, from care delivery to family communication and beyond.</li>
          </ul>
          
          <h2>Our Commitment</h2>
          <p>At Forever True Adult Family Home LLC, we are committed to providing a safe and comfortable environment for all our residents. We work closely with families, healthcare providers, and caregivers to ensure that each person’s needs are met with the highest standard of care.</p>
          
          <h2>Meet Our Team</h2>
          <div className="team-members">
            {/* Example Team Member */}
            <div className="team-member">
              <img src="/assets/images/team1.jpg" alt="Jane Doe" />
              <h3>Jane Doe</h3>
              <p>Certified Caregiver</p>
            </div>
            {/* Add more team members similarly */}
          </div>
          
          <h2>Accreditations & Certifications</h2>
          <p>We hold various certifications and are affiliated with local healthcare bodies to ensure the highest quality of care.</p>
        </Col>
      </Row>
    </Container>
  );
}

export default AboutUs;
