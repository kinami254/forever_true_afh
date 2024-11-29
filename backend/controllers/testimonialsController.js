// backend/controllers/testimonialsController.js

const db = require('../config/database');

// Get all testimonials
exports.getAllTestimonials = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM testimonials');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Add a new testimonial
exports.addTestimonial = async (req, res) => {
  const { resident_name, relationship, testimonial_text, testimonial_date } = req.body;

  try {
    const [result] = await db.query(
      'INSERT INTO testimonials (resident_name, relationship, testimonial_text, testimonial_date) VALUES (?, ?, ?, ?)',
      [resident_name, relationship, testimonial_text, testimonial_date]
    );
    res.status(201).json({ id: result.insertId, resident_name, relationship, testimonial_text, testimonial_date });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Update a testimonial
exports.updateTestimonial = async (req, res) => {
  const { id } = req.params;
  const { resident_name, relationship, testimonial_text, testimonial_date } = req.body;

  try {
    const [result] = await db.query(
      'UPDATE testimonials SET resident_name = ?, relationship = ?, testimonial_text = ?, testimonial_date = ? WHERE id = ?',
      [resident_name, relationship, testimonial_text, testimonial_date, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: 'Testimonial not found' });
    }
    res.json({ id, resident_name, relationship, testimonial_text, testimonial_date });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Delete a testimonial
exports.deleteTestimonial = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query('DELETE FROM testimonials WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: 'Testimonial not found' });
    }
    res.json({ msg: 'Testimonial removed' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
