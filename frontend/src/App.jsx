import { useState, useEffect, useCallback } from 'react';
import AlertForm from './components/AlertForm';
import AlertTable from './components/AlertTable';
import { alertApi } from './api/alertApi';

function App() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [countryFilter, setCountryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [countries, setCountries] = useState([]);

  // Fetch alerts from API
  const fetchAlerts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const filters = {};
      if (countryFilter) filters.country = countryFilter;
      if (statusFilter) filters.status = statusFilter;
      
      const response = await alertApi.getAlerts(filters);
      setAlerts(response.data);
      
      // Update unique countries list for filter dropdown
      if (!countryFilter && !statusFilter) {
        const uniqueCountries = [...new Set(response.data.map(a => a.country))];
        setCountries(uniqueCountries);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [countryFilter, statusFilter]);

  useEffect(() => {
    fetchAlerts();
  }, [fetchAlerts]);

  // Show success message temporarily
  const showSuccess = (message) => {
    setSuccess(message);
    setTimeout(() => setSuccess(null), 3000);
  };

  // Create new alert
  const handleCreateAlert = async (alertData) => {
    try {
      setFormLoading(true);
      setError(null);
      await alertApi.createAlert(alertData);
      showSuccess('Alert created successfully! 🎉');
      await fetchAlerts();
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setFormLoading(false);
    }
  };

  // Update alert status
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      setError(null);
      await alertApi.updateAlert(id, { status: newStatus });
      showSuccess(`Status updated to ${newStatus}! ✅`);
      await fetchAlerts();
    } catch (err) {
      setError(err.message);
    }
  };

  // Delete alert
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this alert?')) {
      return;
    }
    
    try {
      setError(null);
      await alertApi.deleteAlert(id);
      showSuccess('Alert deleted successfully! 🗑️');
      await fetchAlerts();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-logo">
          <img 
            src="https://theflyingpanda.io/LogoIconColoured.png" 
            alt="The Flying Panda Logo" 
          />
        </div>
        <h1>The <span>Flying Panda</span></h1>
        <p>Internal Visa Slot Alert Tracker</p>
      </header>

      {error && <div className="error">❌ {error}</div>}
      {success && <div className="success">✅ {success}</div>}

      <div className="container">
        <AlertForm 
          onSubmit={handleCreateAlert} 
          loading={formLoading} 
        />
        
        <AlertTable
          alerts={alerts}
          loading={loading}
          onUpdateStatus={handleUpdateStatus}
          onDelete={handleDelete}
          countryFilter={countryFilter}
          statusFilter={statusFilter}
          onCountryFilterChange={setCountryFilter}
          onStatusFilterChange={setStatusFilter}
          countries={countries}
        />
      </div>

      <footer className="footer">
        <p>© 2026 <a href="https://theflyingpanda.io" target="_blank" rel="noopener noreferrer">The Flying Panda</a> — Making visa processes seamless</p>
      </footer>
    </div>
  );
}

export default App;
