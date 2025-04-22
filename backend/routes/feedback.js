const router = require('express').Router();
const db = require('../db');

// Submit feedback and return updated rating summary
router.post('/', async (req, res, next) => {
  const { user_id, facility_id, rating, comment } = req.body;
  try {
    await db.query(
      'INSERT INTO feedback (user_id, facility_id, rating, comment) VALUES (?, ?, ?, ?)',
      [user_id, facility_id, rating, comment]
    );
    const [rows] = await db.query(
      'SELECT * FROM vw_facility_ratings WHERE facility_id = ?',
      [facility_id]
    );
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
});

module.exports = router;