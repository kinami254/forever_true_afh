const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(helmet());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Static folder for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
const servicesRoutes = require('./routes/services');
const amenitiesRoutes = require('./routes/amenities');
const careersRoutes = require('./routes/careers');
const testimonialsRoutes = require('./routes/testimonials');
const inquiriesRoutes = require('./routes/inquiries');

app.use('/api/services', servicesRoutes);
app.use('/api/amenities', amenitiesRoutes);
app.use('/api/careers', careersRoutes);
app.use('/api/testimonials', testimonialsRoutes);
app.use('/api/inquiries', inquiriesRoutes);

// Serve React frontend
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// Default Route
app.get('/', (req, res) => {
  res.send('Forever True Adult Family Home LLC API');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
