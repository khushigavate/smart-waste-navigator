import React, { useState, useEffect } from 'react';
import api from '../api/client';

const Stats = ({ facilityId }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get('/stats', { params: { facility: facilityId } })
       .then(res => setData(res.data));
  }, [facilityId]);

  return (
    <div className="container">
      <h1>Recycling Impact Summary</h1>
      <table>
        <thead>
          <tr>
            <th>Waste Type</th>
            <th>Total (kg)</th>
            <th>Revenue ($)</th>
            <th>CO₂ Avoided (kg)</th>
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={`${row.facility_id}-${row.waste_type_id}`}>
              <td>{row.waste_type}</td>
              <td>{row.total_kg}</td>
              <td>{row.revenue_usd}</td>
              <td>{row.co2_avoided_kg}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Stats;
