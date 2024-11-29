// src/services/api.js

import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Adjust the port if necessary

// Services API
export const getServices = () => axios.get(`${API_BASE_URL}/services`);
export const addService = (data) => axios.post(`${API_BASE_URL}/services`, data, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const updateService = (id, data) => axios.put(`${API_BASE_URL}/services/${id}`, data, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const deleteService = (id) => axios.delete(`${API_BASE_URL}/services/${id}`);

// Amenities API
export const getAmenities = () => axios.get(`${API_BASE_URL}/amenities`);
export const addAmenity = (data) => axios.post(`${API_BASE_URL}/amenities`, data, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const updateAmenity = (id, data) => axios.put(`${API_BASE_URL}/amenities/${id}`, data, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const deleteAmenity = (id) => axios.delete(`${API_BASE_URL}/amenities/${id}`);

// Careers API
export const getCareers = () => axios.get(`${API_BASE_URL}/careers`);
export const addCareer = (data) => axios.post(`${API_BASE_URL}/careers`, data);
export const updateCareer = (id, data) => axios.put(`${API_BASE_URL}/careers/${id}`, data);
export const deleteCareer = (id) => axios.delete(`${API_BASE_URL}/careers/${id}`);
export const applyForCareer = (data) => axios.post(`${API_BASE_URL}/careers/apply`, data, {
  headers: { 'Content-Type': 'multipart/form-data' }
});

// Testimonials API
export const getTestimonials = () => axios.get(`${API_BASE_URL}/testimonials`);
export const addTestimonial = (data) => axios.post(`${API_BASE_URL}/testimonials`, data);
export const updateTestimonial = (id, data) => axios.put(`${API_BASE_URL}/testimonials/${id}`, data);
export const deleteTestimonial = (id) => axios.delete(`${API_BASE_URL}/testimonials/${id}`);

// Contact Us API
export const submitInquiry = (data) => axios.post(`${API_BASE_URL}/inquiries`, data);
