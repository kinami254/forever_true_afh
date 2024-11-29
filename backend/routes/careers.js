// backend/routes/careers.js

const express = require('express');
const router = express.Router();
const careersController = require('../controllers/careersController');
const multer = require('multer');
const path = require('path');

// Set up multer for resume and cover letter uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    if (file.fieldname === 'resume') {
      cb(null, 'uploads/resumes/');
    } else if (file.fieldname === 'coverLetter') {
      cb(null, 'uploads/coverLetters/');
    }
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Append extension
  }
});

const fileFilter = function(req, file, cb) {
  if(file.fieldname === 'resume' || file.fieldname === 'coverLetter') {
    // Accept PDF and DOC/DOCX files
    const filetypes = /pdf|doc|docx/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if(mimetype && extname){
      return cb(null, true);
    } else {
      cb('Error: Documents Only!');
    }
  }
};

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: fileFilter
});

// @route   GET /api/careers
// @desc    Get all careers
router.get('/', careersController.getAllCareers);

// @route   POST /api/careers
// @desc    Add a new career
router.post('/', careersController.addCareer);

// @route   PUT /api/careers/:id
// @desc    Update a career
router.put('/:id', careersController.updateCareer);

// @route   DELETE /api/careers/:id
// @desc    Delete a career
router.delete('/:id', careersController.deleteCareer);

// @route   POST /api/careers/apply
// @desc    Apply for a career
router.post('/apply', upload.fields([{ name: 'resume', maxCount: 1 }, { name: 'coverLetter', maxCount: 1 }]), careersController.applyForCareer);

module.exports = router;
