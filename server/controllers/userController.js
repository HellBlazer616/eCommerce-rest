const { body, validationResult } = require('express-validator');
const User = require('../Models/User');
const { asyncHandler } = require('../utils/errorHandlers');

const validateRegister = [
  body('name', 'You must provide a name')
    .notEmpty()
    .trim()
    .escape()
    .isLength({ min: 3 }),
  body('email', 'You must provide a valid email').isEmail().normalizeEmail({
    gmail_remove_dots: false,
    gmail_remove_subaddress: false,
  }),
  body('password', 'Password can not be empty').notEmpty(),
  body('passwordConfirm', 'Confirm password can not be empty').notEmpty(),
  body('passwordConfirm', 'Your passwords do not match').custom(
    (value, { req }) => value === req.body.password
  ),
];

const register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('helklo');
    return res.status(422).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  const user = new User({ name, email });

  const [err] = await asyncHandler(User.register(user, password));
  if (err) {
    res.json({ err });
  }
  return next();
};

const updateUser = async (req, res) => {
  const { name, email } = req.body;

  console.log(req.user);

  const user = await User.findByIdAndUpdate(
    // eslint-disable-next-line no-underscore-dangle
    { _id: req.user._id },
    { $set: { name, email } },
    { new: true, runValidators: true, context: 'query' }
  );
  res.json(user);
};

const userInfo = async (req, res) => {
  console.log(req?.isAuthenticated());
  const user = await User.findById(
    // eslint-disable-next-line no-underscore-dangle
    { _id: req.user.id }
  );
  res.json(user);
};
module.exports = { validateRegister, register, updateUser, userInfo };
