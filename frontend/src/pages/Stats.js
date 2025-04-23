// frontend/src/pages/Stats.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/client';

export default function Stats() {
  const { id: facilityId } = useParams();
  const [data, setData]    = useState([]);
  const navigate           = useNavigate();

  useEffect(() => {
    api.get('/stats', { params: { facility: facilityId } })
       .then(res => setData(res.data))
       .catch(console.error);
  }, [facilityId]);

  return (
    <div className="container">
      <h1>Impact Summary</h1>
      <button className="btn" onClick={() => navigate(-1)}>← Back</button>

      {data.length === 0 ? (
        <p>No recycling data yet.</p>
      ) : (
        <div className="stats-grid">
          {data.map(row => (
            <div key={row.waste_type} className="stat-card">
              <h3>{row.waste_type}</h3>
              <p><strong>{row.total_kg} kg</strong></p>
              <p>${row.revenue_usd}</p>
              <p>{row.co2_avoided_kg} kg CO₂</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
