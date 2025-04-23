// backend/routes/products.js
const router = require('express').Router();
const db     = require('../db');

router.get('/', async (req, res, next) => {
  const { type } = req.query;            // waste_type_id
  try {
    let sql    = 'SELECT * FROM vw_product_details';
    const args = [];
    if (type) {
      sql   += ' WHERE waste_type_id = ?';
      args.push(type);
    }
    const [rows] = await db.query(sql, args);
    res.json(rows);
  } catch (err) {
    next(err);
  }
});
// GET /products/popular
router.get('/popular', async (req, res, next) => {
    try {
      // Simple prototype: return the first 5 products
      const [rows] = await db.query(
        'SELECT id AS product_id, name AS product_name, description FROM products LIMIT 5'
      );
      res.json(rows);
    } catch (err) {
      next(err);
    }
  });
  

module.exports = router;
