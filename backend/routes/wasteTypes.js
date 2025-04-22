const router = require('express').Router();
const db = require('../db');

// Get all waste types
router.get('/', async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT id, name FROM waste_types');
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

module.exports = router;