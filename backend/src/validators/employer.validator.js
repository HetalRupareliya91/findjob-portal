const REQUIRED = ['fullName'];

/**
 * Validates a Employer payload.
 * @param {object} data request body
 * @param {{ partial?: boolean }} options partial=true skips required checks (updates)
 * @returns {string[]} list of validation errors
 */
function validateEmployer(data, { partial = false } = {}) {
  const errors = [];
  if (!data || typeof data !== 'object') return ['Request body must be an object'];
  if (!partial) {
    REQUIRED.forEach((field) => {
      if (data[field] === undefined || data[field] === '') errors.push(field + ' is required');
    });
  }
  if (data.fullName !== undefined && typeof data.fullName !== 'string') errors.push('fullName must be text');
  if (data.designation !== undefined && typeof data.designation !== 'string') errors.push('designation must be text');
  if (data.phone !== undefined && typeof data.phone !== 'string') errors.push('phone must be text');
  return errors;
}

module.exports = { validateEmployer };
