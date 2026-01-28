const { v4: uuidv4 } = require('uuid');

/**
 * In-memory data store for visa alerts
 * Design Decision: Using in-memory storage for simplicity and quick setup.
 * For production, this would be replaced with a database like MongoDB or PostgreSQL.
 */

// Sample seed data
const alerts = [
  {
    id: uuidv4(),
    country: 'USA',
    city: 'New Delhi',
    visaType: 'Tourist',
    status: 'Active',
    createdAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    country: 'Canada',
    city: 'Mumbai',
    visaType: 'Student',
    status: 'Active',
    createdAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    country: 'UK',
    city: 'Bangalore',
    visaType: 'Business',
    status: 'Booked',
    createdAt: new Date().toISOString()
  }
];

// Data access functions
const getAllAlerts = () => alerts;

const getAlertById = (id) => alerts.find(alert => alert.id === id);

const createAlert = (alertData) => {
  const newAlert = {
    id: uuidv4(),
    country: alertData.country,
    city: alertData.city,
    visaType: alertData.visaType,
    status: alertData.status || 'Active',
    createdAt: new Date().toISOString()
  };
  alerts.push(newAlert);
  return newAlert;
};

const updateAlert = (id, updateData) => {
  const index = alerts.findIndex(alert => alert.id === id);
  if (index === -1) return null;
  
  alerts[index] = {
    ...alerts[index],
    ...updateData,
    id: alerts[index].id, // Prevent ID modification
    createdAt: alerts[index].createdAt // Preserve original creation date
  };
  return alerts[index];
};

const deleteAlert = (id) => {
  const index = alerts.findIndex(alert => alert.id === id);
  if (index === -1) return null;
  
  const deleted = alerts.splice(index, 1);
  return deleted[0];
};

// Filter alerts by query parameters
const filterAlerts = (query) => {
  let result = [...alerts];
  
  if (query.country) {
    result = result.filter(alert => 
      alert.country.toLowerCase() === query.country.toLowerCase()
    );
  }
  
  if (query.status) {
    result = result.filter(alert => 
      alert.status.toLowerCase() === query.status.toLowerCase()
    );
  }
  
  return result;
};

module.exports = {
  getAllAlerts,
  getAlertById,
  createAlert,
  updateAlert,
  deleteAlert,
  filterAlerts
};
