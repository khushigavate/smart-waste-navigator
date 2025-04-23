// frontend/src/pages/Reminders.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';

export default function Reminders() {
  const [reminders, setReminders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/reminders', { params: { user: 1 } })
       .then(res => setReminders(res.data))
       .catch(console.error);
  }, []);

  const formatRelative = time => {
    const diff = new Date(time) - new Date();
    const hrs = Math.round(diff / (1000*60*60));
    if (hrs > 24) return `in ${Math.ceil(hrs/24)} day(s)`;
    if (hrs > 0) return `in ${hrs} hr(s)`;
    return 'soon';
  };

  // Wrap your list in .reminder-timeline, each item in .timeline-item
return (
  <div className="container">
    <h1>Your Upcoming Pickups</h1>
    {reminders.length === 0 ? (
      <p>No pickups scheduled.</p>
    ) : (
      <div className="reminder-timeline">
        {reminders.map(r => (
          <div key={r.reminder_id} className="timeline-item">
            <div className="reminder-card">
              <h3>{r.facility_name}</h3>
              <div className="timestamp">
                {new Date(r.reminder_time).toLocaleString()} (
                {formatRelative(r.reminder_time)})
              </div>
              <div>Waste: <strong>{r.waste_type}</strong></div>
              <div className="card-actions">
                <button className="btn" onClick={() => navigate(`/stats/${r.facility_id}`)}>
                  View Impact
                </button>
                <button className="btn" onClick={() => navigate('/feedback', {
                  state: {
                    facilityId: r.facility_id,
                    facilityName: r.facility_name
                  }
                })}>
                  Leave Feedback
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

}
