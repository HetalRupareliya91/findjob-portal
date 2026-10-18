const REQUIRED = ['title'];

/**
 * Validates a Benefit payload.
 * @param {object} data request body
 * @param {{ partial?: boolean }} options partial=true skips required checks (updates)
 * @returns {string[]} list of validation errors
 */
function validateBenefit(data, { partial = false } = {}) {
  const errors = [];
  if (!data || typeof data !== 'object') return ['Request body must be an object'];
  if (!partial) {
    REQUIRED.forEach((field) => {
      if (data[field] === undefined || data[field] === '') errors.push(field + ' is required');
    });
  }
  if (data.title !== undefined && typeof data.title !== 'string') errors.push('title must be text');
  if (data.description !== undefined && typeof data.description !== 'string') errors.push('description must be text');
  return errors;
}

module.exports = { validateBenefit };
