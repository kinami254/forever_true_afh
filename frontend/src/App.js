// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavbarComponent from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Services from './pages/Services';
import Amenities from './pages/Amenities';
import Careers from './pages/Careers';
import Testimonials from './pages/Testimonials';
import ContactUs from './pages/ContactUs';

function App() {
  return (
    <Router>
      <NavbarComponent />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/amenities" element={<Amenities />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contact-us" element={<ContactUs />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
