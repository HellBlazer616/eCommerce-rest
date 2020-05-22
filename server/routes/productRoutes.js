const express = require('express');

const {
  addController,
  upload,
  resize,
  addValidator,
  getController,
} = require('../controllers/productController');

const router = express.Router();

router.get('/', (req, res) => {
  console.log(req.query);
  res.json({
    greetings: 'product',
  });
});

// get products
router.get('/get', getController);

// save single produce
router.post('/save', upload, resize, addValidator, addController);

module.exports = router;
