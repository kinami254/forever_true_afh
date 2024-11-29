// src/components/Navbar.js

import React from 'react'; // Ensure this is declared only once
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


const NavbarComponent = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Forever True AFH</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/about-us">
              <Nav.Link>About Us</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/services">
              <Nav.Link>Services</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/amenities">
              <Nav.Link>Amenities</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/careers">
              <Nav.Link>Careers</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/testimonials">
              <Nav.Link>Testimonials</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/contact-us">
              <Nav.Link>Contact Us</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
