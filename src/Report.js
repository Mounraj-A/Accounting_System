import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Forms.css';

function Report() {
  const [report, setReport] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await axios.get('http://localhost:3000/reports');
        setReport(response.data);
      } catch (error) {
        console.error('Failed to fetch report:', error);
        setError('Failed to load reports. Please try again later.');
      }
    };
    fetchReport();
  }, []);

  return (
    <div className="report">
      <h2>Report</h2>
      {error && <p className="error-message">{error}</p>}
      <ul>
        {report.length > 0 ? (
          report.map((item, index) => (
            <li key={index} className="report-item">
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <p><em>{new Date(item.date).toLocaleDateString()}</em></p>
            </li>
          ))
        ) : (
          <p>No reports available.</p>
        )}
      </ul>
    </div>
  );
}

export default Report;
