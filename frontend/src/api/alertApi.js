const API_BASE_URL = '/alerts';

/**
 * API Service for communicating with the backend
 */

export const alertApi = {
  // Get all alerts with optional filters
  async getAlerts(filters = {}) {
    const params = new URLSearchParams();
    if (filters.country) params.append('country', filters.country);
    if (filters.status) params.append('status', filters.status);
    
    const url = params.toString() ? `${API_BASE_URL}?${params}` : API_BASE_URL;
    const response = await fetch(url);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch alerts');
    }
    
    return response.json();
  },

  // Create a new alert
  async createAlert(alertData) {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(alertData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.details?.join(', ') || error.error || 'Failed to create alert');
    }
    
    return response.json();
  },

  // Update an existing alert
  async updateAlert(id, updateData) {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.details?.join(', ') || error.error || 'Failed to update alert');
    }
    
    return response.json();
  },

  // Delete an alert
  async deleteAlert(id) {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete alert');
    }
    
    return response.json();
  },
};
