// backend/routes/inquiries.js

const express = require('express');
const router = express.Router();
const inquiriesController = require('../controllers/inquiriesController');

// @route   POST /api/inquiries
// @desc    Submit an inquiry
router.post('/', inquiriesController.submitInquiry);

module.exports = router;
