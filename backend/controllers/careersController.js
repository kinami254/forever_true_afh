// backend/controllers/careersController.js

const db = require('../config/database');

// Get all careers
exports.getAllCareers = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM careers');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Add a new career
exports.addCareer = async (req, res) => {
  const { job_title, description, qualifications, application_instructions } = req.body;

  try {
    const [result] = await db.query(
      'INSERT INTO careers (job_title, description, qualifications, application_instructions) VALUES (?, ?, ?, ?)',
      [job_title, description, qualifications, application_instructions]
    );
    res.status(201).json({ id: result.insertId, job_title, description, qualifications, application_instructions });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Update a career
exports.updateCareer = async (req, res) => {
  const { id } = req.params;
  const { job_title, description, qualifications, application_instructions } = req.body;

  try {
    const [result] = await db.query(
      'UPDATE careers SET job_title = ?, description = ?, qualifications = ?, application_instructions = ? WHERE id = ?',
      [job_title, description, qualifications, application_instructions, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: 'Career not found' });
    }
    res.json({ id, job_title, description, qualifications, application_instructions });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Delete a career
exports.deleteCareer = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query('DELETE FROM careers WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: 'Career not found' });
    }
    res.json({ msg: 'Career removed' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Handle job applications
exports.applyForCareer = async (req, res) => {
  const { career_id, name, email, phone } = req.body;
  const resume = req.files['resume'] ? `/uploads/resumes/${req.files['resume'][0].filename}` : null;
  const coverLetter = req.files['coverLetter'] ? `/uploads/coverLetters/${req.files['coverLetter'][0].filename}` : null;

  try {
    const [result] = await db.query(
      'INSERT INTO applications (career_id, name, email, phone, resume, cover_letter) VALUES (?, ?, ?, ?, ?, ?)',
      [career_id, name, email, phone, resume, coverLetter]
    );
    res.status(201).json({ msg: 'Application submitted successfully', applicationId: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
