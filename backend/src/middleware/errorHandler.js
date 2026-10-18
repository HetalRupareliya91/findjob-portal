function notFound(req, res) {
  res.status(404).json({ success: false, message: 'Route not found: ' + req.originalUrl });
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  let status = err.status || 500;
  if (err.name === 'CastError') status = 400;
  if (err.name === 'ValidationError') status = 400;
  if (status === 500) console.error(err);
  res.status(status).json({ success: false, message: err.message || 'Server error' });
}

module.exports = { notFound, errorHandler };
