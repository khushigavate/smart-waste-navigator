// frontend/src/pages/Feedback.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api/client';

export default function Feedback() {
  const { state } = useLocation();
  const { facilityId, facilityName } = state || {};
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const navigate = useNavigate();

  if (!facilityId) {
    return <p>No facility selected.</p>;
  }

  const stars = [1,2,3,4,5];

  const handleSubmit = async () => {
    await api.post('/feedback', {
      user_id: 1,
      facility_id: facilityId,
      rating,
      comment
    });
    navigate(`/stats/${facilityId}`);
  };

  return (
    <div className="container">
      <h1>Leave Feedback</h1>
      <div className="card">
        <h3>{facilityName}</h3>
      </div>

      <div>
        <h3>Your Rating:</h3>
        <div className="star-rating">
          {stars.map(s => (
            <span
              key={s}
              className={`star ${s <= rating ? 'filled' : ''}`}
              role="button"
              onClick={() => setRating(s)}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      <div style={{ margin: '16px 0' }}>
        <textarea
          rows="4"
          placeholder="Leave a comment..."
          value={comment}
          onChange={e => setComment(e.target.value)}
          style={{ width:'100%', padding:'8px', borderRadius:'4px', border:'1px solid #ccc' }}
        />
      </div>

      <button className="btn" onClick={handleSubmit}>
        Submit Feedback
      </button>
    </div>
  );
}
