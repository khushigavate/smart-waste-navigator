// frontend/src/pages/Search.js
import React, { useState, useEffect } from 'react';
import api from '../api/client';
import { useNavigate } from 'react-router-dom';

export default function Search() {
  const [wasteTypes, setWasteTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [zip, setZip] = useState('');
  const [facilities, setFacilities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/waste-types').then(res => setWasteTypes(res.data));
  }, []);

  const handleSearch = async () => {
    if (!selectedType || !zip) return alert('Choose type & enter ZIP');
    const res = await api.get('/facilities', { params: { type: selectedType, zip } });
    setFacilities(res.data);
  };

  return (
    <div className="container">
      <h1>Find a Disposal Center</h1>
      <div>
        <select
          value={selectedType}
          onChange={e => setSelectedType(e.target.value)}
        >
          <option value="">-- Select Waste Type --</option>
          {wasteTypes.map(w => (
            <option key={w.id} value={w.id}>{w.name}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="ZIP Code"
          value={zip}
          onChange={e => setZip(e.target.value)}
          style={{ marginLeft: '8px' }}
        />
        <button className="btn" onClick={handleSearch}>
          Search
        </button>
      </div>

      {facilities.length > 0 && (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {facilities.map(f => (
            <li key={f.id} style={{ marginTop: '12px' }}>
              <strong>{f.name}</strong><br/>
              {f.address}<br/>
              <button
                className="btn"
                onClick={() => navigate('/book', {
                  state: { facility: f, wasteType: wasteTypes.find(w => w.id === +selectedType) }
                })}
              >
                Schedule Pickup
              </button>
              <button
                className="btn"
                onClick={() => navigate(`/stats/${f.id}`)}
              >
                View Impact
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
