const STATUSES = ['Active', 'Booked', 'Expired'];

function AlertTable({ 
  alerts, 
  loading, 
  onUpdateStatus, 
  onDelete,
  countryFilter,
  statusFilter,
  onCountryFilterChange,
  onStatusFilterChange,
  countries
}) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getNextStatus = (currentStatus) => {
    const statusIndex = STATUSES.indexOf(currentStatus);
    return STATUSES[(statusIndex + 1) % STATUSES.length];
  };

  if (loading) {
    return (
      <div className="table-card">
        <div className="loading">🔄 Loading alerts...</div>
      </div>
    );
  }

  return (
    <div className="table-card">
      <div className="table-header">
        <h2>🌍 Visa Slot Alerts</h2>
        <div className="filters">
          <select 
            value={countryFilter} 
            onChange={(e) => onCountryFilterChange(e.target.value)}
          >
            <option value="">All Countries</option>
            {countries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
          <select 
            value={statusFilter} 
            onChange={(e) => onStatusFilterChange(e.target.value)}
          >
            <option value="">All Statuses</option>
            {STATUSES.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      {alerts.length === 0 ? (
        <div className="empty-state">
          <span>🐼</span>
          <p>No alerts found. Create your first visa alert!</p>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Country</th>
              <th>City</th>
              <th>Visa Type</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map(alert => (
              <tr key={alert.id}>
                <td><strong>{alert.country}</strong></td>
                <td>{alert.city}</td>
                <td>{alert.visaType}</td>
                <td>
                  <span className={`status-badge status-${alert.status.toLowerCase()}`}>
                    {alert.status}
                  </span>
                </td>
                <td>{formatDate(alert.createdAt)}</td>
                <td>
                  <div className="actions">
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => onUpdateStatus(alert.id, getNextStatus(alert.status))}
                      title={`Change to ${getNextStatus(alert.status)}`}
                    >
                      → {getNextStatus(alert.status)}
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => onDelete(alert.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AlertTable;
