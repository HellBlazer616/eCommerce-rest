const express = require('express');
const productRoutes = require('./productRoutes');
const orderRoutes = require('./orderRoutes');
const {
  validateRegister,
  register,
  userInfo,
  updateUser,
} = require('../controllers/userController');
const {
  login,
  logout,
  isLoggedIn,
  requireJwt,
  signJwt,
} = require('../controllers/authController');

const router = express.Router();

router.get('/', (req, res) => {
  console.log(req?.user);
  res.json({ greetings: 'Hello' });
});

router.use('/api/v1/product', productRoutes);
router.use('/api/v1/order', orderRoutes);

router.post('/api/v1/register', validateRegister, register, login, signJwt);
router.post('/api/v1/logout', logout);
router.post('/api/v1/login', login, signJwt);

router.get('/api/v1/account', requireJwt, userInfo);
router.put('/api/v1/account', requireJwt, updateUser);

module.exports = router;
