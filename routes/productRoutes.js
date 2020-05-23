const express = require('express');

const {
  addProduct,
  upload,
  resize,
  addValidator,
  getProduct,
  queryValidator,
} = require('../controllers/productController');

const router = express.Router();

router.get('/', (req, res) => {
  console.log(req.query);
  res.json({
    greetings: 'product',
  });
});

// get products
router.get('/get', queryValidator, getProduct);

// save single produce
router.post('/save', upload, addValidator, resize, addProduct);

module.exports = router;
