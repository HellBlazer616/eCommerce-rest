const multer = require('multer');
const jimp = require('jimp');
const { body, validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');
const Product = require('../Models/Product');
const { asyncHandler } = require('../utils/errorHandlers');

const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    const isImage = file.mimetype.startsWith('image/');
    if (isImage) {
      next(null, true);
    } else {
      next({ message: 'That file type is not allowed' }, false);
    }
  },
};

// file handling middleware
const upload = multer(multerOptions).single('image');

// file storing and resize
const resize = async (req, res, next) => {
  // check if there is no new file to resize
  if (!req.file) {
    next(); // skip to the next middleware
    return;
  }
  const extension = req.file.mimetype.split('/')[1];
  req.body.image = `${uuidv4()}.${extension}`;
  // now we resize
  const image = await jimp.read(req.file.buffer);
  await image.resize(800, jimp.AUTO);
  await image.write(`../storage/uploads/${req.body.image}`);
  // once we have written the image to our filesystem, keep going!
  next();
};

const addValidator = [
  body('title')
    .isString()
    .isLength({ min: 3 })
    .withMessage('title must be 3 characters or more'),
  body('category')
    .isString()
    .isLength({ min: 3 })
    .withMessage('title must be 3 characters or more'),
  body('price').isNumeric().withMessage('price must be given and be numeric'),
  body('stock')
    .isNumeric()
    .withMessage('stock must be given and must  be numeric'),
];

const addController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { title, category: catagories, price, stock, image } = req.body;

  const category = catagories.split(',').map((item) => item.trim());

  const [err, data] = await asyncHandler(
    Product.create({ title, category, price, stock, image })
  );

  if (err) {
    return res.json(err);
  }

  const { _doc } = data;

  return res.json({ ..._doc, message: 'data saved' });
};

module.exports = { addController, upload, resize, addValidator };
