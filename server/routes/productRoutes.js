const express = require('express');

const {
  addController,
  upload,
  resize,
  addValidator,
  getController,
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
router.get('/get', queryValidator, getController);

// save single produce
router.post('/save', upload, addValidator, resize, addController);

module.exports = router;
