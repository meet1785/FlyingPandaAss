/**
 * Input Validation Middleware
 * Validates alert data before processing
 */

const VALID_VISA_TYPES = ['Tourist', 'Business', 'Student'];
const VALID_STATUSES = ['Active', 'Booked', 'Expired'];

// Validate required fields for creating a new alert
const validateAlert = (req, res, next) => {
  const { country, city, visaType } = req.body;
  const errors = [];
  
  // Check required fields
  if (!country || typeof country !== 'string' || country.trim() === '') {
    errors.push('Country is required and must be a non-empty string');
  }
  
  if (!city || typeof city !== 'string' || city.trim() === '') {
    errors.push('City is required and must be a non-empty string');
  }
  
  if (!visaType) {
    errors.push('Visa type is required');
  } else if (!VALID_VISA_TYPES.includes(visaType)) {
    errors.push(`Visa type must be one of: ${VALID_VISA_TYPES.join(', ')}`);
  }
  
  // Validate status if provided
  if (req.body.status && !VALID_STATUSES.includes(req.body.status)) {
    errors.push(`Status must be one of: ${VALID_STATUSES.join(', ')}`);
  }
  
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: errors
    });
  }
  
  next();
};

// Validate fields for updating an alert (less strict - partial updates allowed)
const validateAlertUpdate = (req, res, next) => {
  const { country, city, visaType, status } = req.body;
  const errors = [];
  
  // Validate fields only if provided
  if (country !== undefined && (typeof country !== 'string' || country.trim() === '')) {
    errors.push('Country must be a non-empty string');
  }
  
  if (city !== undefined && (typeof city !== 'string' || city.trim() === '')) {
    errors.push('City must be a non-empty string');
  }
  
  if (visaType !== undefined && !VALID_VISA_TYPES.includes(visaType)) {
    errors.push(`Visa type must be one of: ${VALID_VISA_TYPES.join(', ')}`);
  }
  
  if (status !== undefined && !VALID_STATUSES.includes(status)) {
    errors.push(`Status must be one of: ${VALID_STATUSES.join(', ')}`);
  }
  
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: errors
    });
  }
  
  next();
};

module.exports = {
  validateAlert,
  validateAlertUpdate,
  VALID_VISA_TYPES,
  VALID_STATUSES
};
