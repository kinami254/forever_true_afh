const nodemailer = require('nodemailer');
const db = require('../config/database');

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER, // Use environment variables for security
    pass: process.env.EMAIL_PASS
  }
});

// Handle contact inquiries
exports.submitInquiry = async (req, res) => {
  const { name, email, phone, message } = req.body;

  try {
    // Save inquiry to the database
    const [result] = await db.query(
      'INSERT INTO inquiries (name, email, phone_number, message) VALUES (?, ?, ?, ?)',
      [name, email, phone, message]
    );

    // Prepare email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL, // Email recipient, also stored in environment variables
      subject: 'New Inquiry Submitted',
      text: `New inquiry received:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`
    };

    // Send notification email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    // Respond to the client
    res.status(201).json({ msg: 'Inquiry submitted successfully', inquiryId: result.insertId });
  } catch (err) {
    console.error('Error handling inquiry:', err);
    res.status(500).send('Server Error');
  }
};
