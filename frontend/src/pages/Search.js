// frontend/src/pages/Search.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';
import PopularItems from '../components/PopularItems';
import '../index.css';

export default function Search() {
  const [wasteTypes, setWasteTypes]             = useState([]);
  const [selectedType, setSelectedType]         = useState('');
  const [zip, setZip]                           = useState('');
  const [productRows, setProductRows]           = useState([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [facilities, setFacilities]             = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/waste-types').then(res => setWasteTypes(res.data));
  }, []);

  useEffect(() => {
    if (!selectedType) {
      setProductRows([]);
      setSelectedProductId('');
      return;
    }
    api.get('/products', { params: { type: selectedType } })
       .then(res => { setProductRows(res.data); setSelectedProductId(''); })
       .catch(console.error);
  }, [selectedType]);

  const products = Array.from(
    new Map(
      productRows.map(r => [
        r.product_id,
        { id: r.product_id, name: r.product_name, description: r.description }
      ])
    ).values()
  );

  const details = productRows.filter(r => r.product_id === +selectedProductId);

  const handleSearch = async () => {
    if (!selectedType || !zip) {
      return alert('Please select type & enter ZIP');
    }
    try {
      const res = await api.get('/facilities', {
        params: { type: selectedType, zip }
      });
      setFacilities(res.data);
    } catch (err) {
      console.error(err);
      alert('Error fetching facilities');
    }
  };

  return (
    <div className="container">
      {/* Hero */}
      <div className="hero">
        <div className="hero-overlay"></div>
        <h1>Recycle Smarter, Live Better</h1>
        <p>Find the nearest centers, schedule pickups, and see your impact at a glance.</p>
      </div>

      {/* How It Works */}
      <div className="how-it-works">
        <div className="step-card">
          <span className="icon" role="img" aria-label="Search">🔍</span>
          <h3>1. Search</h3>
          <p>Choose your waste type and location to find facilities near you.</p>
        </div>
        <div className="step-card">
          <span className="icon" role="img" aria-label="Book">📅</span>
          <h3>2. Schedule</h3>
          <p>Book a pickup or plan your drop-off in just a few clicks.</p>
        </div>
        <div className="step-card">
          <span className="icon" role="img" aria-label="Track">📈</span>
          <h3>3. Track Impact</h3>
          <p>See how much material you’ve recycled and CO₂ you’ve saved.</p>
        </div>
      </div>

      {/* Popular Items */}
      {selectedType && <PopularItems wasteTypeId={selectedType} />}

      {/* Search Form */}
      <div className="form-row">
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
        />

        <button className="btn" onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* Product Dropdown */}
      {products.length > 0 && (
        <div className="form-row">
          <select
            value={selectedProductId}
            onChange={e => setSelectedProductId(e.target.value)}
          >
            <option value="">-- Select Product --</option>
            {products.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>
      )}

      {/* Product Details */}
      {details.length > 0 && (
        <div className="card">
          <h2>About {details[0].product_name}</h2>
          <p>{details[0].description}</p>

          <h3>Materials</h3>
          <table>
            <thead>
              <tr>
                <th>Material</th>
                <th>Recyclable</th>
                <th>Hazardous</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {details.map((row, i) => (
                <tr key={i}>
                  <td>{row.material}</td>
                  <td>{row.is_recyclable ? 'Yes' : 'No'}</td>
                  <td>{row.is_hazardous ? 'Yes' : 'No'}</td>
                  <td>{row.material_notes}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3>Preparation Tips</h3>
          {[...new Set(details.map(r => r.prep_tip))].map((tip, i) => (
            <div key={i} className="tip">{tip}</div>
          ))}
        </div>
      )}

      {/* Facilities & Map */}
      {facilities.length > 0 && (
        <>
          <div className="card-grid">
            {facilities.map(f => (
              <div key={f.id} className="facility-card" tabIndex="0">
                <h3>{f.name}</h3>
                <p>{f.address}</p>
                <div className="card-actions">
                  <button
                    className="btn"
                    onClick={() =>
                         navigate('/book', {
                           state: {
                             facility:    f,
                              wasteType:   wasteTypes.find(w => w.id === +selectedType),
                             product:     products.find(p => p.id === +selectedProductId) // optional
                           }
                         })
                       }
                  >
                    Schedule
                  </button>
                  <button
                    className="btn"
                    onClick={() => navigate(`/stats/${f.id}`)}
                  >
                    Impact
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="map-container">
            <iframe
              title="Facility Map"
              width="100%"
              height="100%"
              src={`https://maps.google.com/maps?q=${facilities[0].zip}&output=embed`}
              style={{ border: 0 }}
            />
          </div>
        </>
      )}

      {/* Footer */}
      <div className="footer">
        © 2025 WasteNav &nbsp;|&nbsp;
        <a href="/about">About</a>&nbsp;|&nbsp;
        <a href="/privacy">Privacy</a>&nbsp;|&nbsp;
        <a href="/help">Help</a>
      </div>
    </div>
  );
}
