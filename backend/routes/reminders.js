const router = require('express').Router();
const db = require('../db');

// Get upcoming reminders for a user
router.get('/', async (req, res, next) => {
  const user_id = req.query.user;
  try {
    const [rows] = await db.query(
      'SELECT * FROM vw_all_reminders WHERE user_id = ?',
      [user_id]
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

module.exports = router;