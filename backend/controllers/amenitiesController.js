// backend/controllers/amenitiesController.js

const db = require('../config/database');

// Get all amenities
exports.getAllAmenities = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM amenities');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Add a new amenity
exports.addAmenity = async (req, res) => {
  const { amenity_name, description } = req.body;
  let image_path = '';

  if (req.file) {
    image_path = `/uploads/amenities/${req.file.filename}`;
  }

  try {
    const [result] = await db.query(
      'INSERT INTO amenities (amenity_name, description, image_path) VALUES (?, ?, ?)',
      [amenity_name, description, image_path]
    );
    res.status(201).json({ id: result.insertId, amenity_name, description, image_path });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Update an amenity
exports.updateAmenity = async (req, res) => {
  const { id } = req.params;
  const { amenity_name, description } = req.body;
  let image_path = '';

  if (req.file) {
    image_path = `/uploads/amenities/${req.file.filename}`;
  }

  try {
    const [result] = await db.query(
      'UPDATE amenities SET amenity_name = ?, description = ?, image_path = ? WHERE id = ?',
      [amenity_name, description, image_path, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: 'Amenity not found' });
    }
    res.json({ id, amenity_name, description, image_path });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Delete an amenity
exports.deleteAmenity = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query('DELETE FROM amenities WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: 'Amenity not found' });
    }
    res.json({ msg: 'Amenity removed' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
