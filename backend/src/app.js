const express = require('express');
const cors = require('cors');
const alertRoutes = require('./routes/alertRoutes');
const { requestLogger } = require('./middleware/logger');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Flying Panda API is running 🐼' });
});

// API Routes
app.use('/alerts', alertRoutes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
