import { useState } from 'react';

const VISA_TYPES = ['Tourist', 'Business', 'Student'];
const STATUSES = ['Active', 'Booked', 'Expired'];

function AlertForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState({
    country: '',
    city: '',
    visaType: 'Tourist',
    status: 'Active',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await onSubmit(formData);
    if (success) {
      setFormData({
        country: '',
        city: '',
        visaType: 'Tourist',
        status: 'Active',
      });
    }
  };

  return (
    <div className="form-card">
      <h2>✈️ Create New Alert</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="country">Country *</label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="e.g., USA, Canada, UK"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="city">City *</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="e.g., New Delhi, Mumbai"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="visaType">Visa Type *</label>
          <select
            id="visaType"
            name="visaType"
            value={formData.visaType}
            onChange={handleChange}
          >
            {VISA_TYPES.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            {STATUSES.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
        
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Alert'}
        </button>
      </form>
    </div>
  );
}

export default AlertForm;
