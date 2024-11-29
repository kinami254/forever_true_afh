// src/pages/ContactUs.js

import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { submitInquiry } from '../services/api';
import { Helmet } from 'react-helmet';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitError('');
    setSubmitSuccess('');

    submitInquiry(formData)
      .then(response => {
        setSubmitSuccess('Thank you for your inquiry. We will get back to you soon.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
        });
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setSubmitError('There was an error submitting your inquiry.');
        setLoading(false);
      });
  };

  return (
    <Container className="contact-us fade-in">
      <Helmet>
        <title>Contact Us | Forever True Adult Family Home LLC</title>
        <meta name="description" content="Get in touch with Forever True Adult Family Home LLC in Marysville, WA. Submit your inquiries or schedule a visit to our facility through our contact form." />
      </Helmet>

      <Row>
        <Col>
          <h1>Contact Us</h1>
          <p>We welcome your inquiries! If you have any questions or would like to schedule a visit to see our facility, please don’t hesitate to reach out. You can contact us via the details below or by filling out the form on this page.</p>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <h2>Our Location:</h2>
          <p>Forever True Adult Family Home LLC<br />
             7510 86th Dr NE<br />
             Marysville, WA 98270</p>

          <h2>Phone:</h2>
          <p>Call us at: <a href="tel:+14252444040">+1 (425) 244-4040</a></p>

          <h2>Email:</h2>
          <p><a href="mailto:info@trueadultfamilyhome.com">info@trueadultfamilyhome.com</a></p>

          <h2>Social Media:</h2>
          <p>
            <a href="https://facebook.com/ForeverTrueAFH" target="_blank" rel="noopener noreferrer">Facebook</a> |{' '}
            <a href="https://instagram.com/ForeverTrueAFH" target="_blank" rel="noopener noreferrer">Instagram</a>
          </p>
        </Col>
        <Col md={6}>
          <h2>Request a Consultation:</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name:</Form.Label>
              <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email Address:</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
            </Form.Group>

            <Form.Group controlId="formPhone">
              <Form.Label>Phone Number:</Form.Label>
              <Form.Control type="tel" name="phone" value={formData.phone} onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="formMessage">
              <Form.Label>Message:</Form.Label>
              <Form.Control as="textarea" name="message" rows={5} value={formData.message} onChange={handleChange} required />
            </Form.Group>

            {submitError && <Alert variant="danger" className="mt-3">{submitError}</Alert>}
            {submitSuccess && <Alert variant="success" className="mt-3">{submitSuccess}</Alert>}

            <Button variant="primary" type="submit" className="mt-3" disabled={loading}>
              {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Submit'}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default ContactUs;
