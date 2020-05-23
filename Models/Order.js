const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: 'An order must have a customer',
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
    deliveryDate: {
      type: Date,
      default: Date.now() + 48 * 60 * 60 * 1000, // 48 hours from the order
    },
    orderItems: [
      {
        title: String,
        quantity: Number,
        price: Number,
      },
    ],

    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

orderSchema.virtual('totalPrice').get(() => {
  return this.orderItems.reduce((totalPrice, item) => {
    // eslint-disable-next-line no-param-reassign
    totalPrice += item.price;
    return totalPrice;
  }, 0);
});

module.exports = mongoose.model('Order', orderSchema);
