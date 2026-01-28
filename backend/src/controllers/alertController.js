const alertStore = require('../data/alertStore');

/**
 * Alert Controller - Handles business logic for alert operations
 */

// GET /alerts - Retrieve all alerts with optional filtering
const getAlerts = (req, res, next) => {
  try {
    const { country, status } = req.query;
    
    let alerts;
    if (country || status) {
      alerts = alertStore.filterAlerts({ country, status });
    } else {
      alerts = alertStore.getAllAlerts();
    }
    
    res.status(200).json({
      success: true,
      count: alerts.length,
      data: alerts
    });
  } catch (error) {
    next(error);
  }
};

// POST /alerts - Create a new alert
const createAlert = (req, res, next) => {
  try {
    const { country, city, visaType, status } = req.body;
    
    const newAlert = alertStore.createAlert({
      country,
      city,
      visaType,
      status
    });
    
    res.status(201).json({
      success: true,
      message: 'Alert created successfully',
      data: newAlert
    });
  } catch (error) {
    next(error);
  }
};

// PUT /alerts/:id - Update an existing alert
const updateAlert = (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const updatedAlert = alertStore.updateAlert(id, updateData);
    
    if (!updatedAlert) {
      return res.status(404).json({
        success: false,
        error: 'Alert not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Alert updated successfully',
      data: updatedAlert
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /alerts/:id - Delete an alert
const deleteAlert = (req, res, next) => {
  try {
    const { id } = req.params;
    
    const deletedAlert = alertStore.deleteAlert(id);
    
    if (!deletedAlert) {
      return res.status(404).json({
        success: false,
        error: 'Alert not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Alert deleted successfully',
      data: deletedAlert
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAlerts,
  createAlert,
  updateAlert,
  deleteAlert
};
