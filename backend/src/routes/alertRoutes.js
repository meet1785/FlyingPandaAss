const express = require('express');
const router = express.Router();
const alertController = require('../controllers/alertController');
const { validateAlert, validateAlertUpdate } = require('../middleware/validator');

/**
 * Alert Routes
 * Base path: /alerts
 */

// GET /alerts - Get all alerts (with optional filters: country, status)
router.get('/', alertController.getAlerts);

// POST /alerts - Create a new alert
router.post('/', validateAlert, alertController.createAlert);

// PUT /alerts/:id - Update an existing alert
router.put('/:id', validateAlertUpdate, alertController.updateAlert);

// DELETE /alerts/:id - Delete an alert
router.delete('/:id', alertController.deleteAlert);

module.exports = router;
