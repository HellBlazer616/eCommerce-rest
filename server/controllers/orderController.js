const Order = require('../Models/Order');
const { asyncHandler } = require('../utils/errorHandlers');

/**
 *
 * @route /api/v1/order/new
 * @method post
 * @returns data save confirmation
 */
const orderSaveController = async (req, res) => {
  const { orderItems } = req.body;
  console.log(req.body);
  const { _id: customer } = req.user;

  const [err, data] = await asyncHandler(
    Order.create({ customer, orderItems })
  );

  if (err) {
    return res.json(err);
  }

  const { _doc } = data;

  return res.json({ ..._doc, message: 'data saved' });
};

/**
 *
 * @route /api/v1/order/get
 * @method get
 * @returns user's order data
 */
const getUserOrder = async (req, res) => {
  const { _id: customer } = req.user;
  const [err, data] = await asyncHandler(
    Order.find({ customer }).populate('customer')
  );

  if (err) {
    return res.json(err);
  }

  return res.json({ data });
};
module.exports = { orderSaveController, getUserOrder };
