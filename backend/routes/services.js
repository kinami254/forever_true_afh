// backend/routes/services.js

const express = require('express');
const router = express.Router();
const servicesController = require('../controllers/servicesController');
const multer = require('multer');
const path = require('path');

// Set up multer for image uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/services/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Append extension
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: function(req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if(mimetype && extname){
      return cb(null, true);
    } else {
      cb('Error: Images Only!');
    }
  }
});

// @route   GET /api/services
// @desc    Get all services
router.get('/', servicesController.getAllServices);

// @route   POST /api/services
// @desc    Add a new service
router.post('/', upload.single('image'), servicesController.addService);

// @route   PUT /api/services/:id
// @desc    Update a service
router.put('/:id', upload.single('image'), servicesController.updateService);

// @route   DELETE /api/services/:id
// @desc    Delete a service
router.delete('/:id', servicesController.deleteService);

module.exports = router;
