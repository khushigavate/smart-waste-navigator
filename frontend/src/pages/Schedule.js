import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api/client';

const Schedule = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { facility, wasteType } = state || {};
  const [date, setDate] = useState('');

  const handleSchedule = () => {
    if (!date) return;
    api.post('/pickups', {
      user_id: 1,
      facility_id: facility.id,
      waste_type_id: wasteType.id,
      pickup_date: date.replace('T', ' ')
    }).then(() => {
      alert('Pickup scheduled!');
      navigate('/reminders');
    });
  };

  if (!facility) return <p>No facility selected.</p>;

  return (
    <div className="container">
      <h1>Schedule Pickup</h1>
      <p><strong>Facility:</strong> {facility.name}</p>
      <p><strong>Address:</strong> {facility.address}</p>
      <p><strong>Waste Type:</strong> {wasteType.name}</p>
      <input
        type="datetime-local"
        value={date}
        onChange={e => setDate(e.target.value)}
      />
      <button onClick={handleSchedule}>Confirm</button>
    </div>
  );
};

export default Schedule;