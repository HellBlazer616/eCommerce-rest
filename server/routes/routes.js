const express = require('express');
const productRoutes = require('./productRoutes');
const orderRoutes = require('./orderRoutes');

const router = express.Router();

router.use('/api/v1/product', productRoutes);
router.use('/api/v1/order', orderRoutes);

module.exports = router;
