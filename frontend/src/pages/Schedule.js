// frontend/src/pages/Schedule.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api/client';

export default function Schedule() {
  const { state } = useLocation();
  const { facility, wasteType, product } = state || {};
  const [pickupDate, setPickupDate] = useState('');
  const navigate = useNavigate();

  if (!facility || !wasteType) {
    return <p>Facility or waste type not selected. Go back to search.</p>;
  }

  const handleSubmit = async () => {
    if (!pickupDate) return alert('Please select date & time');
    await api.post('/pickups', {
      user_id: 1,
      facility_id: facility.id,
      waste_type_id: wasteType.id,
      pickup_date: pickupDate,
    });
    navigate('/reminders');
  };

  return (
    <div className="container">
      <h1>Schedule Pickup</h1>

      <div className="step-info">
        <div className="card">
          <h3>Facility</h3>
          <p><strong>{facility.name}</strong><br/>{facility.address}</p>
        </div>
        <div className="card">
          <h3>Waste Type</h3>
          <p>{wasteType.name}</p>
        </div>
        {product && (
          <div className="card">
            <h3>Product</h3>
            <p>{product.name}</p>
          </div>
        )}
      </div>

      // Wrap your date-picker in .input-group and add the calendar icon
      <div className="form-row">
        <div className="input-group">
          <span className="icon-calendar" role="img" aria-label="calendar">📅</span>
          <input
            type="datetime-local"
            value={pickupDate}
            onChange={e => setPickupDate(e.target.value)}
          />
        </div>
        <button className="btn" onClick={handleSubmit}>
          Confirm Pickup
        </button>
      </div>

    </div>
  );
}
