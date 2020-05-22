const express = require('express');

const {
  addController,
  upload,
  resize,
  addValidator,
} = require('../controllers/productController');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    greetings: 'product',
  });
});

// save single produce
router.post('/save', addValidator, upload, resize, addController);

module.exports = router;
