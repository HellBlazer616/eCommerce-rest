/*
  Not Found Error Handler

  If we hit a route that is not found, we mark it as 404 and pass it along to the next error handler to display
*/
const notFound = (req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
};

const asyncHandler = (promise) =>
  promise
    .then((data) => [null, data])
    .catch((err) => Promise.resolve([err, null]));

module.exports = {
  notFound,
  asyncHandler,
};
