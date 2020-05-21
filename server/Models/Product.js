const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: 'Product must have a title',
    },
    image: {
      type: String,
      required: 'Product must have an image',
    },
    price: {
      type: Number,
      required: 'Product must have a definite price',
    }, // per quantity
    stock: {
      type: Number,
      required: 'Product must have a <stock></stock> value',
    },
    category: [
      {
        type: String,
        required: 'A product must belong to a category',
      },
    ],
    expiryDate: {
      type: Date,
    },
    unit: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
