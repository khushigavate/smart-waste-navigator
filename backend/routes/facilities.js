const router = require('express').Router();
const db = require('../db');

router.get('/', async (req, res, next) => {
  const { type, zip } = req.query;
  try {
    const [rows] = await db.query('CALL sp_find_facilities(?, ?)', [type, zip]);
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
