import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api/client';

const Feedback = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { facilityId } = state || {};
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  if (!facilityId) return <p>No facility selected for feedback.</p>;

  const handleSubmit = () => {
    api.post('/feedback', { user_id:1, facility_id:facilityId, rating, comment })
       .then(res => {
         alert(`Thanks! New avg rating: ${res.data.avg_rating}`);
         navigate('/');
       });
  };

  return (
    <div className="container">
      <h1>Leave Feedback</h1>
      <label>Rating:</label>
      <select value={rating} onChange={e => setRating(+e.target.value)}>
        {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
      </select>
      <textarea
        value={comment}
        onChange={e => setComment(e.target.value)}
        placeholder="Your comments"
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Feedback;
