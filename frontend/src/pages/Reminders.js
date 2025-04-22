import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';    // ← import!
import api from '../api/client';

const Reminders = () => {
  const navigate = useNavigate();                 // ← hook
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    api.get('/reminders', { params: { user: 1 } })
       .then(res => setReminders(res.data));
  }, []);

  return (
    <div className="container">
      <h1>Your Upcoming Pickups</h1>
      <ul>
        {reminders.map(r => (
          <li key={r.reminder_id}>
            On {new Date(r.reminder_time).toLocaleString()}, pick up {r.waste_type} at {r.facility_name}
            <button
              style={{ marginLeft: '1rem' }}
              onClick={() =>
                navigate('/feedback', { state: { facilityId: r.facility_id } })
              }
            >
              Leave Feedback
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reminders;
