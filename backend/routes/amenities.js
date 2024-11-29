// backend/routes/amenities.js

const express = require('express');
const router = express.Router();
const amenitiesController = require('../controllers/amenitiesController');
const multer = require('multer');
const path = require('path');

// Set up multer for image uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/amenities/');
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

// @route   GET /api/amenities
// @desc    Get all amenities
router.get('/', amenitiesController.getAllAmenities);

// @route   POST /api/amenities
// @desc    Add a new amenity
router.post('/', upload.single('image'), amenitiesController.addAmenity);

// @route   PUT /api/amenities/:id
// @desc    Update an amenity
router.put('/:id', upload.single('image'), amenitiesController.updateAmenity);

// @route   DELETE /api/amenities/:id
// @desc    Delete an amenity
router.delete('/:id', amenitiesController.deleteAmenity);

module.exports = router;
