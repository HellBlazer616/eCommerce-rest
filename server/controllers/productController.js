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

  // now we resize. as of 22/5/2020 jimp has memory usage problem so file more that 4k will likely cause problem
  const [err, image] = await asyncHandler(jimp.read(req.file.buffer));

  if (err) {
    console.log(err);
    res.json({ ...err });
    return;
  }
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

// save a single product
const addController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { title, category: catagories, price, stock, image, unit } = req.body;

  const category = catagories.split(',').map((item) => item.trim());

  const [err, data] = await asyncHandler(
    Product.create({ title, category, price, stock, image, unit })
  );

  if (err) {
    return res.json(err);
  }

  const { _doc } = data;

  return res.json({ ..._doc, message: 'data saved' });
};

const getController = async (req, res) => {
  const { limit = 0, category, title, stock, price, sort } = req.query;

  const query = {};
  if (category != null) {
    query.category = { $in: [category] };
  }
  if (title != null) {
    query.title = title.toLowerCase();
  }
  if (stock != null) {
    if (stock.length > 1 && typeof stock !== 'string') {
      query.stock = { $gte: Number(stock[0]), $lte: Number(stock[1]) };
    } else {
      query.stock = { $gte: Number(stock) };
    }
  }
  if (price != null) {
    if (price.length > 1 && typeof price !== 'string') {
      query.price = { $gte: Number(price[0]), $lte: Number(price[1]) };
    } else {
      query.price = { $gte: Number(price) };
    }
  }
  let sortValue = '';
  if (sort != null) {
    if (sort.length > 1 && typeof sort !== 'string') {
      sortValue = sort.join(' ');
    } else {
      sortValue = sort;
    }
  }

  console.log(query);

  const [error, data] = await asyncHandler(
    Product.find(query).limit(Number(limit)).sort(sortValue).lean().exec()
  );
  if (error) {
    res.json(error);
  } else {
    res.json({
      limit,
      category,
      data,
    });
  }
};

module.exports = { addController, upload, resize, addValidator, getController };
