const mongoose = require('mongoose');
const validator = require('validator');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid Email address'],
    required: 'Please provide an email address',
  },
  name: {
    type: String,
    required: 'Please provide a name',
    trim: true,
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  orders: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: 'An order must have a customer',
    },
  ],
});

userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
  session: false,
});

module.exports = mongoose.model('User', userSchema);
