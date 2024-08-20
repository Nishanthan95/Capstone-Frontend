import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/global.css';

function Reports() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        let token = localStorage.getItem('token');

        if (!token) {
          console.error('No token found, redirecting to login.');
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get('http://localhost:5000/api/reports/generate', config);
        setReport(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching report:', err.response ? err.response.data : err.message);
        setError(err.response ? err.response.data.msg : 'Error fetching report');
        setLoading(false);
      }
    };

    fetchReport();
  }, []);

  if (loading) return <p>Loading report...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="report-container">
      <h2 className="report-title">Reports</h2>
      <p className="report-summary">
        Total Products: {report.totalProducts} <br />
        Total Value: ${report.totalValue.toFixed(2)}
      </p>
      <table className="report-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {report.stockDetails.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>${item.value.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Reports;
