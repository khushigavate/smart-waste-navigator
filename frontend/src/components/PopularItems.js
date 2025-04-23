// frontend/src/components/PopularItems.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';
import './PopularItems.css';

// Simple emoji → accessible mapping
const iconMap = {
  'Smartphone':        '📱',
  'Laptop Battery':    '🔋',
  'Desktop Monitor':   '🖥️',
  'Printer Cartridge': '🖨️',
  'Extension Cable':   '🔌'
};

export default function PopularItems({ wasteTypeId }) {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!wasteTypeId) {
      setItems([]);
      return;
    }
    api.get('/products', { params: { type: wasteTypeId } })
      .then(res => {
        // Dedupe by product_id and take first 5
        const unique = Array.from(
          new Map(res.data.map(r => [r.product_id, r])).values()
        );
        setItems(unique.slice(0, 5));
      })
      .catch(err => console.error(err));
  }, [wasteTypeId]);

  if (!items.length) return null;

  return (
    <div className="popular-container">
      <h2>Popular Items</h2>
      <div className="popular-scroll">
        {items.map(item => (
          <div
            key={item.product_id}
            className="popular-card"
            onClick={() =>
              navigate('/', {
                state: { presetProduct: item.product_id }
              })
            }
          >
            <div className="popular-image">
              <span role="img" aria-label={item.product_name}>
                {iconMap[item.product_name] || '📦'}
              </span>
            </div>
            <div className="popular-name">{item.product_name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
