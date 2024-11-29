// backend/controllers/servicesController.js

const db = require('../config/database');

// Get all services
exports.getAllServices = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM services');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Add a new service
exports.addService = async (req, res) => {
  const { service_name, description } = req.body;
  let image_path = '';

  if (req.file) {
    image_path = `/uploads/services/${req.file.filename}`;
  }

  try {
    const [result] = await db.query(
      'INSERT INTO services (service_name, description, image_path) VALUES (?, ?, ?)',
      [service_name, description, image_path]
    );
    res.status(201).json({ id: result.insertId, service_name, description, image_path });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Update a service
exports.updateService = async (req, res) => {
  const { id } = req.params;
  const { service_name, description } = req.body;
  let image_path = '';

  if (req.file) {
    image_path = `/uploads/services/${req.file.filename}`;
  }

  try {
    const [result] = await db.query(
      'UPDATE services SET service_name = ?, description = ?, image_path = ? WHERE id = ?',
      [service_name, description, image_path, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: 'Service not found' });
    }
    res.json({ id, service_name, description, image_path });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Delete a service
exports.deleteService = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query('DELETE FROM services WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: 'Service not found' });
    }
    res.json({ msg: 'Service removed' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
