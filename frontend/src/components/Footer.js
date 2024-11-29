// src/components/Footer.js

import React from 'react';
import { Container } from 'react-bootstrap';

function Footer() {
  return (
    <footer>
      <Container>
        <p>&copy; {new Date().getFullYear()} Forever True Adult Family Home LLC. All rights reserved.</p>
        <p>
          <a href="https://facebook.com/ForeverTrueAFH" target="_blank" rel="noopener noreferrer">Facebook</a> |{' '}
          <a href="https://instagram.com/ForeverTrueAFH" target="_blank" rel="noopener noreferrer">Instagram</a>
        </p>
      </Container>
    </footer>
  );
}

export default Footer;
