const express = require('express');

const {
  orderSaveController,
  getUserOrder,
} = require('../controllers/orderController');
const { requireJwt } = require('../controllers/authController');

const router = express.Router();

router.get('/get', requireJwt, getUserOrder);

router.post('/new', requireJwt, orderSaveController);

module.exports = router;
