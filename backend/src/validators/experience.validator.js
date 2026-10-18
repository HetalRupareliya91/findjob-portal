const REQUIRED = ['companyName'];

/**
 * Validates a Experience payload.
 * @param {object} data request body
 * @param {{ partial?: boolean }} options partial=true skips required checks (updates)
 * @returns {string[]} list of validation errors
 */
function validateExperience(data, { partial = false } = {}) {
  const errors = [];
  if (!data || typeof data !== 'object') return ['Request body must be an object'];
  if (!partial) {
    REQUIRED.forEach((field) => {
      if (data[field] === undefined || data[field] === '') errors.push(field + ' is required');
    });
  }
  if (data.companyName !== undefined && typeof data.companyName !== 'string') errors.push('companyName must be text');
  if (data.role !== undefined && typeof data.role !== 'string') errors.push('role must be text');
  if (data.years !== undefined && data.years !== '' && isNaN(Number(data.years))) errors.push('years must be a number');
  return errors;
}

module.exports = { validateExperience };
