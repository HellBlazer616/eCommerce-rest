const Order = require('../Models/Order');
const User = require('../Models/User');
const { asyncHandler } = require('../utils/errorHandlers');

/**
 *
 * @route /api/v1/order/new
 * @method post
 * @returns data save confirmation
 */
const orderSaveController = async (req, res) => {
  const { orderItems, totalPrice } = req.body;
  const { _id: customer } = req.user;

  const [err, data] = await asyncHandler(
    Order.create({ customer, orderItems, totalPrice })
  );

  const [userErr, user] = await asyncHandler(
    User.findByIdAndUpdate(
      customer,
      { $push: { orders: data._id } },
      { new: true }
    )
  );

  if (err) {
    return res.json(err);
  }
  if (userErr) {
    return res.json(userErr);
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
