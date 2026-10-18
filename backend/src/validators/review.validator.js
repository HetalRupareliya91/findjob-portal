const REQUIRED = ['rating'];

/**
 * Validates a Review payload.
 * @param {object} data request body
 * @param {{ partial?: boolean }} options partial=true skips required checks (updates)
 * @returns {string[]} list of validation errors
 */
function validateReview(data, { partial = false } = {}) {
  const errors = [];
  if (!data || typeof data !== 'object') return ['Request body must be an object'];
  if (!partial) {
    REQUIRED.forEach((field) => {
      if (data[field] === undefined || data[field] === '') errors.push(field + ' is required');
    });
  }
  if (data.rating !== undefined && data.rating !== '' && isNaN(Number(data.rating))) errors.push('rating must be a number');
  if (data.comment !== undefined && typeof data.comment !== 'string') errors.push('comment must be text');
  return errors;
}

module.exports = { validateReview };
