const router = require('express').Router();
const db = require('../db');

// Create a new pickup (schedules reminder via trigger)
router.post('/', async (req, res, next) => {
  const { user_id, facility_id, waste_type_id, pickup_date } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO pickups (user_id, facility_id, waste_type_id, pickup_date) VALUES (?, ?, ?, ?)',
      [user_id, facility_id, waste_type_id, pickup_date]
    );
    res.json({ pickup_id: result.insertId });
  } catch (err) {
    next(err);
  }
});

module.exports = router;