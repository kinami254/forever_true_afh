// backend/routes/testimonials.js

const express = require('express');
const router = express.Router();
const testimonialsController = require('../controllers/testimonialsController');

// @route   GET /api/testimonials
// @desc    Get all testimonials
router.get('/', testimonialsController.getAllTestimonials);

// @route   POST /api/testimonials
// @desc    Add a new testimonial
router.post('/', testimonialsController.addTestimonial);

// @route   PUT /api/testimonials/:id
// @desc    Update a testimonial
router.put('/:id', testimonialsController.updateTestimonial);

// @route   DELETE /api/testimonials/:id
// @desc    Delete a testimonial
router.delete('/:id', testimonialsController.deleteTestimonial);

module.exports = router;
