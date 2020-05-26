const multer = require('multer');
const jimp = require('jimp');
const { body, query, validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');
const Product = require('../Models/Product');
const { asyncHandler } = require('../utils/errorHandlers');

// setting up multer for multipart form
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
  await image.resize(200, 200);

  await image.write(`./client/public/uploads/${req.body.image}`);
  // once we have written the image to our filesystem, keep going!

  next();
};

// validator for add product
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
    .withMessage('stock must be given and must be numeric'),
];

/**
 *
 * @route /api/v1/product/save
 * @method post
 * @returns  saved product's info
 * @description saves product information to DB
 */
const addProduct = async (req, res) => {
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

// validator for getProduct
const queryValidator = [
  query('category').toArray(), // changing to array so if only one value is provided we do not de-structure string

  query('title')
    .if(query('title').exists())
    .custom((value) => value.length >= 3),

  query('stock').toArray().isLength({ min: 0, max: 2 }),

  query('price')
    .toArray()
    .isLength({ min: 0, max: 2 })
    .custom((values) => {
      const check = values.filter((value) => {
        return value < 0;
      });
      if (check.length > 0) return false;

      return true;
    }),

  query('sort').toArray(),
];

/**
 *
 * @route /api/v1/product/get
 * @method get
 * @returns  product's info
 * @description based on query param retrieves product info
 */
const getProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const { limit = 10, category, title, stock, price, sort } = req.query;
  console.log(category.length);

  const customQuery = {};

  // building dynamic customQuery
  if (category != null && category.length >= 1) {
    customQuery.category = { $in: [...category] };
  }
  if (title != null) {
    customQuery.title = title.toLowerCase();
  }
  if (stock != null && stock.length >= 1) {
    if (stock.length > 1) {
      customQuery.stock = { $gte: Number(stock[0]), $lte: Number(stock[1]) };
    } else {
      customQuery.stock = { $gte: Number(stock) };
    }
  }
  if (price != null && price.length >= 1) {
    if (price.length > 1 && typeof price !== 'string') {
      customQuery.price = { $gte: Number(price[0]), $lte: Number(price[1]) };
    } else {
      customQuery.price = { $gte: Number(price) };
    }
  }
  // ============= //

  // building sortValue
  let sortValue = '';
  if (sort != null && sort.length >= 1) {
    if (sort.length > 1) {
      sortValue = sort.join(' ');
    } else {
      [sortValue] = [...sort];
    }
  }
  // ============= //

  // retrieve product
  const [error, data] = await asyncHandler(
    Product.find(customQuery).limit(Number(limit)).sort(sortValue).lean().exec()
  );
  if (error) {
    return res.json(error);
  }
  return res.json({
    limit,
    category,
    customQuery,
    data,
  });
};

module.exports = {
  addProduct,
  upload,
  resize,
  addValidator,
  getProduct,
  queryValidator,
};
