const REQUIRED = ['keyword'];

/**
 * Validates a Job Alert payload.
 * @param {object} data request body
 * @param {{ partial?: boolean }} options partial=true skips required checks (updates)
 * @returns {string[]} list of validation errors
 */
function validateJobAlert(data, { partial = false } = {}) {
  const errors = [];
  if (!data || typeof data !== 'object') return ['Request body must be an object'];
  if (!partial) {
    REQUIRED.forEach((field) => {
      if (data[field] === undefined || data[field] === '') errors.push(field + ' is required');
    });
  }
  if (data.keyword !== undefined && typeof data.keyword !== 'string') errors.push('keyword must be text');
  if (data.frequency !== undefined && typeof data.frequency !== 'string') errors.push('frequency must be text');
  if (data.active !== undefined && typeof data.active !== 'boolean') errors.push('active must be true or false');
  return errors;
}

module.exports = { validateJobAlert };
