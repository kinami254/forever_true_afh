// src/pages/Careers.js

import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form, Spinner, Alert } from 'react-bootstrap';
import { getCareers, applyForCareer } from '../services/api';
import { Helmet } from 'react-helmet';

function Careers() {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [formData, setFormData] = useState({
    career_id: '',
    name: '',
    email: '',
    phone: '',
    resume: null,
    coverLetter: null,
  });
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');

  useEffect(() => {
    getCareers()
      .then(response => {
        setCareers(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setError(true);
        setLoading(false);
      });
  }, []);

  const handleApplyClick = (career) => {
    setSelectedCareer(career);
    setFormData(prevState => ({ ...prevState, career_id: career.id }));
    setShowModal(true);
    setSubmitError('');
    setSubmitSuccess('');
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedCareer(null);
    setFormData({
      career_id: '',
      name: '',
      email: '',
      phone: '',
      resume: null,
      coverLetter: null,
    });
    setSubmitError('');
    setSubmitSuccess('');
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData(prevState => ({ ...prevState, [name]: files[0] }));
    } else {
      setFormData(prevState => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitSuccess('');

    const data = new FormData();
    data.append('career_id', formData.career_id);
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('phone', formData.phone);
    if (formData.resume) {
      data.append('resume', formData.resume);
    }
    if (formData.coverLetter) {
      data.append('coverLetter', formData.coverLetter);
    }

    applyForCareer(data)
      .then(response => {
        setSubmitSuccess('Application submitted successfully!');
        setFormData({
          career_id: '',
          name: '',
          email: '',
          phone: '',
          resume: null,
          coverLetter: null,
        });
      })
      .catch(error => {
        console.error(error);
        setSubmitError('There was an error submitting your application.');
      });
  };

  if (loading) {
    return (
      <Container className="careers-page fade-in text-center">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="careers-page fade-in">
        <Alert variant="danger">
          There was an error loading the careers. Please try again later.
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="careers-page fade-in">
      <Helmet>
        <title>Careers | Forever True Adult Family Home LLC</title>
        <meta name="description" content="Join the dedicated team at Forever True Adult Family Home LLC. Explore our current job openings and apply to become a part of our compassionate caregiving staff in Marysville, WA." />
      </Helmet>

      <Row>
        <Col>
          <h1>Careers</h1>
          <p>At Forever True Adult Family Home LLC, we are always looking for passionate, skilled individuals to join our team. If you are dedicated to providing excellent care and making a difference in people’s lives, we would love to hear from you!</p>
        </Col>
      </Row>
      <Row>
        {careers.map(career => (
          <Col md={4} key={career.id} className="mb-4">
            <Card className="h-100">
              <Card.Body>
                <Card.Title>{career.job_title}</Card.Title>
                <Card.Text>{career.description}</Card.Text>
                <Button variant="primary" onClick={() => handleApplyClick(career)}>Apply Now</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Application Modal */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Apply for {selectedCareer && selectedCareer.job_title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
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

            <Form.Group controlId="formResume">
              <Form.Label>Resume:</Form.Label>
              <Form.Control type="file" name="resume" accept=".pdf,.doc,.docx" onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="formCoverLetter">
              <Form.Label>Cover Letter:</Form.Label>
              <Form.Control as="textarea" name="coverLetter" rows={3} onChange={handleChange} />
            </Form.Group>

            {submitError && <Alert variant="danger" className="mt-3">{submitError}</Alert>}
            {submitSuccess && <Alert variant="success" className="mt-3">{submitSuccess}</Alert>}

            <Button variant="primary" type="submit" className="mt-3">
              Submit Application
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default Careers;
