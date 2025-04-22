// routes/stats.js
const router = require('express').Router();
const db = require('../db');

// GET /stats?facility=1
router.get('/', async (req, res, next) => {
  const { facility } = req.query;
  try {
    let sql = 'SELECT * FROM vw_recycling_summary';
    const params = [];
    if (facility) {
      sql += ' WHERE facility_id = ?';
      params.push(facility);
    }
    const [rows] = await db.query(sql, params);
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
